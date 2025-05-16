// routes/camera.js
const express = require('express');
const router = express.Router();
const Camera = require('../models/Camera');

// GET all cameras
router.get('/', async (req, res) => {
    try {
        const cameras = await Camera.find()
            .populate('area', 'name')
            .populate('owner', 'name email');
        res.json(cameras);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create new camera
router.post('/', async (req, res) => {
    try {
        const { name, url, width, height, area, owner, coOwners } = req.body;
        const camera = new Camera({
            name,
            url,
            width,
            height,
            area,
            owner,
            coOwners
        });
        const saved = await camera.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET cameras by area
router.get('/area/:areaId', async (req, res) => {
    try {
        const { areaId } = req.params;
        const cameras = await Camera.find({ area: areaId })
            .populate('owner', 'name email');
        res.json(cameras);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
