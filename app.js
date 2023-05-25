const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
// const {errorHandler} = require('./middlewares/errorMiddleware');
const register = require('./routes/useroutes')
const login = require('./routes/useroutes')
const getMe = require('./routes/useroutes')
const ConnectDB = require('./config/db');
const todo = require('./routes/todotroutes');
const cors = require('cors')

ConnectDB();
app.use(express.json())
app.use(express.urlencoded({ extended: false })) 
app.use(cors());

app.options('*', cors());
app.use('/api/todos', todo)


app.use('/api/users/register', register)
app.use('/api/users', login)
app.use('/api/me', getMe)
app.get('/', (req, res) => res.send('Welcome to the app'));
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));


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