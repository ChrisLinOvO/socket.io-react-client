import './App.css';
import React, { useState, useEffect } from 'react'
import socketClient from 'socket.io-client'
import ConnectBlock from './components/ConnectBlock'
import ControlButton from './components/ControlButton'

function App() {
  const [message, setMessage] = useState('初始訊息')


  const [room, setRoom] = useState('room_1')
  const [socket, setSocket] = useState(null)

  const openConnect = () => {
    setSocket(socketClient('http://localhost:3333'))
  }
  useEffect(() => {
    if (socket) {
      socketInit()
    }
  }, [socket])


  const closeConnect = () => {
    socket.close()
    setSocket(null)
  }

  //選擇聊天室時觸發，如果有選擇那就將房間 id 送給 Server

  const changeRoom = (event) => {
    // let room = event.target.value
    // socket.emit('addRoom', room)
    setRoom(event.target.value)

  }

  const socketInit = () => {
    // socket.on('addRoom', message => {
    //   console.log(message)
    //   setMessage(message)
    // })
    socket.on('getMessage', message => {
      setMessage(message)
    })

    socket.on('getMessageAll', message => {
      setMessage(message)
    })

    socket.on('getMessageLess', message => {
      setMessage(message)
    })

    socket.on('getMessageRoom', message => {
      setMessage(message)
    })


    sendMessage('setRoom')
  }

  const sendMessage = type => {
    switch (type) {
      case 'setRoom':
        socket.emit('setRoom', room)
        break
      case 'onlyCatch':
        socket.emit('getMessage', '只回傳給發送訊息的 client')
        break
      case 'allCatch':
        socket.emit('getMessageAll', '發送訊息後 server 回傳給所有連結的 client')
        break
      case 'lessCatch':
        socket.emit('getMessageLess', '發送訊息後 server 回傳給除了自己外所有連結的 client')
        break
      case 'roomCatch':
        socket.emit('getMessageRoom', '發送訊息後 server 回傳給相同房間的 client')
        break
    }
  }

  return (
    <div>
      <ConnectBlock room={room}
        setRoom={changeRoom}
        socket={socket}
        openConnect={openConnect}
        closeConnect={closeConnect} />
      <br />
      <span>{message}</span>
      <br /><br />
      <ControlButton sendMessage={sendMessage} />
    </div>
  )
}

export default App;
