// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const Company = require('../models/Company');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const company = await Company.findById(decoded.id);
    if (!company) return res.status(401).json({ error: 'Not authorized' });

    req.companyId = company._id; // Save company ID for use in other controllers
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
