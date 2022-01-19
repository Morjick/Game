const { Router } = require('express')
const router = Router()

const User = require('../models/User')
const Message = require('../models/message')

// /message/create
router.post('/create', async (req, res) => {
  try {
    const { text, day } = req.body
    const bots = await User.find({typeUser: 'Bot'})
    const thisDate = new Date()

    let randomBot = bots[Math.floor(Math.random() * bots.length)];

    const botsMessage = {
      date: thisDate,
      sender: null,
      text,
      status: false,
      day
    }

    const message = new Message({ ...botsMessage })

    message.save()

    return res.status(200).json({
      message: 'Сообщение создано',
      botsMessage
    })
  } catch (e) {
    const error = e
    res.status(501).json({
      message: 'Что-то пошло не так, попробуйте снова',
      error: `Детали: ${error}`
    })
  }
})

module.exports = router