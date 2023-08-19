class Middleware {
  constructor(Model) {
    this.Model = Model
  }
  
  getById() {
    const Model = this.Model
    return async (req, res, next) => {
      res.result = await Model.findById(req.params.id)
      next()
    }
  }

  find() {
    const Model = this.Model
    return async (req, res, next) => {
      res.result = await Model.find(req.query)
      next()
    }
  }
  
  newDocument() {
    const Model = this.Model
    return (req, res, next) => {
      res.document = new Model(req.body)
      next()
    }
  }

  validate() {
    return async (req, res, next) => {
      try{
        await res.document.validate()
        next()
      } catch (error) {
        console.log('validation error.')
        next(error)
      }
    }
  }

  create() {
    return async (req, res, next) => {
      res.result = await res.document.save()
      next()
    }
  }

  update() {
    const Model = this.Model
    return async (req, res, next) => {
      await Model.findByIdAndUpdate(
        req.params.id,
        res.document.toObject()
      )
      next()
    }
  }

  static respond() {
    return (req, res, next) => res.send(res.result)
  }

  static handleError() {
    return (error, req, res, next) => res.status(403).send(error)
  }
}

module.exports = Middleware
