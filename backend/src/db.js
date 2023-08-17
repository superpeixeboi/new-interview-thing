const mongoose = require('mongoose')

const options = {
  useNewUrlParser: true,
  autoIndex: false,
  maxPoolSize: 10,
}

exports.connect = app => {
  console.log('Connecting to database.')
  
  mongoose
    .connect('mongodb://mongo:27017/InterviewThing', options)
    .then(() => {
      app.emit('connected')
      console.log('Database connected.')
    })
    .catch(error => {
      console.log('Database connection failed.')
      console.error(error)
    })
}
