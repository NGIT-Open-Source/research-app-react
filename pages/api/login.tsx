// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
type Data = {
  Login: Boolean
  token: string | null | undefined
  msg: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //   console.log(typeof req.body, 'hereee it is')
  if (!req.body || req.body == ' ' || req.body == '') {
    res.status(401).json({
      Login: false,
      token: null,
      msg: 'NO USER PAYLOAD DAMN IT ❌',
    })
    return
  }
  const resp = JSON.parse(req.body)
  const user = resp.user
  const password = resp.password
  if (!user || !password) {
    res.status(401).json({
      Login: false,
      token: null,
      msg: 'NO USER PAYLOAD DAMN IT ❌',
    })
    return
  }
  // console.log('procedd', user, process.env.SDMIN_USER)
  if (user == process.env.SDMIN_USER) {
    console.log('procedd')
    const SADMIN_PW = process.env.SADMIN_PW
    if (password !== SADMIN_PW) {
      res.status(200).json({
        Login: false,
        token: null,
        msg: 'NO YOU HAVE WRONG PASSWORD-KEY MY FRIEND ❌',
      })
      return
    } else {
      bcrypt.hash(process.env.NEXT_PUBLIC_JAYENDRA, 8, function (err, hash) {
        const payload = {
          SEC_ID: hash,
          Date: Date.now().toString(),
        }
        // console.log(payload, 'payload')

        const KEY = 'SECRET'
        const Token = jwt.sign(payload, KEY, {
          expiresIn: 31556926, // 1 year in seconds
        })

        const serial = serialize('JWT', Token, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 30,
          path: '/',
        })
        res.setHeader('Set-cookie', serial)
        res.status(200).json({
          Login: true,
          token: Token,
          msg: 'PERFECT 💹',
        })

        return
      })
    }
  } else {
    res.status(200).json({
      Login: false,
      token: null,
      msg: 'NAHHH WRONG-USER NAME MY MAN ❌',
    })
  }
}
