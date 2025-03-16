const express = require("express");
const router = express.Router();
const Event = require("../models/eventModel");
const User = require("../models/userModel");

// Get all events
router.get("/", async (req, res) => {
    try {
        const events = await Event.find().populate("organizer", "name email");
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new event
router.post("/create", async (req, res) => {
  const { name, description, date, location, organizerId } = req.body;
  console.log("📢 Received Event Data:", req.body);

  try {
      const organizer = await User.findById(organizerId);
      if (!organizer) {
          return res.status(400).json({ message: "Organizer not found" });
      }

      const newEvent = new Event({
          name,
          description,
          date,
          location,
          organizer: organizerId, // ✅ Save organizer ID
      });

      await newEvent.save();
      res.status(201).json({ message: "Event created successfully!" });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

  
 

// Register a user for an event
router.post("/:eventId/register", async (req, res) => {
    const { userId } = req.body;
    const { eventId } = req.params;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (event.attendees.includes(userId)) {
            return res.status(400).json({ message: "User already registered" });
        }

        event.attendees.push(userId);
        await event.save();
        res.status(200).json({ message: "User registered for event" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get events by location
router.get("/location/:location", async (req, res) => {
  try {
      const { location } = req.params;
      const events = await Event.find({ location: { $regex: new RegExp(location, "i") } }); // Case-insensitive search
      res.json(events);
  } catch (error) {
      res.status(500).json({ message: "Error fetching events" });
  }
});


module.exports = router;
