import React from "react"

const Header = () => {
  return (
    <header className="Header">
      <div className="Header_logo">
        BE
      </div>
      <div className="Header_score">
        Ethos: 0.00
        Bit: 0.00
      </div>
      <div className="Header_auth AuthLinks">
        <>
          <div className="AuthLinks_link">Login</div>
          <div className="AuthLinks_link">Register</div>
        </>
      </div>
    </header>
  )
}

export default Header