// @ts-nocheck
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
}
type payload = {
  Hospital: string
  Radiologist: string
  RadioEmail: string
  Location: string
  password?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const headers = req.headers
  if (headers['api-key'] !== process.env.NEXT_PUBLIC_API_KEY) {
    res.status(402).json({ Operation: false, msg: 'Wrong API key' })
    return
  }
  if (!req.body) {
    // console.log(req.body)
    res.status(402).json({ Operation: false, msg: 'No specifies' })
    return
  }
  const data = JSON.parse(req.body)
  //   console.log(data, 'here it is data')

  const id = data.id
  if (!id) {
    res.status(402).json({ Operation: false, msg: 'No ID specified' })
    return
  } else {
    const Hospital = data.Hospital
    const Radiologist = data.Radiologist
    const RadioEmail = data.RadioEmail
    const newpw = data.newpw
    const Location = data.Location

    if (!Hospital || !Radiologist || !RadioEmail || !Location) {
      res.status(200).json({
        Operation: false,
        msg: ' WTF wrong with payload',
      })
    } else {
      switch (req.method) {
        case 'POST':
          try {
            let payload: payload = {
              Hospital,
              Radiologist,
              RadioEmail,
              Location,
            }
            if (newpw) {
              const hash = bcrypt.hashSync(newpw, 8)
              payload = { ...payload, password: hash }
            }
            const note = await Subject.findByIdAndUpdate(id, payload, {
              new: true,
              runValidators: true,
            })

            if (!note) {
              return res
                .status(400)
                .json({ Operation: false, msg: 'Couldnt Update Document' })
            }

            res.status(200).json({ Operation: true, msg: 'SUccess' })
          } catch (error) {
            res.status(400).json({ Operation: false, msg: error })
          }
          break
        case 'DELETE':
          try {
            console.log(id)
            const deletedNote = await Subject.deleteOne({ _id: id })

            if (!deletedNote) {
              console.log('error rr jay')
              return res
                .status(400)
                .json({ Operation: false, msg: 'Couldnt Delete' })
            } else if (
              deletedNote.acknowledged &&
              deletedNote.deletedCount === 0
            ) {
              try {
                const deletedNote = await Subject.deleteOne({
                  Hospital: Hospital,
                })
                if (!deletedNote) {
                  console.log('error rr jay')
                  return res
                    .status(400)
                    .json({ Operation: false, msg: 'Couldnt Delete' })
                }
                console.log(deletedNote, 'deleted Note2')
                res.status(200).json({ Operation: true, msg: 'Success' })
                return
              } catch (error) {
                console.log(error, 'error jay')
                res.status(400).json({ Operation: false, msg: error })
              }
            }
            // console.log(deletedNote, 'deleted Note')

            res.status(200).json({ Operation: true, msg: 'Success' })
          } catch (error) {
            console.log(error, 'error jay')
            res.status(400).json({ Operation: false, msg: error })
          }
          break
        default:
          res
            .status(400)
            .json({ Operation: false, msg: 'Couldnt perform Operation' })
          break
      }
    }
  }
}
