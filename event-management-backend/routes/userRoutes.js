const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const router = express.Router();

// ✅ User Registration Route
router.post("/register", async (req, res) => {
    try {
        console.log("📢 Register API hit"); // Debugging log
        console.log("Request Body:", req.body);

        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already registered!" });
        }

        // ✅ Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        console.log("✅ User registered successfully!");
        res.status(201).json({ message: "Registration successful!" });
    } catch (error) {
        console.error("❌ Registration error:", error);
        res.status(500).json({ message: "Error registering user" });
    }
});

// ✅ User Login Route
router.post("/login", async (req, res) => {
    try {
        console.log("📢 Login API hit");
        console.log("Request Body:", req.body);

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found!" });
        }

        // ✅ Compare password using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        res.status(200).json({ message: "Login successful!", userId: user._id, role: user.role });
    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({ message: "Error logging in" });
    }
});

// ✅ Get All Users (Admin Feature)
router.get("/", async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Exclude passwords
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
});




// Get User Details
router.get("/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user data" });
    }
});

module.exports = router;