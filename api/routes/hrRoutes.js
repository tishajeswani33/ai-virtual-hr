const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const Candidate = require('../models/Candidate');

// --- Employees ---

// Get all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        // mapping to match frontend schema
        res.json(employees.map(e => ({ ...e.toObject(), id: e._id.toString() })));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new employee
router.post('/employees', async (req, res) => {
    const employee = new Employee(req.body);
    try {
        const newEmployee = await employee.save();
        res.status(201).json({ ...newEmployee.toObject(), id: newEmployee._id.toString() });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update employee
router.put('/employees/:id', async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
        res.json({ ...updatedEmployee.toObject(), id: updatedEmployee._id.toString() });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete employee
router.delete('/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json({ message: 'Employee deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Candidates ---

// Get all candidates
router.get('/candidates', async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.json(candidates.map(c => ({ ...c.toObject(), id: c._id.toString() })));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new candidate
router.post('/candidates', async (req, res) => {
    const candidate = new Candidate(req.body);
    try {
        const newCandidate = await candidate.save();
        res.status(201).json({ ...newCandidate.toObject(), id: newCandidate._id.toString() });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update candidate (change stage, etc.)
router.put('/candidates/:id', async (req, res) => {
    try {
        const updatedCandidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCandidate) return res.status(404).json({ message: 'Candidate not found' });
        res.json({ ...updatedCandidate.toObject(), id: updatedCandidate._id.toString() });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete candidate
router.delete('/candidates/:id', async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndDelete(req.params.id);
        if (!candidate) return res.status(404).json({ message: 'Candidate not found' });
        res.json({ message: 'Candidate deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
