import React, { useState } from 'react'

import CloseImg from '../assets/close.png'

const Cart = (data) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',]

  const cartData = data.props

  const [carts, setCarts] = useState(cartData)


  // const carting = (key) => {
  //   const thisKey = key
  //   const thisData = cartData[thisKey]
  //   console.log('thisData', thisData)
  // }

  const cartHandler = (e) => {
    const btnId = e.target.id

    const cart = document.getElementById(`${btnId}Cart`)
    const btnContainer = document.getElementById(`${btnId}Container`)
    const btn = document.getElementById(btnId)
    const inputContainer = document.getElementById(`${btnId}Inputs`)
    
    let actives = document.querySelectorAll('.activeBtn')

    actives.forEach(el => {
      el.classList.remove('activeBtn')
    })
    cart.classList.add('activeBtn')


    btnContainer.classList.add('flex')
    btn.classList.add('none')
    inputContainer.classList.add('cart_item_inputs--active')
  }

  const cartCancelHandler = (el) => {
    const btnContainer = document.getElementById(`${el}Container`)
    const btn = document.getElementById(el)
    const inputContainer = document.getElementById(`${el}Inputs`)
    
    let actives = document.querySelectorAll('.activeBtn')

    actives.forEach(el => {
      el.classList.remove('activeBtn')
    })

    btnContainer.classList.remove('flex')
    btn.classList.remove('none')
    inputContainer.classList.remove('cart_item_inputs--active')
  }

  const removeTimeHandler = (item, el) => {
    const thisArr = cartData[el]
    const thisIndex = thisArr.indexOf(item)

    thisArr.splice(thisIndex, 1)
    cartData[el] = thisArr
    setCarts({...cartData})
  }

  const saveInterval = (el) => {
    const start = document.getElementById(`${el}Start`)
    const end = document.getElementById(`${el}End`)

    let intervalCandidate = {
      start: start.value,
      end: end.value
    }
    cartData[el].push(intervalCandidate)
    // const newData = intervalCandidate

    setCarts({...cartData})
    data.onSave(cartData)
    cartCancelHandler(el)
  }

  

  return (
    <>
      {
        days.map(el => (
          <div
            id={el + 'Cart'}
            key={el}
            className="bot_modal_cart_item"
          >
            <div className="bot_modal_cart_item_inner">
              <div className="cart_item_title">{el}</div>
              <div className="cart_item_data">
                <div>
                {carts[el].map(item => (
                  <div className='cart_item_data_note note' key={item}>
                    <p>{item.start} - {item.end}</p>
                    <button
                      onClick={() => removeTimeHandler(item, el)} 
                      className="btn--close"
                    >
                      <img src={CloseImg} alt="" />
                    </button>
                  </div>
                ))}
                <div id={el + 'Inputs'} className="cart_item_inputs">
                  <input id={el + 'Start'} type="text" placeholder='start...'/>
                  <input id={el + 'End'} type="text" placeholder='end...'/>
                </div>
                </div>
              </div>
              <button
                id={el}
                className="btn btn--sm bot_cart_btn"
                onClick={cartHandler}
              >add interval</button>
              <div id={el + 'Container'}  className="btn_container_flexer">
                <button onClick={() => cartCancelHandler(el)} className="btn--danger btn--sm border--sm">cancel</button>
                <button onClick={() => saveInterval(el)} className="btn--primery btn--sm border--sm">save</button>
              </div>
            </div>
          </div>
        ))
      }
    </>
  )

}

export default Cart