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