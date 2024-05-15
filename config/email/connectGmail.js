const nodemailer = require("nodemailer");

const host = process.env.EMAIL_HOST;
const port = process.env.EMAIL_PORT;
const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  host: host,
  port: port,
  secure: false,
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports = { transporter };
