// routes/area.js
const express = require('express');
const router = express.Router();
const Area = require('../models/Area');

// GET all areas
router.get('/', async (req, res) => {
    try {
        const areas = await Area.find().populate('owner', 'name email');
        res.json(areas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create new area
router.post('/', async (req, res) => {
    try {
        const { name, owner } = req.body;
        const newArea = new Area({ name, owner });
        const saved = await newArea.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
