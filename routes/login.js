const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Ensure the path is correct
const JWT_SECRET = 'krushnawaghumbare'; // Replace with your JWT secret key

router.post('/', async (req, res) => {
    const { phone, password } = req.body;  // Changed phone to phone

    console.log(req.body);

    try {

        const user = await User.findOne({ phone , password });

    //    console.log(user);

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET);

        // console.log(token);

        res.status(200).json({ token ,user });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
