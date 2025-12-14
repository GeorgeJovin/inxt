import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Search } from 'lucide-react-native';

interface RoomSelectorProps {
  rooms: string[];
  selectedRoom: string;
  onSelectRoom: (room: string) => void;
  onClose: () => void;
}

export function RoomSelector({ rooms, selectedRoom, onSelectRoom, onClose }: RoomSelectorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.dropdown}>
        <View style={styles.searchContainer}>
          <Search size={18} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Find an item"
            placeholderTextColor="#64748B"
          />
        </View>

        <View style={styles.roomList}>
          {rooms.map((room) => (
            <TouchableOpacity
              key={room}
              style={[
                styles.roomItem,
                room === selectedRoom && styles.roomItemSelected
              ]}
              onPress={() => onSelectRoom(room)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.roomText,
                room === selectedRoom && styles.roomTextSelected
              ]}>
                {room}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 115,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    zIndex: 1000,
  },
  dropdown: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1E293B',
  },
  roomList: {
    gap: 4,
  },
  roomItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  roomItemSelected: {
    backgroundColor: '#F1F5F9',
  },
  roomText: {
    fontSize: 16,
    color: '#475569',
    fontWeight: '500',
  },
  roomTextSelected: {
    color: '#1E293B',
    fontWeight: '600',
  },
});
