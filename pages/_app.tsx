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
        // console.log(value, 'we are here')
        const check = async (value: string) => {
          const res = await fetch('/api/validateJWT', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ value }),
          }).then((resp) => resp.json())
          // console.log()
          if (res.Login) {
            console.log(res, 'response bruah')
            return true
          }
        }
        check(value).then((resp) => {
          console.log(resp, ' wtff')
        })
      }
      dispatch(LOGIN())
    }
  }
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)
