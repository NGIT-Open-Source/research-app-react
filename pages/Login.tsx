import { useState } from 'react'
import Router from 'next/router'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'
import { LOGIN } from '../redux/Login/action'
import Link from 'next/link'

export default function Login() {
  const [modelStatus, setmodelStatus] = useState<boolean>(false)
  const [model2Status, setmodel2Status] = useState<boolean>(false)
  const [model3Status, setmodel3Status] = useState<boolean>(false)
  const [user, setuser] = useState<string>('')
  const [password, setpassword] = useState<string>('')
  const [errormsg, seterrormsg] = useState<string>('')
  const dispatch = useDispatch()
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

  async function Submitform() {
    console.log('whatss')
    if (user === '' || password === '') {
      setmodel2Status(true)
      return
    }
    const res = await fetch('/api/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ user, password }),
    }).then((resp) => resp.json())
    // console.log(res)
    if (!res.Login) {
      setmodel3Status(true)
      seterrormsg(res.msg)
      return
    }
    const now = new Date()
    const item = {
      value: res.token,
      expiry: now.getTime() + 8640000,
    }
    localStorage.setItem('JWTcipher', JSON.stringify(item))
    dispatch(LOGIN())
    Router.push('/dashboard')
  }

  return (
    <div>
      <section className="h-screen">
        <div className="container h-full px-6 py-12">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-gray-800">
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone image"
              />
            </div>
            <div className="md:w-8/12 lg:ml-20 lg:w-5/12">
              <form>
                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                    placeholder="USERNAME HERE.."
                    value={user}
                    onChange={(e) => setuser(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="password"
                    className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-6 flex items-center justify-between">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none"
                      id="exampleCheck3"
                    />
                    <label className="form-check-label inline-block text-gray-800">
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#!"
                    className="text-blue-600 transition duration-200 ease-in-out hover:text-blue-700
                     focus:text-blue-700 active:text-blue-800"
                    onClick={() => setmodelStatus(true)}
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300"></div>
              </form>

              <button
                className="inline-block w-full rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                onClick={Submitform}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </section>

      <Modal
        isOpen={modelStatus}
        onRequestClose={() => setmodelStatus(false)}
        style={customStyles}
      >
        <div className="space-y-4">
          <div>
            <h3>
              Well if this is the case there are 3 ways to solve this issue
            </h3>
            <ol>
              <li> 1. Calm downand remember the password</li>
              <li> 2. Give your devs their Pay and ask em to reset </li>
              <li> 3. DIY</li>
            </ol>
          </div>
          <button
            onClick={() => setmodelStatus(false)}
            className="flex-1 items-center justify-around rounded-md bg-green-400 p-3"
          >
            DONE
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={model2Status}
        onRequestClose={() => setmodel2Status(false)}
        style={customStyles}
      >
        <div className="space-y-4">
          <div>
            <h3>Please enter the given fields</h3>
            <h3>Do not submit empty form</h3>
          </div>
          <button
            onClick={() => setmodel2Status(false)}
            className="flex-1 items-center justify-around rounded-md bg-green-400 p-3"
          >
            DONE
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={model3Status}
        onRequestClose={() => setmodel3Status(false)}
        style={customStyles}
      >
        <div className="space-y-4">
          <div>
            <h3>Oops This might have happened</h3>
            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300"></div>
            <h3>{errormsg}</h3>
          </div>
          <button
            onClick={() => setmodel3Status(false)}
            className="flex-1 items-center justify-around rounded-md bg-green-400 p-3"
          >
            DONE
          </button>
        </div>
      </Modal>
    </div>
  )
}
