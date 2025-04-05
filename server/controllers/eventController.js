const eventDB = require('../models/eventsModel');
const uploadToCloudinary = require('../utilities/imageUpload');

const createEvent = async (req, res) => {
  try {
    const { title, description, location, date, time, category, capacity } = req.body;

    if (!title || !description || !location || !date || !time) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Event image is required' });
    }

    const cloudinaryResp = await uploadToCloudinary(req.file.path);

    const newEvent = new eventDB({
      title,
      description,
      location,
      date,
      time,
      category,
      capacity,
      image: cloudinaryResp,
      organizer: req.organizer
    });

    const savedEvent = await newEvent.save();

    return res.status(201).json({ message: 'Event created successfully', event: savedEvent });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      message: error.message || 'Internal Server Error'
    });
  }
};

const listEvents = async (req, res) => {
  try {
    console.log('hi');
    
    const events = await eventDB.find();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || 'Failed to fetch events' });
  }
};

const eventDetails = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await eventDB.findById(eventId).populate('organizer', 'name email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || 'Error retrieving event' });
  }
};

const updateEvent = async (req, res) => {
    try {
      const { eventId } = req.params;
      const { title, description, location, date, time, category, capacity } = req.body;
  
      const existingEvent = await eventDB.findById(eventId);
      if (!existingEvent) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      // Check if the organizer trying to update the event is the creator
      if (existingEvent.organizer.toString() !== req.organizer) {
        return res.status(403).json({ message: 'Access denied: Not your event' });
      }
  
      let imageUrl = existingEvent.image;
  
      if (req.file) {
        const cloudinaryResp = await uploadToCloudinary(req.file.path);
        imageUrl = cloudinaryResp;
      }
  
      const updatedEvent = await eventDB.findByIdAndUpdate(
        eventId,
        { title, description, location, date, time, category, capacity, image: imageUrl },
        { new: true }
      );
  
      res.status(200).json({ message: 'Event updated successfully', updatedEvent });
  
    } catch (error) {
      console.error(error);
      res.status(error.status || 500).json({ message: error.message || 'Error updating event' });
    }
};
  

module.exports = {
  createEvent,
  listEvents,
  eventDetails,
  updateEvent
};
