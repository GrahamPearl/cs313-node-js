const Weeks = require('../models/weeks');

const router_weeks = require('express').Router();
      router_weeks.get('/', (req, res) => res.render('pages/weeks'));      
      

module.exports = router_weeks;