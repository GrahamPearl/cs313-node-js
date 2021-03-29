const router_find =
    require('express').Router()
    .use('/books', async (req, res) => {
        // PERFORM API CALL T PATRONS = OBTAIN JSON FILE
        result = []
        res.render('pages/report',{'data' : result} );
        //res.render('pages/report')
    })
    .use('/patrons', async (req, res) => {
        // PERFORM API CALL T PATRONS = OBTAIN JSON FILE
        res.render('pages/report')
    })
    .get('/', (req, res) => res.render('pages/find'))
    .get('/db', async (req, res) => {

    });

module.exports = router_find;