const { default: mongoose } = require("mongoose");

const OrganizerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    organizationName: {
        type: String,
        trim: true
    },
    contactNumber: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        default: 'organizer',
        enum: ['organizer']
    },
    createdEvents: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Event'
        }
    ],
}, {timestamps: true})

module.exports = new mongoose.model('organizer', OrganizerSchema)