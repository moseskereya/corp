const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lazaromoses77@gmail.com',
    pass: 'me@aspcodes77',
  },
});

app.post('/submit-form', (req, res) => {
  const { name, email } = req.body;

  const mailOptions = {
    from: 'lazaromoses77@gmail.com',
    to: email,
    subject: 'Form Submission',
    text: `Thank you, ${name}, for submitting the form, We will get back to you soon`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.send('Form submitted successfully');
    }
  });
});