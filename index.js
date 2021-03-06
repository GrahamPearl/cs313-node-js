const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

calculateRate = function (mail_type, weight, zone) {
  return 100;
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.static(path.join(__dirname, 'views/models')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/postmail'))
  .post('/report', (req, res) => {
    try {
      //var logic = require('./models/logic.js');            
      //var amountOwe = logic.calculateRate(req.body.type, req.body.weight, req.body.zone);
      var amountOwe = 100; //calculateRate("1", 1, 1);
      var params = {
        amount: 100
      };
      res.render("pages/report", params);
    } catch (err) {
      console.log('Error - will need to resolve');
      //res.render("pages/error-report");
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))