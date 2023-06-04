const { searchPlace, game24 } = require("../BusinessFlow/Jenosize.BusinessFlow")
const createError = require('http-errors')

module.exports = {
  searchPlace: async (req, res, next) => {
    try {
      const response = await searchPlace(req, next)
      res.send(response)
    } catch (error) {
      return next(createError(400, error))
    }
  },
  game24: async (req, res, next) => {
    try {
      const response = await game24(req, next)
      res.send(response)
    } catch (error) {
      return next(createError(400, error))
    }
  }
}