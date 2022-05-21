import type { NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { STATE } from '../typings'

const Home: NextPage = () => {
  const router = useRouter()
  const LOGGED = useSelector((state: STATE) => state.login.LOGGED)
  if (!LOGGED) {
    if (typeof window !== 'undefined') {
      router.push('/Login')
    }
  }
  return <>HOMEE</>
}

export default Home
