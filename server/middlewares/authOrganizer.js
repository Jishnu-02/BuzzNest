const jwt = require('jsonwebtoken');

const authOrganizer = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "JWT not found"
      });
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!verifiedToken) {
      return res.status(401).json({
        message: "Organizer not authorized"
      });
    }

    if (verifiedToken.role !== "organizer") {
      return res.status(403).json({
        message: "Access denied: not an organizer"
      });
    }

    req.organizer = verifiedToken._id;

    next();

  } catch (error) {
    console.error(error);
    res.status(error.status || 401).json({
      message: error.message || "Organizer authorization failed"
    });
  }
};

module.exports = authOrganizer;
