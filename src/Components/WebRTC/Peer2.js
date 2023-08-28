import React, {useState, useEffect} from 'react'
import Peer from 'peerjs'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './Peer2.css'

function Peer2() {
  const peer = new Peer()
  const [peerId, setPeerID] = useState('')
  const [isDataReceived, setIsDataReceived] = useState(false)

  useEffect(() => {
    peer.on('open', id => {
      console.log('Peer two ID is: ', id)
      setPeerID(id)
      // peer.send('Hello!')
    })

    peer.on('connection', conn => {
      console.log('Connection of receiver side called')

      //   conn.on('open', () => {
      //     conn.send('helli form peer 1')
      //   })
      conn.on('data', data => {
        console.log('Received in peer2js', data)

        localStorage.setItem(
          'MasterPassword',
          JSON.stringify(data.masterPassword),
        )
        localStorage.setItem('lists', JSON.stringify(data.passwordData))
        setIsDataReceived(true)
      })
    })
  }, [])

  if (isDataReceived) {
    const message = 'Data received sucessfully from the main Peer!'
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

  const handleCopyPeerID = () => {
    navigator.clipboard.writeText(peerId)
    const message = 'Copied to Clipboard!!'
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
      <div className="underMainContainer">
        <div>
          <p
            style={{
              fontSize: 'xx-large',
              fontFamily: "'Courier New', monospace",
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            The id of this Peer is
          </p>
          <button
            onClick={handleCopyPeerID}
            type="submit"
            className="copy__btn"
            style={{marginRight: '55.5rem', marginTop: '25rem'}}
          >
            Copy to clipboard
            <i className="far fa-clipboard" style={{marginLeft: '10px'}} />
          </button>
          <strong style={{marginLeft: '16rem', fontSize: 'x-large'}}>
            {peerId}
          </strong>
        </div>
        <div className="instructionsDiv">
          <p
            style={{
              marginTop: '10rem',
              fontSize: 'larger',
              fontFamily: "'Courier New', monospace",
            }}
          >
            <strong>
              -- Send this ID via WhatsApp or any another messaging app to the
              device you want to sync passwords to.
            </strong>
          </p>
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

export default Peer2
