const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    department: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: { type: String, enum: ['Active', 'On Leave', 'Remote'], default: 'Active' },
    joinDate: { type: String },
    salary: { type: Number, default: 0 },
    performance: { type: Number, default: 3.0 },
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);
