const organizerRouter = require('express').Router()
const {register, login, logout} = require('../../controllers/organizerController')

organizerRouter.post('/register', register)
organizerRouter.post('/login', login)
organizerRouter.post('/logout', logout)

module.exports = organizerRouter