// server/routes/job.js
const express = require('express');
const { postJob } = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Job posting route (requires authentication)
router.post('/', authMiddleware, postJob);

module.exports = router;
