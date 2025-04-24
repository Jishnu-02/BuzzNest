const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const connectDB = require('./config/db')
const apiRouter = require('./routes/router')
const cookieParser = require('cookie-parser')
const app = express()
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
require('dotenv').config()
app.use(express.json())
app.use(cookieParser());
connectDB()
const port = process.env.PORT
app.use('/api', apiRouter)

app.listen(port, () => {
    console.log(`server is running on ${port}`);
    
})