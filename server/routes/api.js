const express = require('express'); 
const search = require('./search');
const stops = require('./stops');

const router = express.Router();
router.get('/', (req, res) => res.send('API'));
router.use('/search', search);
router.use('/stops', stops);

module.exports = router; 