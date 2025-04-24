const adminRouter = require('express').Router()
const {register} = require('../../controllers/adminController')
const { login, logout } = require('../../controllers/authController')

adminRouter.post('/register', register)
adminRouter.post('/login', login)
adminRouter.post('/logout', logout)

module.exports = adminRouter