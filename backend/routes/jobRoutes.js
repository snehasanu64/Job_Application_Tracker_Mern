const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const mongoose = require("mongoose");

// Middleware to check if DB is connected before any database operation
const checkDB = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: "Database is connecting, please try again in a few seconds." });
  }
  next();
};

router.use(checkDB);

// GET /api/jobs - Fetch all jobs, newest first
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs", error: err.message });
  }
});

// POST /api/jobs - Add a new job application
router.post("/", async (req, res) => {
  try {
    const { company, role, dateApplied, status } = req.body;

    if (!company || !role || !dateApplied) {
      return res.status(400).json({ message: "company, role, and dateApplied are required" });
    }

    const newJob = new Job({ company, role, dateApplied, status });
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(500).json({ message: "Failed to create job", error: err.message });
  }
});

// PUT /api/jobs/:id - Update a job's status (or other fields)
router.put("/:id", async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ message: "Failed to update job", error: err.message });
  }
});

// DELETE /api/jobs/:id - Delete a job application
router.delete("/:id", async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job deleted successfully", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete job", error: err.message });
  }
});

module.exports = router;
