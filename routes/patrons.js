const Patrons = require('../models/patrons');

const router_patrons = require('express').Router();
      router_patrons.get('/', (req, res) => res.render('pages/patrons'));
      router_patrons.get('/patrons_search', Patrons.searchEvent);
      router_patrons.post('/report', patrons_report);

function patrons_report(req, res) {
    try {
        const patrons = new Patrons();
              patrons.execute(req, res);
    } catch (err) {
        console.log('Error - will need to resolve:', err);
        res.render("pages/error-report");
    }
}

module.exports = router_patrons;