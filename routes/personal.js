const Personal = require('../models/personal');

var path = require('path');

const router_personal = require('express').Router();
router_personal.get('/', (req, res) => res.render('pages/personal'));
router_personal.get('/notes_todo', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/pages/personal/notes_todo.html'));
});
router_personal.post('/todo', personal_ToDo);

function personal_ToDo(req, res) {
    try {
        const personal = new Personal();
        personal.execute(req, res);
    } catch (err) {
        console.log('Error - will need to resolve:', err);
        res.render("pages/error-report");
    }
}

module.exports = router_personal;