import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  LayoutRectangle,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { DeviceCard } from '@/components/DeviceCard';
import { RoomSelector } from '@/components/RoomSelector';
import { useDisableBack } from '@/hooks/useDisableBack';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectAuth,
  selectDevices,
  selectGlobalLoading,
  selectRooms,
} from '@/store/selectors';
import { fetchCustomerDetails } from '@/store/actions/customer.actions';
import { fetchDevices } from '@/store/actions/device.action';
import { toggleMqttDevice } from '@/store/actions/mqtt.action';
import { logoutUser } from '@/store/actions/auth.actions';
import Loader from '@/components/Loader';

export default function HomeScreen() {
  useDisableBack();

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(selectAuth);
  const rooms = useAppSelector(selectRooms);
  const devices = useAppSelector(selectDevices);
  const isLoading = useAppSelector(selectGlobalLoading);
  const selectorRef = useRef<View>(null);
  const [showRoomSelector, setShowRoomSelector] = useState(false);
  const [selectorLayout, setSelectorLayout] = useState<LayoutRectangle | null>(
    null
  );

  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

  /* 1️⃣ Fetch rooms */
  useEffect(() => {
    if (user?.customerId) {
      dispatch(fetchCustomerDetails(user.customerId));
    }
  }, [dispatch, user?.customerId]);

  /* 2️⃣ Auto-select first room */
  useEffect(() => {
    if (rooms.length > 0 && !selectedRoomId) {
      setSelectedRoom(rooms[0].plist_name);
      setSelectedRoomId(rooms[0].list_id);
    }
  }, [rooms, selectedRoomId]);

  /* 3️⃣ Fetch devices when room changes */
  useEffect(() => {
    if (user?.customerId && selectedRoomId) {
      dispatch(fetchDevices(user.customerId, selectedRoomId));
    }
  }, [dispatch, selectedRoomId, user?.customerId]);

  useEffect(() => {
    if (!user) {
      router.replace('/onboarding');
    }
  }, [router, user]);

  const toggleRoomSelector = () => {
    selectorRef.current?.measureInWindow((x, y, width, height) => {
      setSelectorLayout({ x, y, width, height });
      setShowRoomSelector((prev) => !prev);
    });
  };

  return (
    <>
      {isLoading && <Loader />}
      <ImageBackground
        source={{
          uri: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
        }}
        style={styles.container}
      >
        {/* MAIN OVERLAY */}
        <View style={styles.overlay}>
          {/* HEADER */}
          <View style={styles.header}>
            {/* CENTERED ROOM SELECTOR */}
            <View style={styles.headerCenter}>
              <View ref={selectorRef} collapsable={false}>
                <TouchableOpacity
                  style={
                    showRoomSelector
                      ? styles.roomSelectorSelected
                      : styles.roomSelector
                  }
                  onPress={toggleRoomSelector}
                  activeOpacity={0.85}
                >
                  <Text
                    style={
                      showRoomSelector
                        ? styles.roomTextSelected
                        : styles.roomText
                    }
                  >
                    {selectedRoom || 'Select Room'}
                  </Text>

                  <Image
                    source={
                      showRoomSelector
                        ? require('@/assets/images/up/up.png')
                        : require('@/assets/images/down/down.png')
                    }
                    style={showRoomSelector ? styles.upIcon : styles.downIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* POWER BUTTON */}
            <TouchableOpacity
              style={styles.powerButton}
              onPress={() => {
                if (!user) return;
                dispatch(logoutUser(user.customerId));
              }}
            >
              <Feather name="power" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* CONTENT */}
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.grid}>
              {devices.map((device) => (
                <DeviceCard
                  key={device.device_id}
                  device={{
                    id: String(device.device_id),
                    name: device.device_name,
                    value: device.device_speed_temp,
                    icon: device.device_type,
                    isOn: device.device_status === 'ON',
                    type: device.device_type,
                  }}
                  onToggle={() => {
                    if (!user || !selectedRoomId) return;
                    dispatch(
                      toggleMqttDevice({
                        customerId: user.customerId,
                        listId: selectedRoomId,
                        deviceId: device.device_id,
                        currentStatus: device.device_status,
                      })
                    );
                  }}
                />
              ))}
            </View>
          </ScrollView>
        </View>

        {/* FLOATING DROPDOWN */}
        {showRoomSelector && selectorLayout && (
          <RoomSelector
            rooms={rooms.map((r) => r.plist_name)}
            selectedRoom={selectedRoom}
            selectorLayout={selectorLayout}
            onSelectRoom={(roomName) => {
              const room = rooms.find((r) => r.plist_name === roomName);
              if (room) {
                setSelectedRoom(room.plist_name);
                setSelectedRoomId(room.list_id);
              }
              setShowRoomSelector(false);
            }}
            onClose={() => setShowRoomSelector(false)}
          />
        )}
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
  },

  /* HEADER */
  header: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },

  headerCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  powerButton: {
    position: 'absolute',
    right: 20,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ROOM SELECTOR */
  roomSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    paddingVertical: 12,
    width: 220,
  },

  roomSelectorSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    width: 220,
  },

  roomText: {
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 45,
  },

  roomTextSelected: {
    fontSize: 16,
    color: '#737373',
    marginLeft: 12,
  },

  downIcon: {
    width: 18,
    height: 18,
    marginRight: 14,
    tintColor: '#ffffff',
  },

  upIcon: {
    width: 18,
    height: 18,
    marginRight: 14,
    tintColor: '#484848',
  },

  /* CONTENT */
  content: {
    padding: 20,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
});
