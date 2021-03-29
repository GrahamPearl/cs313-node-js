const Patrons = require('../models/patrons');

const router_patrons =
  require('express').Router()
  .get('/', (req, res) => res.render('pages/patrons'))
  .get('/search', (req, res) => res.render('pages/patrons'))
  .get('/search_save', (req, res) => {});

module.exports = router_patrons;