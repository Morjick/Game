import React from "react"
// import axios from 'axios'

// import useHttp from '../hooks/http.hook'

// const { request } = useHttp()

const Register = () => {
  const token = localStorage.getItem('token')

  if(token) document.location.href = '/bots'

  const loginHengler = async () => {
    const email = document.getElementById('emailInput')
    const password = document.getElementById('passwordInput')

    const form = {
      email: email.value,
      password: password.value
    }

    const responce = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })

    console.log('responce', responce)
  }

  return (
    <div className="login">
      <div className="login_desc">
        <h2 className="login_title">Register</h2>

        <div className="login_value">

          <div className="login_item">
            <p>Email</p>
            <input id="emailInput" className="login_item_input" type="text" placeholder="press your email...." />
          </div>

          <div className="login_item">
            <p>Password</p>
            <input id="passwordInput" className="login_item_input" type="text" placeholder="press your password...." />
          </div>

        </div>

        <div className="forgot">
          <a href="#">Forgot your password?</a>
        </div>

        <div className="btn-container--center">
          <button onClick={loginHengler} className="btn btn--center">Login</button>
        </div>

      </div>
    </div>
  )
}

export default Register