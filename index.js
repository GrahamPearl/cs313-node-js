const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var bodyParser = require("body-parser");

function closest(arr, closestTo) {
  var closest = Math.max.apply(null, arr); 

        for (var i = 0; i < arr.length; i++) { 
            if (arr[i] >= closestTo && arr[i] < closest) closest = arr[i]; 
        }

        return closest; // return the value
};

function calculateRate(mail_type, weight, zone) {
  let cost = 200;
  let weights = [];
  let amount = [];
  let index = 0;
  switch (mail_type) {
    case "1":
      weights = [1, 2, 3, 3.5];
      amount = [0.55, 0.75, 0.95, 1.15];
      index = [closest(weights,weight)];        
      cost = amount[index-1];
      break;

    case "2":          
      weights = [1, 2, 3, 3.5];
      amount = [0.51, 0.71, 0.91, 1.11];
      index = [closest(weights,weight)];        
      cost = amount[index-1];
      break;

    case "3":
      weights = [1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
      amount = [1.00,1.20,1.40,1.60,1.80,2.00,2.20,2.40,2.60,2.80,3.00,3.20,3.40];
      index = [closest(weights,weight)];        
      cost = amount[index-1];
      break;

    case "4":
      cost = 40;
      break;
    default:
      cost = 50;
  }
  return cost;
};

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.static(path.join(__dirname, 'views/models')))
  .use(bodyParser.urlencoded({
    extended: false
  }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/postmail'))
  .post('/report', (req, res) => {
    try {
      //var logic = require('./models/logic.js');            
      var amountOwed = calculateRate(req.body.type, req.body.weight, req.body.zone);
      //var amountOwed = calculateRate("1", 1, 1);
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