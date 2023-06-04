const { searchPlace } = require("../BusinessFlow/Jenosize.BusinessFlow")
const createError = require('http-errors')

module.exports = {
  searchPlace: async (req, res, next) => {
    try {
      const response = await searchPlace(req, next)
      res.send(response)
    } catch (error) {
      return next(createError(400, error))
    }
  }
}