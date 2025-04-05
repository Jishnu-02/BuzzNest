const { default: mongoose } = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
      location: {
        type: String,
        required: true,
        trim: true,
      },
      date: {
        type: Date,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
      organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organizer',
        required: true,
      },
      category: {
        type: String,
        enum: ['Music', 'Tech', 'Sports', 'Art', 'Education', 'Other'],
        default: 'Other',
      },
      image: {
        type: String,
        required: true
      },
      capacity: {
        type: Number,
        default: 100,
      },
      attendees: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        }
      ],
}, { timestamps: true });

module.exports = new mongoose.model("events", eventSchema)