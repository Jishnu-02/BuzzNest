const jwt = require('jsonwebtoken')
require('dotenv').config()

const maxAge = 3*24*60*60

const createToken = (id, role= "user") => {
    return jwt.sign({id, role}, process.env.JWT_SECRET_KEY, {
        expiresIn:maxAge
    })
}

module.exports = {createToken}