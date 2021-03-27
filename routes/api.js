const API = require('../models/api');

const router_api = require('express').Router()
    .get('/', (req, res) => res.render('pages/api'))
    .get('/find_patrons_all', (req, res) => API.select_all_patrons(req, res))    
    .get('/find_patron_by_id', (req, res) => API.select_patron_by_id(req, res))
    .get('/find_patron_by_last', (req, res) => API.select_patron_by_last(req, res))
    .get('/find_patron_by_first', (req, res) => API.select_patron_by_first(req, res))
    .get('/insert_patron', (req, res) => API.insert_patron(req, res))
    
    
module.exports = router_api;