const GOOGLE = require('../models/google-books');

const router_google =
  require('express').Router()
  .get('/', (req, res) => res.render('pages/google'))
  .get('/API', (req, res) => {
    console.log(req.query);
    let params = {
      title: req.query.title,
      author: req.query.author
    }

    res.locals.title = req.query.title;
    res.locals.url   = req.originalUrl;
    
    res.locals.author = JSON.stringify(req.query.author);
    res.locals.title = JSON.stringify(req.query.title);
    res.render('pages/google-found', params);

  })
  .get('/db', async (req, res) => {

  });

module.exports = router_google;