const router_library =
  require('express').Router()  
  .get('/', (req, res) => res.render('pages/library'))
  .get('/privacy', (req, res) => res.render('pages/privacy-policy'))
  .get('/services', (req, res) => res.render('pages/terms-of-service'))
  .get('/library', (req, res) => res.render('pages/help-library'))
  .get('/libraryAPI', (req, res) => res.render('pages/help-library-api'))
  .get('/db', async (req, res) => {

  });

module.exports = router_library;