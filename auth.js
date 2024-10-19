// server/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Company = require('../models/Company');
const { sendVerificationEmail } = require('../utils/emailService');

const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const company = new Company({ name, email, password: hashedPassword });

  await company.save();
  await sendVerificationEmail(company);

  res.json({ message: 'Registration successful! Check your email to verify your account.' });
});

// Email Verification Route
router.get('/verify/:token', async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const company = await Company.findById(decoded.id);
    if (!company) return res.status(400).json({ error: 'Invalid token' });

    company.isVerified = true;
    await company.save();
    res.json({ message: 'Account successfully verified' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
});

module.exports = router;
