const router_library =
  require('express').Router()
  .use('/books', require('../routes/books'))
  .use('/find', require('../routes/find'))
  .use('/patrons', require('../routes/patrons'))
  
  .get('/', (req, res) => res.render('pages/library'))
  .get('/branch_search', require('../models/library').selectEvent)
  .get('/db', async (req, res) => {

  });

module.exports = router_library;