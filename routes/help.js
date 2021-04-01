const router_library =
  require('express').Router()  
  .get('/', (req, res) => res.render('pages/library'))
  .get('/privacy', require('pages/privacy-policy'))
  .get('/services', require('pages/terms-of-service'))
  .get('/library', require('pages/help-library'))
  .get('/libraryAPI', require('pages/help-library-api'))
  .get('/db', async (req, res) => {

  });

module.exports = router_library;