//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const GOOGLE = require('../models/google-books');

const router_google =
  require('express').Router()
  .get('/', (req, res) => res.render('pages/google'))
  //.get('/append', (req, res) => {
  //  insert_google_api(req, res);
  //})
  .get('/found', (req, res) => res.render('pages/google-found'))
  .get('/db', async (req, res) => {

  });

module.exports = router_google;