// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbconnect from '../../utils/dbconnect'
import Subject from '../../models/Subject'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
dbconnect()

type Data = {
  Operation: boolean
  msg: string
  object: {}
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    console.log('WRONG CALL')
    res.status(401).json({
      Operation: false,
      msg: 'WRONG METHOD BRUAHHH',
      object: {},
    })
    return
  }
  if (!req.body || req.body == ' ' || req.body == '') {
    res.status(401).json({
      Operation: false,
      msg: 'NO PAYLOAD BRUAHHH',
      object: {},
    })
    return
  } else {
    const data = JSON.parse(req.body)
    // console.log(data, 'recived data')

    const Hospital = data.Hospital
    const Radiologist = data.Radiologist
    const RadioEmail = data.RadioEmail
    const password = data.password
    const Location = data.Location

    if (!Hospital || !Radiologist || !RadioEmail || !password || !Location) {
      res.status(200).json({
        Operation: false,
        msg: ' WTF wrong with payload',
        object: {},
      })
      return
    }
    const hash = bcrypt.hashSync(password, 8)
    try {
      const _id = uuidv4()
      const note = await Subject.create({
        Hospital,
        Radiologist,
        RadioEmail,
        password: hash,
        Location,
      })

      res.status(200).json({
        Operation: true,
        msg: ' perfect',
        object: note,
      })
    } catch (error) {
      console.log(error, 'logs')

      res.status(200).json({
        Operation: false,
        msg: 'Repeated Hospital error',
        object: {},
      })
    }
  }
}
