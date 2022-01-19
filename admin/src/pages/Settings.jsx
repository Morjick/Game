import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';

function setToastMessage(text) {
  toast(text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark'
  });
}

const Settings = () => {
  const [arrNums, setNumbers] = useState([])
  const [universalPassword, setUniversalPassword] = useState('Пароль не задан')


  let actives = document.querySelectorAll('.active--sidebar')

  actives.forEach(el => {
    el.classList.remove('active--sidebar')
  })

  const botItemActive = document.getElementById('settingsItem')
  if (botItemActive != null) botItemActive.classList.add('active--sidebar')

  // Get universal password
  useEffect(async () => {
    const request = await fetch('/api/find/password', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const response = await request.json()
    if (response.ok) {
      setUniversalPassword(response.data);
    } else {
      console.log(`Ошибка при получении универсального пароля: ${response.message}`);
    }
    
  })

  // Get all numbers
  useEffect(async () => {
    const request = await fetch('/api/find/numbers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const response = await request.json();
    if (response.ok) {
      console.log(response.numbers);
      setNumbers([...response.numbers])
    } else {
      console.log(response.message);
    }
  }, []);
  async function addNumber() {
    const element = document.querySelector('#settingNumber');
    const number = element.value;

    if (!number) {
      setToastMessage('Поле "число" не заполнено');
      return;
    }

    const params = {
      name: 'Numbers',
      value: Number(number)
    }

    const request = await fetch('/api/setting/numbers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    element.value = '';

    const response = await request.json();
    if (response.ok) {
      setNumbers(arrNums => [...arrNums, number]);
    } else {
      setToastMessage(response.message);
    }
  }

  const updatePassword = async () => {
    const settingPassword = document.querySelector('#settingPassword')

    const params = {
      name: 'universalPassword',
      data: settingPassword.value
    }
    
    const request = await fetch('/api/setting/password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    const response = await request.json();
    if (response.ok) {
      setUniversalPassword(settingPassword.value);
    } else {
      setToastMessage(response.message);
    }

    settingPassword.value = '';
  }

  return (
    <div className="page-desc">
      <div className="page_inner">

        <div className="numbers">
          <div className="numbers_inner">
            <p>List of numbers to break the graph</p>
            <div className="numbers_add">
              <div className="login_item settings_input">
                <input
                  id="settingNumber"
                  className="login_item_input "
                  type="number"
                  placeholder="number"
                />
              </div>
              <button
                onClick={addNumber}
                className="btn btn--md btn--primery p-5 settings_btn_item"
              >Add</button>
            </div>
            <div className="number_list">
              {Array.from(arrNums).map((num, index) => (
                <div key={index} className="number_list_item">{num}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="bots">
          <div className="bots_inner settings_inner_bots">
            <p>Universal password for bots</p>
            <p>Current password: {universalPassword}</p>
            <div className="login_item">
              <input 
                id="settingPassword"
                className="login_item_input" 
                type="text" 
                placeholder="New password..." />
            </div>
            <button onClick={updatePassword} className="btn btn--md btn--primery p-5">Save</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Settings