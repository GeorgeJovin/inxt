import Constants from 'expo-constants'

type ExtraConfig = {
  API_BASE_URL: string
}

const extra = Constants.expoConfig?.extra as ExtraConfig

export const ENV = {
  API_BASE_URL: extra.API_BASE_URL,
}
