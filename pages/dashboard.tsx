import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { STATE } from '../typings'

export default function dashboard() {
  const router = useRouter()
  const LOGGED = useSelector((state: STATE) => state.login.LOGGED)
  if (!LOGGED) {
    if (typeof window !== 'undefined') {
      router.push('/Login')
    }
  } else {
  }
  return (
    <div>
      dcsawdc
      <Link href={'/'}>time to go home</Link>
    </div>
  )
}
