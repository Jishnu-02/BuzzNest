const adminDB = require("../models/adminModel")
const { createToken } = require("../utilities/generateToken")
const { hashPassword, comparePassword } = require("../utilities/passwordUtilities")


const register = async(req, res) => {
    try {
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({
                message: "Required fields are missing"
            })
        }

        const alreadyExists = await adminDB.findOne({email})

        if(alreadyExists) {
            return res.status(400).json({
                message: "Admin already exists"
            })
        }

        const hashedPassword = await hashPassword(password)
        const newAdmin = new adminDB({
            email,
            password: hashedPassword
        })

        const saved = await newAdmin.save() 

        if(saved) {
            return res.status(201).json({
                message: "Admin created successfully",
                admin: newAdmin
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

        const adminExist = await adminDB.findOne({email})

        if(!adminExist) {
            return res.status(404).json({
                message: "Admin Not Found"
            })
        }

        const passwordMatch = await comparePassword(password, adminExist.password)

        if(!passwordMatch){
            return res.status(400).json({
                message: "password doesn't match"
            })
        }

        const token = await createToken(adminExist._id, "admin")
        res.cookie('token', token)

        return res.status(200).json({
            message: "Admin login successfull",
            user: adminExist
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


module.exports = {register, login, logout}