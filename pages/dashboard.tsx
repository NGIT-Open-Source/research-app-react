import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useSelector } from 'react-redux'
import { STATE } from '../typings'
import { AiOutlinePlus } from 'react-icons/ai'
import { GetServerSideProps } from 'next'
import dbconnect from '../utils/dbconnect'
import Subject from '../models/Subject'
import { Table } from 'reactable'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import celledit, { Type } from 'react-bootstrap-table2-editor'
import filter, { textFilter } from 'react-bootstrap-table2-filter'
interface POSTS {
  resp: Array<POST>
}

interface POST {
  _id: string
  Hospital: string
  Radiologist: string
  RadioEmail: string
  Location: string
}

export default function dashboard({ resp }: POSTS) {
  type Person = {
    firstName: string
    lastName: string
    age: number
    visits: number
    status: string
    progress: number
  }

  const data = resp.reverse()
  console.log(data, 'graddle')
  const modified = data.map((post) => ({
    Hospital: post.Hospital,
    RadioEmail: post.RadioEmail,
    Location: post.Location,
    Radiologist: post.Radiologist,
  }))

  const [model2Status, setmodel2Status] = useState<boolean>(false)
  const [Hospital, setHospital] = useState<string>('')
  const [Radiologist, setRadiologist] = useState<string>('')
  const [RadioEmail, setRadioEmail] = useState<string>('')
  const [password, setpassword] = useState<string>('')
  const [Confirm, setConfirm] = useState<string>('')
  const [Location, setLocation] = useState<string>('')

  const router = useRouter()
  const LOGGED = useSelector((state: STATE) => state.login.LOGGED)
  if (!LOGGED) {
    if (typeof window !== 'undefined') {
      router.push('/Login')
    }
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  }

  async function SubmitForm() {
    if (
      !Hospital ||
      !Radiologist ||
      !RadioEmail ||
      !password ||
      !Confirm ||
      !Location
    ) {
      alert('please fill all the feilds')
    } else if (password !== Confirm) {
      alert('NO mY MAN PASSWORDS DONT MATCH 💔')
    } else {
      setmodel2Status(false)
      const res = await fetch('/api/addSubject', {
        method: 'POST',
        body: JSON.stringify({
          Hospital,
          Radiologist,
          RadioEmail,
          password,
          Location,
        }),
      }).then((resp) => resp.json())
      if (!res.Operation) {
        alert(res.msg)
        return
      }
      setHospital('')
      setRadiologist('')
      setRadioEmail('')
      setpassword('')
      setConfirm('')
      setLocation('')
    }
  }

  const colums = [
    {
      dataField: 'Hospital',
      text: 'Hospital',
      sort: true,
    },
    {
      dataField: 'Radiologist',
      text: 'Radiologist',
      sort: true,
    },
    {
      dataField: 'RadioEmail',
      text: 'RadioEmail',
      sort: true,
    },
    {
      dataField: 'Location',
      text: 'Location',
      sort: true,
    },
  ]

  return (
    <div className="my-12 max-h-full">
      <div className="mx-auto max-w-5xl space-y-4 border-2 p-8 shadow-sm">
        <div>
          <h2 className="font-mono text-2xl">Hospitals Under Control</h2>
          <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300"></div>
        </div>

        <BootstrapTable
          columns={colums}
          keyField="_id"
          data={data}
          striped
          hover
          condensed
          pagination={paginationFactory()}
          cellEdit={celledit({
            mode: 'click',
          })}
          filter={filter()}
        />
        {/* <div className="overflow-y-scroll ">
          {data.map((post) => (
            <div key={post._id}>
              <div className="flex justify-around">
                <div>{post.Location}</div>
                <div>{post.Hospital}</div>
                <div>{post.Radiologist}</div>
              </div>
            </div>
          ))}
        </div> */}
      </div>
      <button
        type="button"
        className="fixed bottom-5 right-5 inline-block  rounded-full bg-green-500 p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-green-600 hover:shadow-lg focus:bg-green-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg "
        onClick={() => setmodel2Status(true)}
      >
        <AiOutlinePlus className="h-8 w-8" />
      </button>

      <Modal
        isOpen={model2Status}
        onRequestClose={() => setmodel2Status(false)}
        style={customStyles}
      >
        <div>
          <div className="space-y-7">
            <div>
              <h3 className="font-bold">ADD NEW SR - HOSPITAL</h3>
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300"></div>
            </div>

            <form>
              <div className="group relative z-0 mb-6 w-full">
                <input
                  value={Hospital}
                  onChange={(e) => setHospital(e.target.value)}
                  name="floating_email"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-black dark:focus:border-blue-500"
                  placeholder=" "
                  required
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500">
                  Radiologist Slug
                </label>
              </div>
              <div className="group relative z-0 mb-6 w-full">
                <input
                  value={Radiologist}
                  onChange={(e) => setRadiologist(e.target.value)}
                  name="floating_email"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-black focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-black dark:focus:border-blue-500 "
                  placeholder=" "
                  required
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500">
                  Senior Radiologist ID
                </label>
              </div>
              <div className="group relative z-0 mb-6 w-full">
                <input
                  value={RadioEmail}
                  onChange={(e) => setRadioEmail(e.target.value)}
                  type="email"
                  name="floating_password"
                  id="floating_password"
                  className="peer block w-full  border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-black dark:focus:border-blue-500"
                  placeholder=" "
                  required
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500">
                  SR Radiology Email
                </label>
              </div>
              <div className="group relative z-0 mb-6 w-full">
                <input
                  value={Location}
                  onChange={(e) => setLocation(e.target.value)}
                  name="repeat_password"
                  id="floating_repeat_password"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-black dark:focus:border-blue-500"
                  placeholder=" "
                  required
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500">
                  Hospital Location
                </label>
              </div>
              <div className="grid xl:grid-cols-2 xl:gap-6">
                <div className="group relative z-0 mb-6 w-full">
                  <input
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    type="password"
                    name="floating_first_name"
                    id="floating_first_name"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-black dark:focus:border-blue-500"
                    placeholder=" "
                    required
                  />
                  <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500">
                    Password
                  </label>
                </div>
                <div className="group relative z-0 mb-6 w-full">
                  <input
                    value={Confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    type="password"
                    name="floating_last_name"
                    id="floating_last_name"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-black dark:focus:border-blue-500"
                    placeholder=" "
                    required
                  />
                  <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500">
                    Confirm password
                  </label>
                </div>
              </div>
            </form>
            <div className="flex justify-between">
              <button
                className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
                onClick={SubmitForm}
              >
                Submit
              </button>
              <button
                onClick={() => setmodel2Status(false)}
                className="w-full rounded-lg bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 sm:w-auto"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export async function getStaticProps() {
  dbconnect()
  const notes = await Subject.find({}).lean()
  // console.log(notes, 'notes')
  const resp = JSON.parse(JSON.stringify(notes))
  // console.log(resp, 'resp')

  return {
    props: { resp }, // will be passed to the page component as props
  }
}
