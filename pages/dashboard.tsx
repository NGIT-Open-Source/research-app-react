// @ts-nocheck
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { LOGIN, LOGOUT } from '../redux/Login/action'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-modal'
import { STATE } from '../typings'
import { AiOutlinePlus } from 'react-icons/ai'
import dbconnect from '../utils/dbconnect'
import Subject from '../models/Subject'
import { Table } from 'reactable'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import celledit, { Type } from 'react-bootstrap-table2-editor'
import GitHubForkRibbon from 'react-github-fork-ribbon'

import { Menu, Item, Separator, Submenu } from 'react-contexify'
import '../node_modules/react-contexify/dist/ReactContexify.min.css'
import Popup from 'reactjs-popup'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import bcrypt from 'bcryptjs'

import filterFactory, {
  textFilter,
  Comparator,
} from 'react-bootstrap-table2-filter'
interface POSTS {
  resp: Array<POST>
}

interface POST {
  _id: string
  Hospital: string
  Radiologist: string
  RadioEmail: string
  Location: string
  password: string
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

  let data = resp.reverse()
  // console.log(data, 'graddle')]
  const [view, setview] = useState<boolean>(false)
  const [model2Status, setmodel2Status] = useState<boolean>(false)
  const [model3Status, setmodel3Status] = useState<boolean>(false)
  const [ID, seID] = useState<string>('')
  const [Hospital, setHospital] = useState<string>('')
  const [Radiologist, setRadiologist] = useState<string>('')
  const [RadioEmail, setRadioEmail] = useState<string>('')
  const [password, setpassword] = useState<string>('')
  const [Confirm, setConfirm] = useState<string>('')
  const [Location, setLocation] = useState<string>('')
  const [hash, sethash] = useState<string>('')
  const [deleteModel, setdeleteModel] = useState<boolean>(false)
  let [newpw, setnewpw] = useState<string>('')

