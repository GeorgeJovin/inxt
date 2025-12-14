import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { LoginModal } from '@/components/LoginModal';
import { useDisableBack } from '@/hooks/useDisableBack';

export default function OnboardingScreen() {
  const router = useRouter();
    useDisableBack();
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginSuccess = () => {
    setShowLogin(false);
    router.push('/home');
  };

  return (
    <>
      <ImageBackground
        source={{
          uri: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
        }}
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
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={() => setShowLogin(true)}
                activeOpacity={0.8}
              >
                <Text style={styles.secondaryButtonText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>

      <LoginModal
        visible={showLogin}
        onClose={() => setShowLogin(false)}
        onSuccess={handleLoginSuccess}
      />
    </>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 96,
    fontFamily: 'Manrope_700Bold',
    color: '#ffffff',
    letterSpacing: 6,
  },
  bottomContent: {
    marginBottom: 130,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Manrope_700Bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Manrope_400Regular',
    color: '#ffffff',
    lineHeight: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 60,
    marginHorizontal:32,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#6EBEFF',
  },
  secondaryButton: {
    backgroundColor: '#E5F3FF',
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: 'Manrope_400Regular',
    color: '#171717',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: 'Manrope_400Regular',
    color: '#171717',
  },
});
