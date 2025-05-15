const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    plan: {
        name: {
            type: String,
            enum: ['Free', 'Basic', 'Pro'],
            default: 'Free'
        },
        expiresAt: {
            type: Date,
            default: null
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['unverified', 'active', 'banned'],
        default: 'unverified'
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
