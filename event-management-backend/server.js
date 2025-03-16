const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();  // ✅ Initialize app before using it

app.use(cors());  // ✅ Move CORS setup here
app.use(express.json());

app.use("/api/users", userRoutes);  // User routes
app.use("/api/events", eventRoutes); // Event routes

app.get("/", (req, res) => {
    res.send("Event Management System API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
