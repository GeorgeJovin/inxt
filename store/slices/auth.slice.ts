import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/auth.types';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  hasSeenWelcome: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  hasSeenWelcome: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.user = action.payload;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutStart(state) {
      state.loading = true;
    },
    logoutSuccess(state) {
      state.loading = false;
      state.user = null;
    },
    logoutFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    markWelcomeSeen(state) {
      state.hasSeenWelcome = true;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  clearAuthError,
  markWelcomeSeen,
} = authSlice.actions;

export default authSlice.reducer;
