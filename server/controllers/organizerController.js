const Organizer = require("../models/organizerModel");
const { createToken } = require("../utilities/generateToken");
const {
  hashPassword,
  comparePassword,
} = require("../utilities/passwordUtilities");
const { isEmailTaken } = require("../utilities/isEmailTaken")

const register = async (req, res) => {
  try {
    const { name, email, password, organizationName, contactNumber } = req.body;

    // const existing = await Organizer.findOne({ email });
    const existing = await isEmailTaken( email );
    console.log(existing);
    
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await hashPassword(password);

    const newOrganizer = await Organizer.create({
      name,
      email,
      password: hashedPassword,
      organizationName,
      contactNumber
    });

    return res.status(201).json({
      message: "Organizer registered successfully",
      organizer: newOrganizer,
    });

  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({
      message: error.message || "Internal server error",
    });
  }
};

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const organizer = await Organizer.findOne({ email });
//     if (!organizer)
//       return res.status(400).json({ message: "Invalid credentials" });

//     const isMatch = await comparePassword(password, organizer.password)
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid credentials" });

//     const token = await createToken(organizer._id, "organizer")
//     res.cookie('token', token)

//     return res.status(200).json({
//       message: "Organizer Login successful",
//       organizer,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const logout = async(req, res) => {
//     try {
//         res.clearCookie("token")
//         res.status(200).json({message: "logout successfull"})
//     } catch(error) {
//         console.log(error)
//         res.status(error.status || 500).json({
//             message:error.message || "Internal server error"
//         })
//     }
// }

module.exports = {
  register,
  // login,
  // logout
};
