import React, { useEffect, useState } from 'react';
import {
  Modal,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';

import { loginUser } from '@/store/actions/auth.actions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Toast from './Toast';
import { selectAuth } from '@/store/selectors';
import { clearAuthError } from '@/store/slices/auth.slice';
import { Feather } from '@expo/vector-icons';

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
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector(selectAuth);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState<{
    message: string;
    type: 'error' | 'success';
  } | null>(null);

  const handleLogin = () => {
    dispatch(
      loginUser({
        username,
        password,
      })
    );
  };
  useEffect(() => {
    if (error) {
      setToast({ message: error, type: 'error' });
      dispatch(clearAuthError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (user) {
      setUsername('');
      setPassword('');
      onSuccess();
    }
  }, [onSuccess, user]);

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
            {/* Heading */}
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>

            <TextInput
              placeholder="Username"
              placeholderTextColor="#9CA3AF"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              editable={!loading}
            />

            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                style={styles.passwordInput}
                editable={!loading}
              />

              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
                disabled={loading}
                style={styles.eyeIcon}
                hitSlop={10}
              >
                <Feather
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.6 }]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Signing in...' : 'Sign in'}
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onHide={() => setToast(null)}
          />
        )}
      </KeyboardAvoidingView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  flex: { flex: 1 },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '88%',
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 24,
    elevation: 10,
  },
  title: {
    fontSize: 26,
    fontFamily: 'Manrope_700Bold',
    textAlign: 'center',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Manrope_400Regular',
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: 24,
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#111827',
  },
  button: {
    backgroundColor: '#6EBEFF',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Manrope_600SemiBold',
    color: '#111827',
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 16,
  },

  passwordInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    paddingRight: 48, // space for eye icon
    fontSize: 16,
    color: '#111827',
  },

  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
});
