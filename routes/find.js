var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function buildTable(data) {
    var html = '';
    html += '<tr>';
    html += '</tr>';
    return html;
}

const router_find =
    require('express').Router()
    .use('/books', async (req, res) => {
        // PERFORM API CALL TO BOOKS = OBTAIN JSON FILE
        let found = []
        res.render('pages/report', {
            data: found
        });        
    })
    .use('/patrons', async (req, res) => {
        // PERFORM API CALL TO PATRONS = OBTAIN JSON FILE
        let found = []
        res.render('pages/report', {
            title: 'Patrons Found'
            ,data: found
        });
    })
    .get('/', (req, res) => res.render('pages/find'))
    .get('/db', async (req, res) => {

    });

module.exports = router_find;