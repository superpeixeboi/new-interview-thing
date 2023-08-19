const mongoose = require('mongoose')
const dayjs = require('dayjs')

const Content = mongoose.model('Content', {
    title: {
      type: String,
      required: true,
      unique: true
    },
    body: {
      type: String,
      required: true
    },
    coverImage: String,
    link: String,
    access: String,
    createdAt: {
      type: Date,
      default: Date.now,
      required: true
    },
    updatedAt: Date,
    publishedAt: {
      type: Date,
      validate: {
        validator: v => dayjs(v).isAfter(dayjs().add(5, 'm')),
        message: () => 'Data de publicação deve ser ao menos 5 minutos no futuro.'
      },
    }
})

module.exports = Content
