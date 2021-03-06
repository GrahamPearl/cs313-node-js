const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var bodyParser = require("body-parser");

var models = require('./models/logic');

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
    try{
    var amountOwe = models.calculateRate(req.body.type, req.body.weight, req.body.zone)

    var params = {
      weight: req.body.weight
      ,type: req.body.type      
      ,amount: amountOwe
    }
      res.render("pages/report", params);
    } catch (err) {
      res.render("pages/error-report");
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))