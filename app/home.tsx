import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  LayoutRectangle,
} from 'react-native'
import { useState } from 'react'
import { DeviceCard } from '@/components/DeviceCard'
import { RoomSelector } from '@/components/RoomSelector'
import { Device } from '@/components/types/types'

export default function HomeScreen() {
  const [selectedRoom, setSelectedRoom] = useState('Living Room')
  const [showRoomSelector, setShowRoomSelector] = useState(false)
  const [selectorLayout, setSelectorLayout] =
    useState<LayoutRectangle | null>(null)

  const rooms = ['Living Room', 'Bed Room', 'Kids Room', 'Kitchen']

  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'Climate',
      value: '24°C',
      icon: 'thermometer',
      isOn: false,
      type: 'climate',
    },
    {
      id: '2',
      name: 'Air conditioner',
      value: '26.6°C',
      icon: 'air-vent',
      isOn: true,
      type: 'ac',
    },
    {
      id: '3',
      name: 'Fan',
      value: '',
      icon: 'fan',
      isOn: true,
      type: 'fan',
    },
    {
      id: '4',
      name: 'Desk lamp',
      value: '',
      icon: 'lamp',
      isOn: false,
      type: 'lamp',
    },
  ])

  const toggleDevice = (id: string) => {
    setDevices(prev =>
      prev.map(d => (d.id === id ? { ...d, isOn: !d.isOn } : d)),
    )
  }

  return (
    <ImageBackground
      source={{
        uri: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
      }}
      style={styles.container}
    >
      <View style={styles.overlay}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={require('@/assets/images/back/back.png')}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={
              showRoomSelector
                ? styles.roomSelectorSelected
                : styles.roomSelector
            }
            onPress={() => setShowRoomSelector(prev => !prev)}
            onLayout={e => setSelectorLayout(e.nativeEvent.layout)}
            activeOpacity={0.8}
          >
            <Text
              style={
                showRoomSelector ? styles.roomTextSelected : styles.roomText
              }
            >
              {selectedRoom}
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

          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={require('@/assets/images/power/power.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        {/* DROPDOWN */}
        {showRoomSelector && selectorLayout && (
          <RoomSelector
            rooms={rooms}
            selectedRoom={selectedRoom}
            selectorLayout={selectorLayout}
            onSelectRoom={room => {
              setSelectedRoom(room)
              setShowRoomSelector(false)
            }}
            onClose={() => setShowRoomSelector(false)}
          />
        )}

        {/* CONTENT */}
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.grid}>
            {devices.map(device => (
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
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },

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

  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    width: 24,
    height: 24,
    tintColor: '#ffffff',
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

  roomSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    width: 220,
  },

  roomSelectorSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
        borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 8,
    width: 220,
  },

  roomText: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'Manrope_400Regular',
    marginLeft: 45,
  },

  roomTextSelected: {
    fontSize: 16,
    color: '#737373',
    marginLeft: 12,
  },

  content: {
    padding: 20,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
})
