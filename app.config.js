import 'dotenv/config'
import appJson from './app.json'

export default {
  ...appJson,
  expo: {
    ...appJson.expo,

    extra: {
      ...appJson.expo.extra,
      API_BASE_URL: process.env.API_BASE_URL,
    },
  },
}
