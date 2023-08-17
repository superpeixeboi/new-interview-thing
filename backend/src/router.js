const express = require('express')
const Middleware = require('./middleware')
const { Content } = require('./models/models')

const router = express.Router()

const contentMiddleware = new Middleware(Content)
router.get('/content/:id', contentMiddleware.getById())
router.get('/content', contentMiddleware.find())
router.post('/content', 
  contentMiddleware.newDocument(),
  contentMiddleware.validate(),
  contentMiddleware.create()
)

router.use(Middleware.respond())
router.use(Middleware.handleError())

module.exports = router
