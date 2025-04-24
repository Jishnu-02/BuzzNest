const adminDB = require("../models/adminModel")
const organizerDB = require("../models/organizerModel");
const userDB = require("../models/userModel")
const {
    comparePassword,
} = require("../utilities/passwordUtilities");
const { createToken } = require("../utilities/generateToken");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Check adminDB
        let user = await adminDB.findOne({ email });
        if (user) {
            const match = await comparePassword(password, user.password);
            if (!match) return res.status(400).json({ message: "Invalid credentials" });

            const token = await createToken(user._id, "admin");
            res.cookie("token", token);
            return res.status(200).json({ message: "Admin login successful", user, role: "admin", token });
        }

        // Check Organizer
        user = await organizerDB.findOne({ email });
        if (user) {
            const match = await comparePassword(password, user.password);
            if (!match) return res.status(400).json({ message: "Invalid credentials" });

            const token = await createToken(user._id, "organizer");
            res.cookie("token", token);
            return res.status(200).json({ message: "Organizer login successful", user, role: "organizer", token });
        }

        // Check userDB
        user = await userDB.findOne({ email });
        if (user) {
            const match = await comparePassword(password, user.password);
            if (!match) return res.status(400).json({ message: "Invalid credentials" });

            const token = await createToken(user._id, "user");
            res.cookie("token", token);
            return res.status(200).json({ message: "User login successful", user, role: "user", token });
        }

        return res.status(404).json({ message: "Not found" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message || "Internal server error",
        });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        res.status(200).json({ message: "logout successfull" })
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({
            message: error.message || "Internal server error"
        })
    }
}


module.exports = { login, logout }