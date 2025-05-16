// models/Camera.js
const mongoose = require('mongoose');

const cameraSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true }, // URL m3u8
    width: { type: Number, default: 640 },
    height: { type: Number, default: 480 },
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area', required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // có thể là owner riêng
    coOwners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // nếu muốn chia sẻ
}, { timestamps: true });

module.exports = mongoose.model('Camera', cameraSchema);
