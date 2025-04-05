const { default: mongoose } = require("mongoose");
require('dotenv').config()

MONGODB_URI_STRING = process.env.MONGODB_URI_STRING

const connectDB = async() => {
    try{
        await mongoose.connect(MONGODB_URI_STRING)
        console.log('BuzzNest DB is connected')
    } catch(err) {
        console.log(err);
    }
}

module.exports = connectDB