const adminRouter = require('express').Router()
const {register, login, logout} = require('../../controllers/adminController')

adminRouter.post('/register', register)
adminRouter.post('/login', login)
adminRouter.post('/logout', logout)

module.exports = adminRouter