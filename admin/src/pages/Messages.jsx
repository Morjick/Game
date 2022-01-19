import React, { useState, useEffect } from "react"

import Table from "../components/Table"
import MessageModal from "../components/MessageModal"

const Messages = () => {
  const [show, setShow] = useState(false)
  const [body, setBody] = useState([])

  const spanDay = document.querySelector('.activeBtn')
  let thisDay
  if (spanDay !== null) thisDay = spanDay.textContent || spanDay.innerText

  const [itDay, setItDay] = useState('Monday')

  let actives = document.querySelectorAll('.active--sidebar')

  actives.forEach(el => {
    el.classList.remove('active--sidebar')
  })

  const botItemActive = document.getElementById('messageItem')
  if (botItemActive != null) botItemActive.classList.add('active--sidebar')

  let data = {
    head: ['Date', 'Text', 'User', 'Status'],
    body
  }

  const updateMessage = async () => {
    const responce = await fetch('/api/find/message', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })

    const candidate = await responce.json()

    let timesArray = []
    let candidateMessage = []

    candidate.messages.forEach(el => {
      if (el.day === itDay) {
        console.log('el', el)
        candidateMessage.push(el)
      }
      // console.log('itDay', itDay)
    })

    candidateMessage.forEach(el => {
      const isStatus = (status) => {
        if (status) return 'Отправлено'
        if (!status) return 'Не отправлено'
      }

      const thisStatus = isStatus(el.status)
      let timesArr = [el.date, el.text, el.sender, thisStatus]

      timesArray.push(timesArr)
    })

    setBody(timesArray)
  }

  useEffect(async () => {
    const responce = await fetch('/api/find/message', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })

    const candidate = await responce.json()

    let timesArray = []
    let candidateMessage = []

    candidate.messages.forEach(el => {
      if (el.day === itDay) {
        candidateMessage.push(el)
      }
    })

    candidateMessage.forEach(el => {
      const isStatus = (status) => {
        if (status) return 'Отправлено'
        if (!status) return 'Не отправлено'
      }

      const thisStatus = isStatus(el.status)
      let timesArr = [el.date, el.text, el.sender, thisStatus]

      timesArray.push(timesArr)
    })

    setBody(timesArray)
  }, [])

  const activeHendler = async (e) => {
    let thisDay = e.target.textContent
    setItDay(thisDay)

    let actives = document.querySelector('.activeBtn')

    actives.classList.remove('activeBtn')
    e.target.className += ' activeBtn'    

    const responce = await fetch('/api/find/message', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })

    const candidate = await responce.json()

    let timesArray = []
    let candidateMessage = []

    candidate.messages.forEach(el => {
      if (el.day === thisDay) {
        candidateMessage.push(el)
      }
      // console.log('itDay', itDay)
    })

    candidateMessage.forEach(el => {
      const isStatus = (status) => {
        if (status) return 'Отправлено'
        if (!status) return 'Не отправлено'
      }

      const thisStatus = isStatus(el.status)
      let timesArr = [el.date, el.text, el.sender, thisStatus]

      timesArray.push(timesArr)
    })
    
    setBody(timesArray)
  }

  return (
    <div className="messages">

      <div className="messages_header">
        <div className="week_message">
          <span onClick={activeHendler} className="btn btn--subsidiary activeBtn">Monday</span>
          <span onClick={activeHendler} className="btn btn--subsidiary">Tuesday</span>
          <span onClick={activeHendler} className="btn btn--subsidiary">Wednesday</span>
          <span onClick={activeHendler} className="btn btn--subsidiary">Thursday</span>
          <span onClick={activeHendler} className="btn btn--subsidiary">Friday</span>
          <span onClick={activeHendler} className="btn btn--subsidiary">Saturday</span>
          <span onClick={activeHendler} className="btn btn--subsidiary">Sunday</span>
        </div>
        <button onClick={() => setShow(true)} className="btn btn--md">create message</button>
      </div>

      <div className="bots_desc page-desc-sm message_table">
        <Table items={data} />
      </div>

      <MessageModal createMessageHendler={updateMessage} onClose={() => setShow(false)} show={show} />
    </div>
  )
}

export default Messages