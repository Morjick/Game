import React from "react"

import ArrowDown from '../assets/arrow-down.png'
import Add from '../assets/sidebar/add.png'
import Message from '../assets/sidebar/message.png'
import Users from '../assets/sidebar/users.png'
import Settings from '../assets/sidebar/settings.png'
import Logout from '../assets/sidebar/logout.png'

import { Link } from "react-router-dom"

const Sidebar = () => {

  const activeHendler = (e) => {
    e.stopPropagation()

    let actives = document.querySelectorAll('.active--sidebar')

    actives.forEach(el => {
      el.classList.remove('active--sidebar')
    })
    e.target.classList.add('active--sidebar')
  }

  const sidebarDropMenu = (e) => {
    e.stopPropagation()

    const dropArrow = document.querySelector('.drop-arrow')
    const sidebarDrop = document.querySelector('.sidebar_header_drop')
    dropArrow.classList.toggle('drop-arrow--active')
    sidebarDrop.classList.toggle('sidebar_header_drop--active')
  }

  const logoutHendler = () => {
    // const token = localStorage.getItem('token')
    // const userId = localStorage.getItem('userId')

    localStorage.removeItem('token')
    localStorage.removeItem('userId')

    document.location = '/'
  }

  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar_inner">

        <div className="sidebar_header">

          <div onClick={sidebarDropMenu} className="sidebar_header_inner">
            <span>AA</span>
            <p>Admin</p>
            <div className="drop-arrow">
              <img src={ArrowDown} alt="" className="drop_arrow_down" />
            </div>

          </div>

          <div className="sidebar_header_drop">
              <div className="sidebar_header_drop_inner">
                <button
                  to='/'
                  onClick={logoutHendler}
                  className="sidebar_nav_item"
                >
                  <img src={Logout} alt="" />
                  <p>Logout</p>
                </button>
              </div>
            </div>

        </div>

        <div className="sidebar_nav">
          <nav className="sidebar_nav_inner">

            <Link
              to='/bots'
              onClick={activeHendler}
              id="botItem"
              className="sidebar_nav_item"
            >
              <img src={Add} alt="" />
              <p>Bots</p>
            </Link>

            <Link
              to='/messages'
              onClick={activeHendler}
              id="messageItem"
              className="sidebar_nav_item"
            >
              <img src={Message} alt="" />
              <p>Messages</p>
            </Link>

            <Link
              to='/users'
              onClick={activeHendler}
              id="userItem"
              className="sidebar_nav_item"
            >
              <img src={Users} alt="" />
              <p>Users</p>
            </Link>

          </nav>
        </div>

        <div className="sidebar_footer">
          <div className="sidebar_footer_inner">

            <Link
              to='/settings'
              onClick={activeHendler}
              id="settingsItem"
              className="sidebar_nav_item"
            >
              <img src={Settings} alt="" />
              <p>Main Settings</p>
            </Link>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Sidebar