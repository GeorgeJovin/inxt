import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function WelcomeScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/onboarding');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={{
        uri: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
      }}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.logo}>INXT</Text>
          <View style={styles.taglineContainer}>
            <Text style={styles.welcomeText}>Welcome to INXT</Text>
            <Text style={styles.tagline}>- Smart Living. Simplified</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 96,
    fontFamily: 'Manrope_700Bold',
    color: '#ffffff',
    letterSpacing: 8,
    marginBottom: 200,
  },
  taglineContainer: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 32,
    fontFamily: 'Manrope_700Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Manrope_400Regular',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
});
