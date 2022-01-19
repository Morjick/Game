import React, { useState } from "react"

import Cart from './Carts'

import { toast } from 'react-toastify'

import CloseImg from '../assets/close.png'
import Data from '../data/data'

const BotModal = items => {
  const [value, setValue] = useState(50)

  const cartData = {
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: []
  }

  const [data, setData] = useState(cartData)

  if (!items.show) return null

  function stopPropagationFunc(e) {
    e.stopPropagation()
  }

  const rangeHendler = (e) => {
    let luckValue = e.target.value
    setValue(luckValue)
  }  

  const updateData = (value) => {
    setData(value)
  }

  const createBotHandler = async () => {
    const botLogin = document.getElementById('botLogin')
    const botPassword = document.getElementById('botPassword')
    const botCurrency = document.getElementById('botCurrency')
    const botAmountMin = document.getElementById('botAmountMin')
    const botAmountMax = document.getElementById('botAmountMax')

    const botData = {
      login: botLogin.value,
      password: botPassword.value,
      currency: botCurrency.value,
      amountMin: botAmountMin.value,
      amountMax: botAmountMax.value,
      luck: value,
      typeUser: 'User',
      intevals: data
    }

    console.log(botData)

    items.onClose()

    const responce = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(botData)
    })

    const candidate = await responce.json()

    toast(candidate.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark'
    })

    items.createBotHandler()
  }

  return (
    <div onClick={items.onClose} className="modal_shadow message_shadow bot_modal_top">

      <div onClick={stopPropagationFunc} className="bot_modal">
        <div className="bot_modal_inner">

          <div className="bot_modal_title message_modal_title">Create bot</div>

          <div className="bot_modal_value bot_modal--value">

            <div className="login_item bot_modal--inputs">
              <p>Login</p>
              <input
                id="botLogin"
                className="login_item_input "
                type="text"
                placeholder="my answer"
              />
            </div>

            <div className="login_item bot_modal--inputs">
              <p>Password</p>
              <input
                id="botPassword"
                className="login_item_input"
                type="text"
                value={Data.universalBotPassword}
                disabled
              />
            </div>

            <div className="login_item bot_modal--inputs">
              <p>Currency</p>
              <select
                id="botCurrency"
                className="login_item_input bot_modal_select"
                type="text"
                placeholder="my answer"
              >
                <option value="BET">BET</option>
                <option value="ETH">ETH</option>
              </select>
            </div>

            <div className="login_item bot_modal--inputs">
              <p>Bet amount</p>
              <div className="flexer">
                <input
                  id="botAmountMin"
                  className="login_item_input"
                  type="text"
                  placeholder="min value"
                />

                <input
                  id="botAmountMax"
                  className="login_item_input"
                  type="text"
                  placeholder="max value"
                />
              </div>
            </div>

            <div onClick={items.onClose} className="bot_modal_close">
              <img src={CloseImg} className="bot_modal_close_img" alt="" />
            </div>

          </div>

          <div className="bot_modal_luck">
            <div className="bot_modal_luck_flex">
              <p>Bot's luck</p>
              <p>{value} %</p>
            </div>
            <input
              id="botLuck"
              type="range"
              className="bot_modal_range"
              onChange={rangeHendler}
            />
          </div>

          <div className="bot_modal_carts">
            <div className="bot_modal_carts_inner">

              <Cart onSave={updateData} props={data} />

            </div>
          </div>

          <div className="btn-container--center">
            <button onClick={createBotHandler} className="btn--primery btn--primery--bg">Save</button>
          </div>

        </div>
      </div>
    </div>
  )
}



export default BotModal