const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const Week9 = require('week9');

var bodyParser = require("body-parser");

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.static(path.join(__dirname, 'views/models')))
  .use(bodyParser.urlencoded({
    extended: false
  }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/week9', (req, res) => res.render('pages/postmail'))
  .post('/week9/report', (req, res) => {
    try {      
      
      Week9().handle_week9();
      var params = {
        amount: amountOwed
      };
      res.render("pages/report", params);
    } catch (err) {
      console.log('Error - will need to resolve:', err);
      //res.render("pages/error-report");
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))