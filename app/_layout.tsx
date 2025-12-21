import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import {
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';
import { Provider } from 'react-redux';
import { store } from '@/store';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />

        <Stack.Screen
          name="welcome"
          options={{
            animation: 'fade',
          }}
        />

        <Stack.Screen
          name="onboarding"
          options={{
            animation: 'slide_from_right', // 👈 smooth & modern
          }}
        />

        <Stack.Screen
          name="home"
          options={{
            animation: 'fade',
          }}
        />
      </Stack>

      <StatusBar style="light" />
    </Provider>
  );
}
