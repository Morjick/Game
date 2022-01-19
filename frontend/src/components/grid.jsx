import React from "react"

const Grid = () => {
  return (
    <div className="ArticleGrid">
      <div className="Article">
        <div className="Article_header">
          What is EtherCrash?
        </div>
        <div className="Article_text">
          Ethercrash.io is the most established and largest gambling game for Ethereum. Based on Bustabit and provably fair with a low house edge. You can deposit with either Bitcoin or Ethereum, give it a try today!
        </div>
      </div>
      <div className="Article --negative">
        <div className="Article_header --negative">
          Provably Fair
        </div>
        <div className="Article_text --negative">
          EtherCrash's outcome can be proven as fair. There are third party scripts you can use to verify the game hashes and calculate the results.
        </div>
      </div>
      <div className="Article">
        <div className="Article_header">
          How it Works:
        </div>
        <div className="Article_text">
          Every game starts from 0x and counts up, you can watch your wager amount being multiplied in your bet area and choose to cash out at anytime but beware if you wait too long it can crash and you will lose your entire bet.
        </div>
      </div>
      <div className="Article --negative">
        <div className="Article_header --negative">
          Be the Bankroll.
        </div>
        <div className="Article_text --negative">
          Increase your Ethereum holdings by investing into the bankroll of Ethercrash. By being part of the growing bankroll you can monitor your investment and see its growth or decline whenever you choose. By investing you ensure we can also have a higher max bet limit. The bankroll is used for paying out players who want to withdraw their winnings. Invest into Ethercrash today and see your money grow!
        </div>
      </div>
    </div>
  )
}

export default Grid