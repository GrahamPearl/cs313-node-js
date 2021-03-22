const Books = require('../models/books');

const router_books = require('express').Router();
      router_books.get('/', (req, res) => res.render('pages/books'));
      router_books.get('/books_search', (req, res) => { Books.searchEvent(req, res); });
      router_books.post('/report', books_report);

function books_report(req, res) {
    try {
        const books = new Books();
              books.execute(req, res);
    } catch (err) {
        console.log('Error - will need to resolve:', err);
        res.render("pages/error-report");
    }
}

module.exports = router_books;