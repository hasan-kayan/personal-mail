const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(bodyParser.json());

// Replace with your actual email credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'REPLACE WITH YOUR MAIL',
    pass: 'REPLACE WITH YOUR PASSWORD',
  },
});

// Function to read the signature HTML file
const getSignature = () => {
  const signaturePath = path.join(__dirname, '..', 'html', 'sign.html');
  return fs.readFileSync(signaturePath, 'utf-8');
};

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Assuming that 'name' is a combination of Name and Surname separated by a space
  const [firstName, lastName] = name.split(' ');

  // Acknowledgment email to the user
  const acknowledgmentMailOptions = {
    from: transporter.user,
    to: email,
    subject: 'Thank You for Connecting',
    html: `
      <p>Dear ${firstName} ${lastName},</p>
      <p>Thank you for reaching out. I will respond to your message as soon as possible.</p>
      <p>Best regards,<br>Hasan KAYAN</p>
      ${getSignature()} <!-- Add email signature -->
    `,
  };

  // Notification email to your email address
  const notificationMailOptions = {
    from: 'your_hotmail@hotmail.com',
    to: 'hasankayan2000@hotmail.com',
    subject: 'New Contact Form Submission',
    html: `
      <p>Name: ${firstName} ${lastName}</p>
      <p>Email: ${email}</p>
      <p>Message: ${message}</p>
      <p>Best regards,<br>Your Name</p>
     
    `,
  };

  // Send acknowledgment email to the user
  transporter.sendMail(acknowledgmentMailOptions, (ackError) => {
    if (ackError) {
      console.error('Error sending acknowledgment email:', ackError);
      res.status(500).send('Internal Server Error - Acknowledgment Email');
    } else {
      // Send notification email to your address after acknowledgment email is sent
      transporter.sendMail(notificationMailOptions, (notifyError) => {
        if (notifyError) {
          console.error('Error sending notification email:', notifyError);
          res.status(500).send('Internal Server Error - Notification Email');
        } else {
          console.log('Emails sent successfully');
          res.status(200).send('Emails sent successfully');
        }
      });
    }
  });
});

module.exports = app;
