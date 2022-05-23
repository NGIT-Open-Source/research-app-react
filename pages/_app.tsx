// @ts-nocheck
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from '../redux/store'
import { LOGIN, LOGOUT } from '../redux/Login/action'
import { useDispatch, useSelector } from 'react-redux'
import { STATE } from '../typings'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import 'bootstrap/dist/css/bootstrap.css'

function MyApp({ Component, pageProps }: AppProps) {
  if (typeof window !== 'undefined') {
    // Perform localStorage action
    const LOGGED = useSelector((state: STATE) => state.login.LOGGED)
    const dispatch = useDispatch()
    if (!LOGGED) {
      const now = new Date()
      const value = localStorage.getItem('JWTcipher')
      if (value) {
        const item = JSON.parse(value)
        if (now.getTime() > item.expiry) {
          // If the item is expired, delete the item from storage
          // and return null
          localStorage.removeItem('JWTcipher')
        }
        // console.log(value, 'we are here')
        else {
          const check = async (value: string) => {
            const res = await fetch('/api/validateJWT', {
              method: 'POST',
              credentials: 'include',
              body: JSON.stringify({ value }),
            }).then((resp) => resp.json())
            // console.log()
            if (res.Login) {
              // console.log(res, 'response bruah')
            }
          }
          check(value).then((resp) => {
            // console.log(resp, ' wtff')
          })
          try {
            var decoded = jwt.verify(item.value, 'SECRET')
            const resp = bcrypt.compareSync(
              process.env.NEXT_PUBLIC_JAYENDRA,
              decoded.SEC_ID
            )
            dispatch(LOGIN())
            // console.log(decoded.SEC_ID, resp, 'SECRET')
          } catch (err) {
            console.log(err, 'error')
          }
        }
      }
    }
  }
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)
