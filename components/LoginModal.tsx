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
} from 'react-native';

import { loginUser } from '@/store/actions/auth.actions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Toast from './Toast';
import { selectAuth } from '@/store/selectors';
import { clearAuthError } from '@/store/slices/auth.slice';

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

            <TextInput
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              editable={!loading}
            />

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
});
