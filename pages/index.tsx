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
  if (!LOGGED) {
    // return <>HI</>
  }
  return (
    <div
      id="loading-screen"
      className="fixed top-0 left-0 z-50 block  h-full w-full bg-white opacity-75"
    >
      hi
      <span className="relative top-1/2 my-0 mx-auto block h-0 w-0 text-green-500 opacity-75">
        <i className="fas fa-circle-notch fa-spin fa-5x"></i>
        hi
      </span>
    </div>
  )
}

export default Home
