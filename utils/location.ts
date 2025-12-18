import * as Location from 'expo-location'

export const getLatLong = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync()

  if (status !== 'granted') {
    throw new Error('Location permission denied')
  }

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  })

  return {
    lat: location.coords.latitude,
    long: location.coords.longitude,
  }
}
