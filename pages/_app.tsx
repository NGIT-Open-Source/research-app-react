import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from '../redux/store'
import { LOGIN } from '../redux/Login/action'
import { useDispatch, useSelector } from 'react-redux'
import { STATE } from '../typings'

function MyApp({ Component, pageProps }: AppProps) {
  if (typeof window !== 'undefined') {
    // Perform localStorage action
    const LOGGED = useSelector((state: STATE) => state.login.LOGGED)
    const dispatch = useDispatch()
    if (!LOGGED) {
      const value = localStorage.getItem('x-access-token')
      if (value) {
        dispatch(LOGIN())
      }
    }
  }
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)
