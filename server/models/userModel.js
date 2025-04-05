const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user']
    },
    registeredEvents: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Event'
        }
    ],
}, {timestamps: true})

module.exports = new mongoose.model('users', userSchema)