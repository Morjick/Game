import React from "react"

const Players = () => {

  let players = [
    { name: 'Lastgame', at: '-', bet: 30000, profit: -30000 },
    { name: 'redrumguerilla', at: '-', bet: 2500, profit: -2500 },
    { name: 'moogle', at: '-', bet: 65, profit: 260 },
    { name: 'Raincup', at: '-', bet: 64, profit: 256 },
    { name: 'dev92', at: '-', bet: 64, profit: 256 },
    { name: 'Amarante', at: '-', bet: 64, profit: 256 },
    { name: 'Dk18', at: '-', bet: 48, profit: 192 },
    { name: 'JAPAN-com', at: '-', bet: 32, profit: 128 },
    { name: 'Suncup', at: '-', bet: 32, profit: 128 },
    { name: 'KTPL', at: '-', bet: 32, profit: 128 },
    { name: 'Visions', at: '-', bet: 32, profit: 128 },
    { name: 'river', at: '-', bet: 16, profit: 64 },
    { name: 'illy', at: '-', bet: 16, profit: 64 },
    { name: 'goguma', at: '-', bet: 16, profit: 64 },
    { name: 'poloman', at: '-', bet: 8, profit: 32 },
    { name: 'DEV1010', at: '-', bet: 1, profit: 4 },
    { name: 'DEV1010', at: '-', bet: '?', profit: '-' },
  ]

  return (
    <div className="DesktopContent">
      <div className="PlayerStatistics">
        <div className="PlayerStatistics_item">
          Players: 17
        </div>
        <div className="PlayerStatistics_item">
          Betting: 1,561 Ethos
        </div>
      </div>
      <div className="Table --players">
        <div className="Table_cell --header">User</div>
        <div className="Table_cell --header">@</div>
        <div className="Table_cell --header">Bet</div>
        <div className="Table_cell --header">Profit</div>

        {players.map(el => (
          <>
            <div className="Table_cell">{el.name}</div>
            <div className="Table_cell">{el.at}</div>
            <div className="Table_cell">{el.bet}</div>
            <div className="Table_cell">{el.profit}</div>
          </>
        ))}
        
        
      </div>
    </div>
  )
}

export default Players