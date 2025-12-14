import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Search } from 'lucide-react-native';
import { useState } from 'react';

interface RoomSelectorProps {
  rooms: string[];
  selectedRoom: string;
  selectorLayout: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  onSelectRoom: (room: string) => void;
  onClose: () => void;
}

export function RoomSelector({
  rooms,
  selectedRoom,
  selectorLayout,
  onSelectRoom,
}: RoomSelectorProps) {
  const [query, setQuery] = useState('');

  const filteredRooms = rooms.filter(room =>
    room.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View
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
          <Search size={16} color="#6B7280" />
          <TextInput
            placeholder="Find an item"
            placeholderTextColor="#9CA3AF"
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
        </View>

        {/* ROOMS */}
        {filteredRooms.map(room => (
          <TouchableOpacity
            key={room}
            style={[
              styles.roomItem,
              room === selectedRoom && styles.roomItemSelected,
            ]}
            onPress={() => onSelectRoom(room)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.roomText,
                room === selectedRoom && styles.roomTextSelected,
              ]}
            >
              {room}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },

  dropdown: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 6,
    gap: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },

  roomItem: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  roomItemSelected: {
    backgroundColor: '#F3F4F6',
  },

  roomText: {
    fontSize: 16,
    color: '#374151',
  },

  roomTextSelected: {
    color: '#111827',
    fontWeight: '600',
  },
});
