// @ts-nocheck
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
type Data = {
  Login: boolean
  msg: string
}
const KEY = 'SECRET'
const TEXT_KEY = process.env.JAYdestroyRA
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let first = false
  let msg = '-'

  if (req.method !== 'POST') {
    console.log('WRONG CALL')
    msg = 'WRONG CALLL'
  } else {
    const resp = JSON.parse(req.body)
    const token = resp.value
    //   console.log(token)
    try {
      const verify = jwt.verify(token, KEY)
      const hash = verify['SEC_ID']
      res.status(200).json({ Login: true, msg: 'DONE' })
      return
    } catch (error) {
      res.status(200).json({ Login: true, msg: 'DONE' })
      return
    }
  }
}
