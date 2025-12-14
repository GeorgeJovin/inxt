import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function OnboardingScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/(tabs)');
  };

  const handleSignIn = () => {
    router.push('/(tabs)');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200' }}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.logo}>INXT</Text>
          </View>

          <View style={styles.bottomContent}>
            <Text style={styles.title}>Control your home</Text>
            <Text style={styles.subtitle}>
              Control all your smart devices{'\n'}and enjoy your life
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                onPress={handleGetStarted}
                activeOpacity={0.8}
              >
                <Text style={styles.primaryButtonText}>Get started</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={handleSignIn}
                activeOpacity={0.8}
              >
                <Text style={styles.secondaryButtonText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    paddingTop: 120,
    alignItems: 'center',
  },
  logo: {
    fontSize: 64,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 6,
  },
  bottomContent: {
    paddingHorizontal: 32,
    paddingBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#ffffff',
    lineHeight: 24,
    marginBottom: 32,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#93C5FD',
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1E293B',
  },
  secondaryButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1E293B',
  },
});
