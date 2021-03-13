//const Post = require('../models/postmail');

const Library = require('../models/library');

const router_library = require('express').Router();
      router_library.get('/', (req, res) => res.render('pages/library'));
      router_library.get('/branch_search', Library.selectEvent);
      router_library.post('/report', library_report);

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