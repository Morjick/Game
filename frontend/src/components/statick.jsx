import React from "react"

const Statick = () => {
  return (
    <div className="Statistics">
      <div className="Statistics_item StatisticsItem --home">
        <div className="StatisticsItem_name">Median</div>
        <div className="StatisticsItem_value">1.97x</div>
      </div>
      <div className="Statistics_item StatisticsItem --bankroll">
        <div className="StatisticsItem_name">Bankroll</div>
        <div className="StatisticsItem_value">Ξ 336</div>
      </div>
      <div className="Statistics_item StatisticsItem --maxProfit">
        <div className="StatisticsItem_name">Max profit</div>
        <div className="StatisticsItem_value">Ξ 3.36</div>
      </div>
      <div className="Statistics_item StatisticsItem --maxBet">
        <div className="StatisticsItem_name">Max Bet</div>
        <div className="StatisticsItem_value">Ξ 1</div>
      </div>
    </div>
  )
}

export default Statick