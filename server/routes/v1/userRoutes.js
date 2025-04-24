const userRouter = require('express').Router()
const { register } = require('../../controllers/userController')
const {login, logout} = require('../../controllers/authController')

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.post('/logout', logout)

module.exports = userRouter