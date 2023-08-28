import React, {useEffect, useState} from 'react'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Try from '../Main'
import Peer2 from './WebRTC/Peer2'
import './MasterPassword.css'

function MasterPassword() {
  const [masterPass, setMasterPass] = useState('')
  const [enteredMasterPass, setEnteredMasterPass] = useState('')
  const [flag, setFlag] = useState(false)
  const [validFlag, setValidFlag] = useState(false)
  const [isReceiveClicked, setIsReceiveClicked] = useState(false)
  const [isMasterPass, setIsMasterPass] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('MasterPassword')) {
      setIsMasterPass(true)
    }
  }, [])

  const createMPHandler = event => {
    setMasterPass(event.target.value)
  }
  const enteredMPHandler = event => {
    setEnteredMasterPass(event.target.value)
  }
  const createMP = () => {
    if (masterPass.length === 0) {
      const message = 'The Master Password cannot be empty'
      toast.error(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return
    }
    localStorage.setItem('MasterPassword', JSON.stringify(masterPass))
    window.location.reload(false)
  }

  const loginMP = () => {
    console.log('The entered master password is: ', enteredMasterPass)
    const enteredMasterPassFromUser = JSON.parse(
      localStorage.getItem('MasterPassword'),
    )
    console.log('Got from LS: ', enteredMasterPassFromUser)
    if (enteredMasterPassFromUser === enteredMasterPass) {
      setFlag(true)
      console.log('The user is valid')
    } else {
      const message =
        'The entered password does not match with the registered Master Password'
      toast.error(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      setEnteredMasterPass('')
    }
  }

  const receiveHandler = () => setIsReceiveClicked(true)

  if (isReceiveClicked) return <Peer2 />

  //   useEffect(() => {
  //     localStorage.setItem('MasterPassword', JSON.stringify(masterPass))
  //   }, [masterPass])
  return (
    <>
      {!flag && (
        <div className="mainContainer">
          {!isMasterPass && (
            <div className="underMainContainer">
              <div className="createMasterPassDiv">
                <p
                  style={{
                    fontSize: 'xx-large',
                    fontFamily: "'Courier New', monospace",
                  }}
                >
                  <strong>Create Master Password</strong>
                </p>
                <input
                  className="createMasterPassInput"
                  placeholder="Enter your masterpassword here"
                  onChange={createMPHandler}
                  value={masterPass}
                />
                <button
                  className="createMasterPassButton"
                  onClick={createMP}
                  type="submit"
                >
                  Create Master Password (New User)
                </button>
                <button
                  className="createMasterPassButton"
                  onClick={receiveHandler}
                  type="submit"
                >
                  Receive from a Peer (For Sync)
                </button>
              </div>
            </div>
          )}
          {isMasterPass && (
            <div className="underMainContainer">
              <div className="createMasterPassDiv">
                <p
                  style={{
                    fontSize: 'xx-large',
                    fontFamily: "'Courier New', monospace",
                  }}
                >
                  <strong>Enter your Registered Master Password</strong>
                </p>
                <input
                  className="createMasterPassInput"
                  placeholder="Enter your registered Master Password here"
                  onChange={enteredMPHandler}
                  value={enteredMasterPass}
                />
                {validFlag && (
                  <div className="userDeniedDiv">
                    <p
                      style={{
                        fontSize: 'large',
                        color: 'red',
                        fontFamily: "'Courier New', monospace",
                      }}
                    >
                      <strong>
                        The entered password does not match with the registered
                        Master Password
                      </strong>
                    </p>
                  </div>
                )}
                <button
                  className="createMasterPassButton"
                  onClick={loginMP}
                  type="submit"
                >
                  Login
                </button>
              </div>
            </div>
          )}
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      )}

      {flag && <Try />}
    </>
  )
}

export default MasterPassword
