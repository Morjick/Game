import React from "react"
import { toast } from 'react-toastify'


const Login = () => {
  const token = localStorage.getItem('token')

  if (token) document.location.href = '/bots'

  const loginHengler = async () => {
    const email = document.getElementById('emailInput')
    const password = document.getElementById('passwordInput')

    const form = {
      login: email.value,
      password: password.value
    }

    const responce = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })

    const candidate = await responce.json()

    if (candidate.token && candidate.userId) {
      const token = candidate.token
      const userId = candidate.userId

      localStorage.setItem('token', token)
      localStorage.setItem('userId', userId)

      document.location = '/bots'
    }

    console.log('message', candidate.message)

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
  }

  return (
    <div className="login">
      <div className="login_desc">
        <h2 className="login_title">Log In</h2>

        <div className="login_value">

          <div className="login_item">
            <p>Login</p>
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

export default Login