import React, { useEffect, useState, useRef } from "react"
import io from 'socket.io-client'

// import timesMessages from '../data/messages'

const Chat = () => {
  const [username, setUsername] = useState('No name')
  const [messages, setMessages] = useState([])
  const userId = localStorage.getItem('userId')
  let socket

  socket = io.connect('/', { reconnect: false })

  useEffect(() => {
    socket.emit('getMessage')
  }, [])
  socket.on('getMessages', (socket) => {
    setMessages(socket)
  })

  useEffect(async () => {
    const data = {
      userId
    }

    const responce = await fetch('/api/find/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const candidate = await responce.json()
    if (candidate.user.login) setUsername(candidate.user.login)
  }, [])

  const sendMessage = () => {
    const text = document.getElementById('textMessage')
    const thisTime = new Date()
    const month = String(thisTime).split(' ')[1]
    const date = String(thisTime).split(' ')[2]
    const year = String(thisTime).split(' ')[3]

    const time = `${year} ${date} ${month} ${thisTime.getHours()}:${thisTime.getMinutes()}`

    const user = {
      sender: username,
      text: text.value,
      time
    }

    console.log(user)
    socket.emit('sendMessage', user)
    text.value = ''
  }

  const changeChat = () => {
    const content = document.querySelector('.Chat_content')
    console.log(content.scrollHeight)
  }

  const chatRef = useRef()

  useEffect(() => {
    let chatDiv = chatRef.current
    console.log(chatDiv)

    setTimeout(() => {
      chatDiv.scrollTop = chatDiv.scrollHeight
    }, 1)
  }, [])

  return (
    <div className="DesktopContent">
      <div className="ChatHeader">Chat</div>

      <div id="chatContainer" className="Chat" ref={chatRef}>
        <div onScroll={changeChat} className="Chat_content">
          {messages.map((msg) => (
            <>
              <div className="ChatRow">
                <div className="ChatRow_time">{msg.time}</div>
                <div className="ChatRow_name">{msg.sender}:</div>
                <div className="ChatRow_text">{msg.text}</div>
              </div>
            </>
          ))}
        </div>
        <div className="Chat_newMessage ChatNewMessage">
          <input id="textMessage" className="ChatNewMessage_input" />
          <button onClick={sendMessage} id="sendBtn" className="ChatNewMessage_button" >Send</button>
        </div>
      </div>

    </div>
  )
}

export default Chat