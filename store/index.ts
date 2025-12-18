import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from './slices/auth.slice'
import customerReducer from './slices/customer.slice'
import deviceReducer from './slices/device.slice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
}

const rootReducer = combineReducers({
  auth: authReducer,
  customer: customerReducer,
  device: deviceReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
