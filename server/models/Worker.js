const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    experience: [
        {
            title: String,
            company: String,
            from: Date,
            to: Date,
            description: String,
        },
    ],
    isAvailable: {
        type: Boolean,
        default: true,
    },
    dailyRate: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Worker', workerSchema);
