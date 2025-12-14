import React, { useState } from 'react';
import {
  Modal,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

type LoginModalProps = {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export const LoginModal = ({
  visible,
  onClose,
  onSuccess,
}: LoginModalProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin@123') {
      setError('');
      setUsername('');
      setPassword('');
      onSuccess();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <Pressable style={styles.backdrop} onPress={onClose}>
          <Pressable style={styles.container}>
            <Text style={styles.title}>Sign In</Text>

            <TextInput
              placeholder="Username"
              placeholderTextColor="#9CA3AF"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '88%',
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 20,
    elevation: 8, // Android shadow
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    fontSize: 24,
    fontFamily: 'Manrope_700Bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#111827',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontFamily: 'Manrope_400Regular',
    fontSize: 16,
    color: '#111827',
  },
  error: {
    color: '#EF4444',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'Manrope_400Regular',
  },
  button: {
    backgroundColor: '#6EBEFF',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Manrope_600SemiBold',
    color: '#111827',
  },
});
