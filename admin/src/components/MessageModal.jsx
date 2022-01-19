import React from "react"

import CloseImg from '../assets/close.png'

const MessageModal = items => {

  if (!items.show) return null

  const spanDay = document.querySelector('.activeBtn')
  let thisDay
  if (spanDay !== null) thisDay = spanDay.textContent || spanDay.innerText

  function stopPropagationFunc(e) {
    e.stopPropagation()
  }

  const createMessage = async () => {
    const text = document.getElementById('textMessage')
    const spanDay = document.querySelector('.activeBtn')
    let thisDay
    if (spanDay !== null) thisDay = spanDay.textContent || spanDay.innerText

    const createData = {
      text: text.value,
      day: thisDay
    }

    items.onClose()

    const responce = await fetch('/api/message/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createData)
    })

    const candidate = await responce.json()

    items.createMessageHendler()
  }

  return (
    <div onClick={items.onClose} className="message_shadow">
      <div onClick={stopPropagationFunc} className="message_modal">
        <div className="message_modal_inner">

          <div className="message_modal_title">Create text to message</div>

          <div className="message_modal_textaria">
            <textarea id="textMessage" placeholder="Press text to message"></textarea>
          </div>

          <div className="btn-container--right">
            <button onClick={createMessage} className="btn--primery">Add message</button>
          </div>

          <div onClick={items.onClose} className="bot_modal_close message_modal_close">
            <img src={CloseImg} className="bot_modal_close_img" alt="" />
          </div>

        </div>
      </div>
    </div>
  )
}

export default MessageModal