const jwt = require('jsonwebtoken')

const authAdmin = (req, res, next) => {
    try {
        const {token} = req.cookies
        
        if(!token){
            return res.status(401).json({
                message: "JWT not found"
            })
        }

        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if(!verifiedToken){
            return res.status(401).json({
                message: "admin not authorized"
            })
        }
        
        if(verifiedToken.role !== "admin"){
            return res.status(401).json({
                message: "access denied"
            })
        }

        req.admin = verifiedToken._id

        next()

    } catch(error) {
        console.log(error)
        res.status(error.status || 401).json({
            message:error.message || "Admin authorization failed"
        })
    }
}


module.exports = authAdmin