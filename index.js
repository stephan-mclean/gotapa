const express = require('express');
const app = express(); 
const compression = require('compression');
const path = require('path');
const morgan = require('morgan');
const sslRedirect = require('heroku-ssl-redirect');
app.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));
app.use(sslRedirect());
app.use(compression());

/*const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI);
mongoose.connection.on('error', console.error.bind(console, 'DB connection error')); */ 

app.use(express.static(path.join(__dirname, 'client/build')));

const api = require('./server/routes/api');
app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(process.env.PORT || 5000, () => console.log('Server started'));