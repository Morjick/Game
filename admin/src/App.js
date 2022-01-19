import React, { Fragment } from 'react'

import './style/style.css'
import 'react-toastify/dist/ReactToastify.css'
import { useRoutes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Sidebar from './components/Sidebar'

function App() {
  const token = localStorage.getItem('token')
  let isAuntificated = !!token

  const routes = useRoutes(isAuntificated)

  document.title = 'Admin Panel'

  const useLayout = () => {
    if (token) {
      return (
        <>
          <Sidebar />

          <div className="page-data">
            {routes}
          </div>

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </>
      )
    } else {
      return (
        <>
          { routes }

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </>
      )
    }

  }

  return (
    <Router>
      <div className="App">
        <Fragment>

          <div className="page">
            {
              useLayout()
            }
          </div>

        </Fragment>

      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  )
}

export default App
