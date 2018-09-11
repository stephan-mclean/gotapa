const express = require('express');
const app = express(); 
const morgan = require('morgan');
app.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));

const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI);
mongoose.connection.on('error', console.error.bind(console, 'DB connection error'));

const api = require('./server/routes/api');
app.use('/api', api);

app.listen(process.env.PORT || 5000, () => console.log('Server started'));