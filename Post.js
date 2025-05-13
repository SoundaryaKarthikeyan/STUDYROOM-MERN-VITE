const express = require("express");
const router = express.Router();
const User = require("./api/models/User");

// Check if username exists
router.get("/check-username/:username", async (req, res) => {
    try {
        const user = await User.findOne({ name: req.params.username });
        res.json({ exists: !!user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Create or update user
router.post("/", async (req, res) => {
    const { uid, email, name, photoURL } = req.body;

    try {
        let user = await User.findOne({ uid });

        if (!user) {
            user = new User({ uid, email, name, photoURL });
            await user.save();
            return res.status(201).json(user);
        } else {
            // Optional: Update existing user data
            user.email = email;
            user.name = name;
            user.photoURL = photoURL;
            await user.save();
            return res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ message: "Error saving user", error });
    }
});

module.exports = router;

