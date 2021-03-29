var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function buildTable(data) {
    var html = '';
    html += '<tr>';
    var flag = 0;
/*
    $.each(data.data[0], function (index, value) {
        html += '<th>' + index + '</th>';
    });
*/
    html += '</tr>';
/*
    $.each(data.data, function (index, value) {
        console.log("Building Table Row...");

        html += '<tr>';
        $.each(value, function (index2, value2) {
            html += '<td>' + value2 + '</td>';
        });

        html += '<tr>';
    });
*/
    return html;
}

const router_find =
    require('express').Router()
    .use('/books', async (req, res) => {
        // PERFORM API CALL TO PATRONS = OBTAIN JSON FILE
        result = []
        res.render('pages/report', {
            'data': result
        });
        //res.render('pages/report')
    })
    .use('/patrons', async (req, res) => {
        // PERFORM API CALL T PATRONS = OBTAIN JSON FILE
        var url = "https://tranquil-river-49994.herokuapp.com/API/find_patrons_all";

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let found = JSON.parse(this.responseText);
                //console.log(data);
                //buildTable()
                res.render('pages/report', {
                    title: "Patrons Search"
                    //,data: found 
                })
            }
        }
        xhttp.open('GET', url, true);
        xhttp.send();
    })
    .get('/', (req, res) => res.render('pages/find'))
    .get('/db', async (req, res) => {

    });

module.exports = router_find;