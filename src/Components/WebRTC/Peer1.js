import Peer from 'peerjs'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import React, {useState, useEffect} from 'react'
import './Peer1.css'

function Peer1() {
  const [peerId, setPeerId] = useState('')
  const [isDataSent, setIsDataSent] = useState(false)
  const peerIdHandler = event => {
    setPeerId(event.target.value)
  }
  const peer = new Peer()
  useEffect(() => {
    peer.on('open', id => {
      // document.getElementById('peerOneId').value = id

      console.log('My peer ID is: ', id)
      // peer.send('Hello!')
    })

    // peer.on('connection', conn => {
    //   console.log('Connection of receiver side called')

    //   conn.on('open', () => {
    //     conn.send('helli form peer 1')
    //   })
    //   conn.on('data', data => {
    //     console.log('Received', data)
    //   })
    // })
  }, [])

  const connectToPeerOne = () => {
    console.log('Called    ', peerId)
    const dataRequire = {
      masterPassword: JSON.parse(localStorage.getItem('MasterPassword')),
      passwordData: JSON.parse(localStorage.getItem('lists')),
    }

    const conn = peer.connect(peerId, {reliable: true})
    console.log('After conn')
    conn.on('open', () => {
      console.log('Connection on sender side called')
      console.log('the master password from ls is:  ', dataRequire)
      // conn.send('Hello from main peer')
      conn.send(dataRequire)
      setIsDataSent(true)
    })
    // conn.on('data', data => {
    //   console.log('Received from peer2', data)
    //   // localStorage.setItem('From webrtc', data)
    // })
  }

  if (isDataSent) {
    const message = 'Data sent to the Peer sucessfully!'
    toast.success(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  return (
    <div className="mainContainer">
      {/* <div className="container">
        <textarea id="peerOneId" />

        <button className="peerOne" type="submit">
          Get Id of peer one
        </button>
      </div> */}
      <div className="underMainContainer">
        <div className="container">
          <textarea
            className="peerOneId"
            onChange={peerIdHandler}
            value={peerId}
            placeholder="Enter the Peer Id you copied"
          />
          <button
            className="sendDataBtn"
            onClick={connectToPeerOne}
            type="submit"
          >
            Sync Passwords to this Peer
          </button>
        </div>
      </div>
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
  )
}

export default Peer1
