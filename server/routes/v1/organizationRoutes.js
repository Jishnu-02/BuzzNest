const organizerRouter = require('express').Router()
const {register} = require('../../controllers/organizerController')
const {login, logout} = require('../../controllers/authController')

organizerRouter.post('/register', register)
organizerRouter.post('/login', login)
organizerRouter.post('/logout', logout)

module.exports = organizerRouter