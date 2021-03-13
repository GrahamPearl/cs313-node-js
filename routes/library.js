//const Post = require('../models/postmail');

const Library = require('../models/library');

const router_library = require('express').Router();
      router_library.get('/', (req, res) => res.render('pages/library'));
      router_library.get('/branch_search', Library.selectEvent);
      router_library.post('/report', library_report);
      router_library.get('/db', async (req, res) => {
        try {
          const client = await pool.connect();
          const result = await client.query('SELECT * FROM books');
          const results = { 'results': (result) ? result.rows : null};
          res.render('pages/db', results );
          client.release();
        } catch (err) {
          console.error(err);
          res.send("Error " + err);
        }
      });

function library_report(req, res) {
    try {
        const library = new Library();
              library.execute(req, res);
    } catch (err) {
        console.log('Error - will need to resolve:', err);
        res.render("pages/error-report");
    }
}

module.exports = router_library;