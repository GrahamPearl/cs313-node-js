const router_books =
    require('express').Router()
    .get('/', (req, res) => res.render('pages/books'))
    .get('/search', (req, res) => {
        require('../models/books').searchEvent(req, res);
    });

module.exports = router_books;