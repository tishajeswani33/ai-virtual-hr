const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    stage: { type: String, enum: ['Applied', 'Screening', 'Interview', 'Offer', 'Rejected'], default: 'Applied' },
    score: { type: Number, default: 0 },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Candidate', CandidateSchema);
