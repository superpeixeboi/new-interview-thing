const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const db = require('./db')
const router = require('./router')

const app = express()
const PORT = 3000

db.connect(app)

app.use(cors({ methods: ['GET', 'PUT', 'POST']}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(morgan('tiny'))

app.get('/itsalive', (req, res) => {
  console.log('OIEEEEE!!!!')
  res.send('oi!!!')
})

app.use(router)

app.on('connected', () => {
  app.listen(PORT, () => {
    console.log('listening to port', PORT)
  })
})
