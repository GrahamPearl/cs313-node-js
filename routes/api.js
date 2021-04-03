const API = require('../models/api');
const DB = require('../models/database');

const router_api = require('express').Router()
    .get('/', (req, res) => res.render('pages/api'))
    .get('/find_patrons_all', (req, res) => API.select_all_patrons(req, res))    
    .get('/find_patron_by_id', (req, res) => API.select_patron_by_id(req, res))
    .get('/find_patron_by_last', (req, res) => API.select_patron_by_last(req, res))
    .get('/find_patron_by_first', (req, res) => API.select_patron_by_first(req, res))
    .get('/insert_patron', (req, res) => API.insert_patron(req, res))    
    .get('/save_patrons_all', (req, res) => DB.save(API.select_all_patrons(req, res)))
    .get('/find_books_all', (req, res) => API.select_all_books(req, res))    
    .get('/find_book_by_isbn', (req, res) => API.select_book_by_isbn(req, res))
    .get('/find_book_by_author', (req, res) => API.select_book_by_author(req, res))
    .get('/find_book_by_title', (req, res) => API.select_book_by_title(req, res))
    .get('/insert_book', (req, res) => API.insert_book(req, res))
    
    
module.exports = router_api;