const { Router } = require('express')
const router = Router()

const User = require('../models/User')

const config = require('config')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { check, validationResult } = require("express-validator")


// /auth/register
router.post('/register',
  [
    check("password", "Минимальная длинна пароля составляет 6 символов").isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Получены неверные данные при регистрации"
        })
      }

      const { email, password, typeUser, login, currency, luck, amountMax, amountMin, intevals } = req.body

      let candidate

      if(email) {
        candidate = await User.findOne({ email })
      } else {
        candidate = await User.findOne({ login })
      }

      if (candidate) {
        return res.status(400).json({ message: "Такой пользователь уже существует" })
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      if(typeUser != '') type = 'User'
      const registerDate = new Date()

      const user = new User({ email, password: hashedPassword, typeUser, registerDate, login, currency, luck, amountMax, amountMin, intevals })

      await user.save()

      const isMatch = await bcrypt.compare(password, user.password)

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: "30d" }
      )

      return res.status(200).json({ message: 'Пользователь создан', token, userId: user.id })
    } catch (e) {
      const error = e
      res.status(501).json({ message: 'Что-то пошло не так, попробуйте снова', error: `Детали: ${error}` })
    }
  })


// /auth/login
router.post('/login',
  [
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему'
        })
      }

      const { login, password } = req.body

      const user = await User.findOne({ login })

      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: "30d" }
      )

      return res.status(200).json({ message: 'Всё ок', token, userId: user.id })
    } catch (e) {
      const error = e
      res.status(501).json({ message: 'Что-то пошло не так, попробуйте снова', error: `Детали: ${error}` })

      console.log(error)
    }
  })


// /auth/createBot
/* router.post('/createBot',
  [
    check("password", "Минимальная длинна пароля составляет 6 символов").isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      let data = req.body
      console.log('data', data)
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Получены неверные данные при регистрации"
        })
      }

      if(data.amountMin < data.amountMin) return res.status(400).json({ message: "Минимальная сумма ставки не может быть больше максимальной" })

      let email = data.email
      let password = data.password
      const candidate = await Bot.findOne({ email })

      if (candidate) {
        return res.status(400).json({ message: "Пользователь с таким login уже существует" })
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      data.password = hashedPassword

      const user = new Bot({ ...data })

      await user.save()

      const isMatch = await bcrypt.compare(password, user.password)

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: "30d" }
      )

      return res.status(200).json({ message: 'Всё ок', token, userId: user.id })
    } catch (e) {
      const error = e
      res.status(501).json({ message: 'Что-то пошло не так, попробуйте снова', error: `Детали: ${error}` })
    }
  }) */

module.exports = router