import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { ChevronLeft, Power, ChevronDown } from 'lucide-react-native';
import { DeviceCard } from '@/components/DeviceCard';
import { RoomSelector } from '@/components/RoomSelector';

export default function HomeScreen() {
  const [selectedRoom, setSelectedRoom] = useState('Living Room');
  const [showRoomSelector, setShowRoomSelector] = useState(false);

  const rooms = ['Living Room', 'Bed Room', 'Kids Room', 'Kitchen'];

  const [devices, setDevices] = useState([
    { id: '1', name: 'Climate', value: '24°C', icon: 'thermometer', isOn: false, type: 'climate' },
    { id: '2', name: 'Air conditioner', value: '26.6°C', icon: 'air-vent', isOn: true, type: 'ac' },
    { id: '3', name: 'Fan', value: '', icon: 'fan', isOn: true, type: 'fan' },
    { id: '4', name: 'Desk lamp', value: '', icon: 'lamp', isOn: false, type: 'lamp' },
  ]);

  const toggleDevice = (id: string) => {
    setDevices(devices.map(device =>
      device.id === id ? { ...device, isOn: !device.isOn } : device
    ));
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200' }}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <ChevronLeft size={24} color="#ffffff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.roomSelector}
            onPress={() => setShowRoomSelector(!showRoomSelector)}
          >
            <Text style={styles.roomText}>{selectedRoom}</Text>
            <ChevronDown size={20} color="#ffffff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.powerButton}>
            <Power size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {showRoomSelector && (
          <RoomSelector
            rooms={rooms}
            selectedRoom={selectedRoom}
            onSelectRoom={(room) => {
              setSelectedRoom(room);
              setShowRoomSelector(false);
            }}
            onClose={() => setShowRoomSelector(false)}
          />
        )}

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.grid}>
            {devices.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                onToggle={() => toggleDevice(device.id)}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#475569',
    gap: 8,
  },
  roomText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  powerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
});
