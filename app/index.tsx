import { Redirect } from 'expo-router'
import { useAppSelector } from '@/store/hooks'
import { selectAuth } from '@/store/selectors'

export default function Index() {
  const { user } = useAppSelector(selectAuth)

  if (!user) {
    return <Redirect href="/welcome" />
  }

  return <Redirect href="/home" />
}