  const router = useRouter()
  const LOGGED = useSelector((state: STATE) => state.login.LOGGED)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!LOGGED) {
      if (typeof window !== 'undefined') {
        router.push('/Login')
      }
    } else {
      setview(true)
    }
  }, [])

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

  async function DELETEForm() {
    console.log(ID, Hospital, Radiologist, RadioEmail, Location)
    const res = await fetch('/api/edit-delSubject', {
      method: 'DELETE',
      body: JSON.stringify({
        id: ID,
        Hospital,
        Radiologist,
        RadioEmail,
        Location,
      }),
      headers: {
        'api-key': process.env.NEXT_PUBLIC_API_KEY,
      },
    }).then((resp) => resp.json())
    if (!res.Operation) {
      console.log(res.msg, 'error jay')
      alert(res.msg + '  ' + 'delete error' + '   ' + res.msg)
      seID('')
      setHospital('')
      setRadiologist('')
      setRadioEmail('')
      setpassword('')
      setConfirm('')
      setLocation('')
      sethash('')
      setnewpw('')
      return
    } else {
      console.log(res)
    }
    setmodel3Status(false)
    seID('')
    setHospital('')
    setRadiologist('')
    setRadioEmail('')
    setpassword('')
    setConfirm('')
    setLocation('')
    sethash('')
    setnewpw('')
    Router.reload(window.location.pathname)
  }

  async function Submit2Form() {
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
      if (bcrypt.compareSync(password, hash)) {
        if (newpw.trim().length === 0) {
          console.log(ID, Hospital, Radiologist, RadioEmail, Location)
          const res = await fetch('/api/edit-delSubject', {
            method: 'POST',
            body: JSON.stringify({
              id: ID,
              Hospital,
              Radiologist,
              RadioEmail,
              Location,
            }),
            headers: {
              'api-key': process.env.NEXT_PUBLIC_API_KEY,
            },
          }).then((resp) => resp.json())
          if (!res.Operation) {
            alert(res.msg + 'error')
            return
          }
          setmodel3Status(false)
          seID('')
          setHospital('')
          setRadiologist('')
          setRadioEmail('')
          setpassword('')
          setConfirm('')
          setLocation('')
          sethash('')
          setnewpw('')
          Router.reload(window.location.pathname)
        } else {
          const res = await fetch('/api/edit-delSubject', {
            method: 'POST',
            body: JSON.stringify({
              id: ID,
              Hospital,
              Radiologist,
              RadioEmail,
              Location,
              newpw: newpw,
            }),
            headers: {
              'api-key': process.env.NEXT_PUBLIC_API_KEY,
            },
          }).then((resp) => resp.json())
          if (!res.Operation) {
            alert(res.msg + 'error2')
            return
          }
          setmodel3Status(false)
          seID('')
          setHospital('')
          setRadiologist('')
          setRadioEmail('')
          setpassword('')
          setConfirm('')
          setLocation('')
          sethash('')
          setnewpw('')
          Router.reload(window.location.pathname)
        }
      } else {
        alert('OLD AND NEW PASSWORDS DONE MATCH')
      }
    }
  }

  async function SubmitForm() {
    const pwdFilter =
      /^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*[\d|@#$!%*?&])[\p{L}\d@#$!%*?&]{8,96}$/gmu
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
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(RadioEmail)
    ) {
      alert('EMAIL IS NOT VALID')
    } else if (!pwdFilter.test(password)) {
      alert(`
      --> PASSWORD must not contain any whitespace.

      --> PASSWORD must contain at least one uppercase, one lowercase and one numeric character.

      --> PASSWORD must contain at least one special character. [~!@#$%^&*()--+={}[]|\:;"'<>,.?/_₹]

      --> Length must be between 8 to 96 characters.

      `)
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
        headers: {
          'api-key': process.env.NEXT_PUBLIC_API_KEY,
        },
      }).then((resp) => resp.json())
      if (!res.Operation) {
        alert(res.msg + '')
        return
      }
      setHospital('')
      setRadiologist('')
      setRadioEmail('')
      setpassword('')
      setConfirm('')
      setLocation('')
      Router.reload(window.location.pathname)
    }
  }
  // const priceFilter =

  const linkFollow = (
    cell: any,
    row: POST,
    rowIndex: any,
    formatExtraData: any
  ) => {
    return (
      <div className="mx-4 space-x-8">
        <Button
          className="btn btn-warning"
          onClick={() => {
            sethash(row.password)
            seID(row._id)
            setHospital(row.Hospital)
            setRadiologist(row.Radiologist)
            setRadioEmail(row.RadioEmail)
            setLocation(row.Location)
            setmodel3Status(true)
            console.log(hash.length, 'hash')
          }}
        >
          <AiFillEdit />
        </Button>
        <Button
          className="btn btn-secondary"
          onClick={() => {
            console.log(row)
            sethash(row.password)
            seID(row._id)
            setHospital(row.Hospital)
            setRadiologist(row.Radiologist)
            setRadioEmail(row.RadioEmail)
            setLocation(row.Location)
            setdeleteModel(true)
          }}
        >
          <AiFillDelete />
        </Button>
      </div>
    )
  }

  const colums = [
    {
      dataField: 'Hospital',
      text: 'Hospital',
      sort: true,

      filter: textFilter({
        placeholder: 'Search ', // custom the input placeholder
        className: 'px-3 ', // custom classname on input
        comparator: Comparator.EQ, // default is Comparator.LIKE
        caseSensitive: true, // default is false, and true will only work when comparator is LIKE
        id: 'id', // assign a unique value for htmlFor attribute, it's useful when you have same dataField across multiple table in one page
      }),

      // https://codesandbox.io/s/vj7r8qrmy7?file=/src/App.js:4722-5042
    },
    {
      dataField: 'Radiologist',
      text: 'Radiologist',
      sort: true,
      filter: textFilter({
        placeholder: 'Search',
      }),
      classes: 'cellWeight600',
    },
    {
      dataField: 'RadioEmail',
      text: 'RadioEmail',
      sort: true,
      filter: textFilter({
        placeholder: 'Search',
      }),
      classes: 'cellWeight600',
    },
    {
      dataField: 'Location',
      text: 'Location',
      sort: true,
      filter: textFilter({
        placeholder: 'Search',
      }),
      classes: 'cellWeight600',
    },
    {
      dataField: 'Actions',
      text: 'Actions',
      formatter: linkFollow,
      sort: true,
    },
  ]

  function LOG_OUT() {
    dispatch(LOGOUT())
    localStorage.removeItem('JWTcipher')
    Router.reload(window.location.pathname)
  }

  const styles = 'my-12 max-h-full'
  const hide = 'my-12 max-h-full hidden'
  return (
    <div className={view ? styles : hide}>
      {/* <GitHubForkRibbon
        href="//www.google.com"
        target="_blank"
        position="right fixed"
        // className=""
      >
        LOGOUT
      </GitHubForkRibbon> */}
      <div
        onClick={() => LOG_OUT()}
        className="corner-ribbon top-right blue sticky cursor-pointer"
      >
        LOGOUT
      </div>
      {/* <div className="ribbon-corner">Sale!</div> */}

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
          pagination={paginationFactory({ sizePerPage: 20 })}
          // rowEvents={rowEvents}
          filter={filterFactory()}
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
        onRequestClose={() => {
          setHospital('')
          setRadiologist('')
          setRadioEmail('')
          setpassword('')
          setConfirm('')
          setLocation('')
          setmodel2Status(false)
        }}
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
                onClick={() => {
                  setHospital('')
                  setRadiologist('')
                  setRadioEmail('')
                  setpassword('')
                  setConfirm('')
                  setLocation('')
                  setmodel2Status(false)
                }}
                className="w-full rounded-lg bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 sm:w-auto"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={model3Status}
        onRequestClose={() => {
          setHospital('')
          setRadiologist('')
          setRadioEmail('')
          setpassword('')
          setConfirm('')
          setLocation('')
          setmodel3Status(false)
        }}
        style={customStyles}
      >
        <div>
          <div className="space-y-7">
            <div>
              <h3 className="font-bold">EDIT OLD SR - HOSPITAL</h3>
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
              <div className="group relative z-0 mb-6 w-full">
                <input
                  value={newpw}
                  onChange={(e) => setnewpw(e.target.value)}
                  name="repeat_password"
                  id="floating_repeat_password"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-black dark:focus:border-blue-500"
                  placeholder=" "
                  required
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500">
                  NEW PASSWORD [OPTIONAL]
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
                onClick={Submit2Form}
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setHospital('')
                  setRadiologist('')
                  setRadioEmail('')
                  setpassword('')
                  setConfirm('')
                  setLocation('')
                  setmodel3Status(false)
                }}
                className="w-full rounded-lg bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 sm:w-auto"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={deleteModel}
        onRequestClose={() => {
          setdeleteModel(false)
        }}
        style={customStyles}
      >
        <div>
          <div className="space-y-7">
            <div>
              <h3 className="font-mono text-xl">
                Are you Sure you Want to Delete This Hospital RECORD
              </h3>
            </div>
            <div className="flex justify-between space-x-7">
              <button
                className="w-full rounded-lg bg-red-700 px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 sm:w-auto"
                onClick={() => {
                  console.log('stfff')
                  DELETEForm()
                }}
              >
                DELETE
              </button>
              <button
                onClick={() => {
                  setdeleteModel(false)
                }}
                className="w-full rounded-lg bg-green-500 px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 sm:w-auto"
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

export async function getServerSideProps() {
  dbconnect()
  const notes = await Subject.find({}).lean()
  // console.log(notes, 'notes')
  const resp = JSON.parse(JSON.stringify(notes))
  // console.log(resp, 'resp')
  return {
    props: { resp }, // will be passed to the page component as props
  }
}
