// server/controllers/jobController.js
const Job = require('../models/Job');
const Company = require('../models/Company');
const { sendJobPostedEmail } = require('../utils/emailService');

const postJob = async (req, res) => {
  const { title, description, requirements, location } = req.body;
  const company = await Company.findById(req.companyId);

  const job = new Job({ title, description, requirements, location, postedBy: company._id });
  await job.save();

  await sendJobPostedEmail(company, job);
  res.json({ message: 'Job posted successfully' });
};

module.exports = { postJob };
