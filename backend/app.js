const express = require('express')
const config = require('config')
const mongoose = require('mongoose')


const cors = require('cors')
const corsOption = {
  origin: 'http://localhost:3000',
}

const app = express()

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*/")

  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "HEAD, OPTIONS, GET, POST, PUT, DELETE")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")

  next()
})
app.use(express.json({ extended: true }))
app.use(cors(corsOption))

app.use('/admin', express.static('../admin/build/index.html'))

app.use('/api/auth/', require('./routes/auth.routes'))
app.use('/api/find/', require('./routes/find.routes'))
app.use('/api/message/', require('./routes/message.routes'))
app.use('/api/game/', require('./routes/game.routes'))
app.use('/api/chat/', require('./routes/chat.routes'))
app.use('/api/setting/', require('./routes/setting.routes'))

const PORT = config.get('PORT') || 3000

async function start() {
  try {
    mongoose.connect(config.get('MongoURI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('connect to data base')

    const User = require('./models/User')
    const bcrypt = require("bcrypt")

    const hashedPassword = await bcrypt.hash('773322', 12)
    const registerDate = new Date()

    const userData = {
      email: 'admin@mail.ru',
      login: 'Admin',
      typeUser: 'Admin',
      password: hashedPassword,
      registerDate,
      luck: 99
    }

    await User.findOneAndUpdate({ login: userData.login }, { ...userData }, { upsert: true })
    console.log('Admin creared')

  } catch (e) {
    console.log('Server Error: Error to connect to DataBase. Details:', e.message)
    process.exit(1)
  }
}

start()

const http = require('http').Server(app)
const io = require('socket.io')(http)

const msg = require('./models/ChatMessage')

io.on('connection', async (socket) => {
  console.log('connection')
  socket.on('getMessage', async () => {
    const messages = await msg.find()
    socket.emit('getMessages', messages)
  })

  // const messages = await msg.find()
  // await socket.emit('getMessages', messages)

  socket.on('sendMessage', async (msgs) => {
    const message = new msg({ ...msgs })
    await message.save()

    console.log(message)
    const messages = await msg.find()
    socket.emit('getMessages', messages)
  })


})

http.listen(PORT, () => {
  console.log('Server has been started on port ' + PORT)
})