import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { nanoid } from 'nanoid'

import { useLocalStorage } from 'hooks'


const SERVER_URL = '/api/chat'

export const useChat = (roomId) => {
  const [messages, setMessages] = useState([])
  const [userId] = useLocalStorage('userId', nanoid(8))
  const [username] = useLocalStorage('username')

  
  const socketRef = useRef(null)

  useEffect(() => {
    socketRef.current = io(SERVER_URL, {
      query: { roomId }
    })

    // отправляем запрос на получение сообщений
    socketRef.current.emit('message:get')

    // обрабатываем получение сообщений
    socketRef.current.on('messages', (messages) => {
      // определяем, какие сообщения были отправлены данным пользователем,
      // если значение свойства "userId" объекта сообщения совпадает с id пользователя,
      // то добавляем в объект сообщения свойство "currentUser" со значением "true",
      // иначе, просто возвращаем объект сообщения
      const newMessages = messages.map((msg) =>
        msg.userId === userId ? { ...msg, currentUser: true } : msg
      )
      // обновляем массив сообщений
      setMessages(newMessages)
    })

    return () => {
      // при размонтировании компонента выполняем отключение сокета
      socketRef.current.disconnect()
    }
  }, [roomId, userId, username])

  // функция отправки сообщения
  // принимает объект с текстом сообщения и именем отправителя
  const sendMessage = ({ messageText, senderLogin }) => {
    // добавляем в объект id пользователя при отправке на сервер
    socketRef.current.emit('message:add', {
      userId,
      messageText,
      senderLogin
    })
  }

  // хук возвращает сообщения и функцию для отправки сообщений
  return { messages, sendMessage }
}