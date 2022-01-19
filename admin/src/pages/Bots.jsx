import React, { useState, useEffect } from "react"

import Table from '../components/Table'
import CreateBotModal from '../components/BotModal'

const Bots = () => {
  const [show, setShow] = useState(false)
  const [body, setBody] = useState([])

  let actives = document.querySelectorAll('.active--sidebar')

  actives.forEach(el => {
    el.classList.remove('active--sidebar')
  })

  const botItemActive = document.getElementById('botItem')
  if (botItemActive !== null) botItemActive.classList.add('active--sidebar')

  let data = {
    head: ['Login', 'Currency', 'Bet amoun', 'Luck', 'Time interval'],
    body
  }

  const updateUsers = async () => {

    const responce = await fetch('/api/find/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    })

    const candidate = await responce.json()

    let timesArray = []

    candidate.users.forEach(el => {
      let timesArr = [el.login, el.currency, `${el.amountMin} - ${el.amountMax}`, el.luck, '10:00-15:00']

      function usersSelect(type) {
        const thisType = type

        if (thisType === 'Admin') {
          return true
        } else {
          return false
        }
      }

      const isAdmin = usersSelect(el.typeUser)

      if (!isAdmin) timesArray.push(timesArr)
    })

    setBody(timesArray)
  }

  useEffect(async () => {
    const responce = await fetch('/api/find/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    })

    const candidate = await responce.json()

    let timesArray = []


    candidate.users.forEach(el => {
      let timesArr = [el.login, el.currency, `${el.amountMin} - ${el.amountMax}`, el.luck, '10:00-15:00']

      function usersSelect(type) {
        const thisType = type

        if (thisType === 'Admin') {
          return true
        } else {
          return false
        }
      }

      const isAdmin = usersSelect(el.typeUser)

      if (!isAdmin) timesArray.push(timesArr)
    })

    setBody(timesArray)
  }, [])

  const renderTable = () => {
    return <Table items={data} />
  }

  function createBotModal() {
    setShow(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    const pageData = document.querySelector('.page-data')
    if (pageData !== null || pageData !== undefined) pageData.style.margin = '30px 30px 30px 280px;'

    setShow(false)
  }

  return (
    <div className="bots">
      <div className="page-desc bots_desc">

        <div className="bots_desc_header">
          <div className="bots_desc_header_inner">
            <p className="subtitle">List of Bots</p>
            <button onClick={createBotModal} className="btn">create bot</button>
          </div>
        </div>

        {
          renderTable()
        }

        <CreateBotModal createBotHandler={updateUsers} onClose={closeModal} show={show} />
      </div>
    </div>
  )
}

export default Bots