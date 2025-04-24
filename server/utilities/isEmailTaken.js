const adminDB = require("../models/adminModel")
const organizerDB = require("../models/organizerModel");
const userDB = require("../models/userModel")

const isEmailTaken = async (email) => {

    console.log(email);
    
    const inAdmin = await adminDB.findOne({ email });
    if (inAdmin) return true;

    const inOrganizer = await organizerDB.findOne({ email });
    if (inOrganizer) return true;

    const inUser = await userDB.findOne({ email });
    if (inUser) return true;

    return false;
};

module.exports = { isEmailTaken }