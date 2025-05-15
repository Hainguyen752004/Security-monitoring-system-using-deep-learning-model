const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Register
router.post('/register', async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            name
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Tìm user theo email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Thông tin đăng nhập không chính xác.' });

        // So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Thông tin đăng nhập không chính xác.' });

        // Tạo JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Trả về token + thông tin user
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                status: user.status
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;