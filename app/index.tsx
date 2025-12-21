import { Redirect } from 'expo-router'
import { useAppSelector } from '@/store/hooks'
import { selectAuth } from '@/store/selectors'

export default function Index() {
  const { user, hasSeenWelcome } = useAppSelector(selectAuth)

  if (!hasSeenWelcome) {
    return <Redirect href="/welcome" />
  }

  if (!user) {
    return <Redirect href="/onboarding" />
  }

  return <Redirect href="/home" />
}
