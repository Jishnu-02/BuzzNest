const userDB = require("../models/userModel")
const { createToken } = require("../utilities/generateToken")
const {hashPassword, comparePassword} = require("../utilities/passwordUtilities")

const register = async(req, res) => {
    try {
        const {name, email, mobile, password, confirmPassword} = req.body

        if(!name || !email || !mobile || !password || !confirmPassword) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                message: "Password mismatch"
            })
        }

        const userExist = await userDB.findOne({email})

        if(userExist) {
            return res.status(400).json({
                message: "Email already exists"
            })
        }

        const hashedPassword = await hashPassword(password)

        const newUser = new userDB({
            name,
            email,
            mobile,
            password: hashedPassword,
        })

        const saved = await newUser.save()

        if(saved) {            
            const token = await createToken(saved._id)
            res.cookie('token', token)
            return res.status(201).json({
                message: "User created",
                user: newUser
            })
        }


    } catch(error) {
        console.log(error)
        res.status(error.status || 500).json({
            message:error.message || "Internal server error"
        })
    }
}

const login = async(req, res) => {
    try {
        const {email, password} = req.body

        if(!email || !password) {
            return res.status(400).json({
                message: "Required fields are missing"
            })
        }

        const userExist = await userDB.findOne({email})

        if(!userExist) {
            return res.status(404).json({
                message: "User Not Found"
            })
        }

        const passwordMatch = await comparePassword(password, userExist.password)

        if(!passwordMatch){
            return res.status(400).json({
                message: "password doesn't match"
            })
        }

        const token = await createToken(userExist._id)
        res.cookie('token', token)

        return res.status(200).json({
            message: "user login successfull",
            user: userExist
        })
        

    } catch(error) {
        console.log(error)
        res.status(error.status || 500).json({
            message:error.message || "Internal server error"
        })
    }
}


const logout = async(req, res) => {
    try {
        res.clearCookie("token")
        res.status(200).json({message: "logout successfull"})
    } catch(error) {
        console.log(error)
        res.status(error.status || 500).json({
            message:error.message || "Internal server error"
        })
    }
}

module.exports = {
    register,
    login,
    logout
}