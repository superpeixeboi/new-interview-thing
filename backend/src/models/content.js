const mongoose = require('mongoose');

const Content = mongoose.model('Content', {
    title: {
      type: String,
      required: true,
      unique: true
    },
    body : {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true
    },
    updatedAt: Date,
    publishedAt: Date
})

module.exports = Content
