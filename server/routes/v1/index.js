const adminRouter = require('./adminRoutes')
const userRouter = require('./userRoutes')
const organizerRouter = require('./organizationRoutes')
const eventsRouter = require('./eventRoutes')
const authRouter = require('./authRoutes')

const v1Router = require('express').Router()

v1Router.use("/user", userRouter)
v1Router.use("/admin", adminRouter)
v1Router.use("/organizer", organizerRouter)
v1Router.use("/events", eventsRouter)
v1Router.use("/auth", authRouter)


module.exports = v1Router