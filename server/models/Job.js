const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    requiredSkills: [String],
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true,
        },
        address: String,
        district: String,
        state: String,
    },
    salary: {
        amount: Number,
        period: {
            type: String,
            enum: ['daily', 'monthly', 'project'],
            default: 'daily'
        }
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Index for geospatial queries
jobSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Job', jobSchema);
