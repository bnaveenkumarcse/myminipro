// server/utils/emailService.js
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { EMAIL_USER, EMAIL_PASS, JWT_SECRET } = process.env;

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: { user: EMAIL_USER, pass: EMAIL_PASS }
});

const sendVerificationEmail = async (company) => {
  const token = jwt.sign({ id: company._id }, JWT_SECRET, { expiresIn: '1d' });
  const verificationUrl = `http://localhost:3000/verify/${token}`;

  await transporter.sendMail({
    from: EMAIL_USER,
    to: company.email,
    subject: 'Account Verification',
    html: `<p>Click <a href="${verificationUrl}">here</a> to verify your account.</p>`
  });
};

const sendJobPostedEmail = async (company, job) => {
  await transporter.sendMail({
    from: EMAIL_USER,
    to: company.email,
    subject: 'Job Posted Successfully',
    html: `<p>Your job "${job.title}" has been posted successfully.</p>`
  });
};

module.exports = { sendVerificationEmail, sendJobPostedEmail };
