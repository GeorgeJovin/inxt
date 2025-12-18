import React from 'react'
import {
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native'

const Loader = () => {
  return (
    <View style={styles.overlay} pointerEvents="auto">
      <ActivityIndicator size="large" color="rgb(110, 190, 255)" />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
