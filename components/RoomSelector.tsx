import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
} from 'react-native'
import { useState } from 'react'

interface RoomSelectorProps {
  rooms: string[]
  selectedRoom: string
  selectorLayout: {
    x: number
    y: number
    width: number
    height: number
  }
  onSelectRoom: (room: string) => void
  onClose: () => void
}

export function RoomSelector({
  rooms,
  selectedRoom,
  selectorLayout,
  onSelectRoom,
  onClose,
}: RoomSelectorProps) {
  const [query, setQuery] = useState('')

  const filteredRooms = rooms.filter(room =>
    room.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <Pressable style={styles.backdrop} onPress={onClose}>
      {/* Prevent closing when tapping inside */}
      <Pressable
        onPress={() => {}}
        style={[
          styles.dropdown,
          {
            top: selectorLayout.y + selectorLayout.height + 8,
            left: selectorLayout.x,
            width: selectorLayout.width,
          },
        ]}
      >
        {/* SEARCH */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Find an item"
            placeholderTextColor="#737373"
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
        </View>

        {/* ROOMS */}
        {filteredRooms
          .filter(room => room !== selectedRoom)
          .map(room => (
            <TouchableOpacity
              key={room}
              style={styles.roomItem}
              onPress={() => {
                onSelectRoom(room)
                onClose()
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.roomText}>{room}</Text>
            </TouchableOpacity>
          ))}
      </Pressable>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },

  dropdown: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },

  searchContainer: {
    borderBottomWidth: 1,
    borderColor: '#E6E6E6',
    marginBottom: 6,
  },

  searchInput: {
    fontSize: 16,
    color: '#111827',
    paddingVertical: 6,
  },

  roomItem: {
    paddingVertical: 14,
    paddingHorizontal: 12,
  },

  roomText: {
    fontSize: 16,
    color: '#484848',
  },
})
