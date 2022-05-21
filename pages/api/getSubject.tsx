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
  if (req.method !== 'GET') {
    console.log('WRONG CALL')
    res.status(401).json({
      Operation: false,
      msg: 'WRONG METHOD BRUAHHH',
      object: {},
    })
    return
  }
  try {
    const notes = await Subject.find({})
    res.status(200).json({ Operation: true, msg: 'NICE', object: notes })
    return
  } catch (error) {
    res
      .status(400)
      .json({ Operation: false, msg: 'INTERNAL SERVER ERROR', object: {} })
    return
  }
}
