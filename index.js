const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

function closest(arrWeight, arrCost, closestTo) {
  var closest = 0; 

  for (var i = 0; i < arrWeight.length; i++) { 
      if (arrWeight[i] >= arrWeight[closestTo] && arrWeight[i] < closest) closestTo = i; 
  }

  return arrCost[closest]; 
};

function calculateRate(mail_type, weight, zone) {
  let cost = 200;
  switch (mail_type)
  {
    case "1": cost = 10; //closest([1, 2, 3, 3.5],[0.51, 0.71, 0.91, 1.11],weight);
    break;
    case "2": cost = 20;
    break;  
    case "3": cost = 30;
    break;
    case "4": cost = 40;
    break;
  };
  return cost;
};

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.static(path.join(__dirname, 'views/models')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/postmail'))
  .post('/report', (req, res) => {
    try {
      //var logic = require('./models/logic.js');            
      //var amountOwed = logic.calculateRate(req.body.type, req.body.weight, req.body.zone);
      var amountOwe = calculateRate("1", 1, 1);
      var params = {
        amount: amountOwed
      };
      res.render("pages/report", params);
    } catch (err) {
      console.log('Error - will need to resolve');
      //res.render("pages/error-report");
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))