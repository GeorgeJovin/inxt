import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Thermometer, AirVent, Fan, Lamp } from 'lucide-react-native';

interface Device {
  id: string;
  name: string;
  value: string;
  icon: string;
  isOn: boolean;
  type: string;
}

interface DeviceCardProps {
  device: Device;
  onToggle: () => void;
}

export function DeviceCard({ device, onToggle }: DeviceCardProps) {
  const getIcon = () => {
    const iconProps = {
      size: 40,
      color: device.isOn ? '#1E293B' : '#ffffff',
      strokeWidth: 1.5,
    };

    switch (device.type) {
      case 'climate':
        return <Thermometer {...iconProps} />;
      case 'ac':
        return <AirVent {...iconProps} />;
      case 'fan':
        return <Fan {...iconProps} />;
      case 'lamp':
        return <Lamp {...iconProps} />;
      default:
        return <Thermometer {...iconProps} />;
    }
  };

  return (
    <View style={[styles.card, device.isOn ? styles.cardOn : styles.cardOff]}>
      <View style={styles.header}>
        <Text
          style={[
            styles.status,
            device.isOn ? styles.statusOn : styles.statusOff,
          ]}
        >
          {device.isOn ? 'ON' : 'OFF'}
        </Text>
        <TouchableOpacity
          style={styles.toggle}
          onPress={onToggle}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.toggleTrack,
              device.isOn ? styles.toggleTrackOn : styles.toggleTrackOff,
            ]}
          >
            <View
              style={[
                styles.toggleThumb,
                device.isOn ? styles.toggleThumbOn : styles.toggleThumbOff,
              ]}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.iconContainer}>{getIcon()}</View>

      <View style={styles.footer}>
        <Text
          style={[styles.name, device.isOn ? styles.textOn : styles.textOff]}
        >
          {device.name}
        </Text>
        {device.value ? (
          <Text
            style={[styles.value, device.isOn ? styles.textOn : styles.textOff]}
          >
            {device.value}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    aspectRatio: 1,
    borderRadius: 20,
    padding: 16,
    justifyContent: 'space-between',
  },
  cardOn: {
    backgroundColor: '#ffffff',
  },
  cardOff: {
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
  },
  statusOn: {
    color: '#1E293B',
  },
  statusOff: {
    color: '#64748B',
  },
  toggle: {
    padding: 4,
  },

  toggleTrack: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleTrackOn: {
    backgroundColor: '#93C5FD',
    alignItems: 'flex-end',
  },
  toggleTrackOff: {
    backgroundColor: '#475569',
    alignItems: 'flex-start',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  toggleThumbOn: {
    backgroundColor: '#ffffff',
  },
  toggleThumbOff: {
    backgroundColor: '#1E293B',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 10,
    fontFamily: 'Manrope_500Medium',
  },
  value: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16,
  },
  textOn: {
    color: '#1E293B',
  },
  textOff: {
    color: '#ffffff',
  },
});
