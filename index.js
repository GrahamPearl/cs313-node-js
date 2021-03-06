const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var bodyParser = require("body-parser");

function calculateRate(mail_type, weight, zone) {
  return 100;
}

express()
  .use(bodyParser.urlencoded({
    extended: false
  }))
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.static(path.join(__dirname, 'views/models')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/postmail'))
  .post('/report', (req, res) => {
    var params = {
      weight: req.body.weight
      ,type: req.body.type      
      ,amount: calculateRate(req.body.type, req.body.weight, req.body.zone)
    }
    res.render("pages/report", params);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))