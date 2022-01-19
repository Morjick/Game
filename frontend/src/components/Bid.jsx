import React, { useState } from "react"

const Bid = () => {
  const token = localStorage.getItem('token')
  const [type, setType] = useState('Manual')
  console.log(type)
  
  setTimeout(() => {
    const activeBtn = document.querySelector('.btn_bit--active')
    setType(activeBtn.textContent)
  }, 2000)

  let isAuntificated

  if (token) isAuntificated = true
  if (!token || token === undefined) isAuntificated = false

  const bitHandler = (e) => {
    const btns = document.querySelectorAll('.btn_bit')
    btns.forEach(el => {
      el.classList.remove('btn_bit--active')
    })

    const thisBtn = e.target
    thisBtn.classList.add('btn_bit--active')

    const activeButton = document.querySelector('.btn_bit--active')
    setType(activeButton.textContent)
  }

  const bitType = () => {
    if (type === 'Manual') return (
      <div className="Bet_lines">
        <div className="BetInput_field">
          <div className="BetInput_label">Bet</div>
          <input className="BetInput_input" />
        </div>
        <div className="Bet_line BetInput mt-10">
          <div className="BetInput_field">
            <div className="BetInput_label">Auto Cash Out</div>
            <input className="BetInput_input" value="4.0" />
          </div>
        </div>
        <div className="Bet_line BetRun">
          <div className="BetRun_statistics BetRunStatistics">
            <div className="BetRunStatistics_name">Target Profit:</div>
            <div className="BetRunStatistics_value">0.0002 BTC</div>
            <div className="BetRunStatistics_name">Win Chance:</div>
            <div className="BetRunStatistics_value">49.5%</div>
          </div>
          <div className="BetRun_buttonSpace">
            <button className="BetRun_button">
              BET
            </button>
          </div>
        </div>
      </div>
    )
    if (type === 'Auto') return (
      <h1>Auto</h1>
    )
  }

  if (isAuntificated) {
    return (
      <div className="bet_container">
        <div className="Bet">
          <div className="Bet_line BetInput btn_container">
            <div className="BetInput_buttons ">
              <button onClick={bitHandler} className="bet_btn--active btn_bit btn_bit--active">Manual</button>
              <button onClick={bitHandler} className="btn_bit">Auto</button>
            </div>
          </div>

          {bitType()}

        </div>
      </div>
    )
  }

  if (!isAuntificated) {
    return (
      <div className="Auth">
        <div className="Auth_button">
          <button className="Button">Login to play</button>
        </div>
        <div className="Auth_link">
          <a href="/registrer" className="Link">or register</a>
        </div>
      </div>
    )
  }
}

export default Bid