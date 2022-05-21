import type { NextPage } from 'next'
import Link from 'next/link'
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
  } else {
    if (typeof window !== 'undefined') {
      router.push('/dashboard')
    }
  }
  return (
    <>
      HOMEE
      <br />
      <Link href={'/dashboard'}> SOME TEXT </Link>
      <br />
      <Link href={'/Login'}> SOME TEXT2 </Link>
      <br />
    </>
  )
}

export default Home
