const mongoose = require('mongoose');

const placementSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
    },
    worker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Worker',
        required: true,
    },
    status: {
        type: String,
        enum: ['applied', 'shortlisted', 'interviewed', 'hired', 'rejected'],
        default: 'applied',
    },
    appliedAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

placementSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Placement', placementSchema);
