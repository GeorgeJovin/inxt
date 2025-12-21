import 'dotenv/config'
import appJson from './app.json'

export default {
  ...appJson,
  expo: {
    ...appJson.expo,

    android: {
      ...appJson.expo.android,
      usesCleartextTraffic: true,
    },

    plugins: [
      ...(appJson.expo.plugins || []),
      [
        'expo-build-properties',
        {
          android: {
            usesCleartextTraffic: true,
          },
        },
      ],
    ],

    extra: {
      ...appJson.expo.extra,
      API_BASE_URL: process.env.API_BASE_URL,
      API_KEY: process.env.API_KEY,
    },
  },
}
