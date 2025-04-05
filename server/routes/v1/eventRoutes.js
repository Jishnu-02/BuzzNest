const upload = require('../../middlewares/multer')
const authOrganizer = require('../../middlewares/authOrganizer')
const {createEvent, listEvents, eventDetails, updateEvent} = require('../../controllers/eventController')

const eventRouter = require('express').Router()

eventRouter.post("/create", authOrganizer, upload.single("image"), createEvent)
eventRouter.get('/list-events', listEvents)
eventRouter.get('/:eventId', eventDetails)
eventRouter.put('/update/:eventId', upload.single('image'), updateEvent)

module.exports = eventRouter