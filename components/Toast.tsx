import React, { useEffect, useRef } from 'react'
import {
  Animated,
  Text,
  StyleSheet,
} from 'react-native'

type ToastProps = {
  message: string
  type?: 'error' | 'success'
  onHide?: () => void
}

const Toast = ({
  message,
  type = 'error',
  onHide,
}: ToastProps) => {
  const translateY = useRef(new Animated.Value(-80)).current
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -80,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onHide?.()
      })
    }, 2500)

    return () => clearTimeout(timer)
  }, [onHide, opacity, translateY])

  return (
    <Animated.View
      style={[
        styles.toast,
        type === 'error'
          ? styles.error
          : styles.success,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  )
}

export default Toast

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    zIndex: 1000,
    maxWidth: '90%',
  },
  error: {
    backgroundColor: '#FEE2E2',
  },
  success: {
    backgroundColor: '#DCFCE7',
  },
  text: {
    color: '#111827',
    fontSize: 14,
    fontFamily: 'Manrope_600SemiBold',
    textAlign: 'center',
  },
})
