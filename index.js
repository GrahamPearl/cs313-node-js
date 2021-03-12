const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const Week9 = require('./models/week9');
const Week10Team = require('./models/week10team');

var bodyParser = require("body-parser");

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.static(path.join(__dirname, 'models')))
  .use(express.json())
  .use(bodyParser.urlencoded({
    extended: false
  }))
  .set('views', path.join(__dirname, 'views'))
  .set('models', path.join(__dirname, 'models'))  
  .set('view engine', 'ejs')

  .get('/', (req, res) => res.render('pages/index'))

  .get('/week9', (req, res) => res.render('pages/postmail'))
  .post('/week9/report', week9_task)
  .get('/week10Team', (req, res) => res.render('pages/week10Team'))
  .post('/week10Team/report', week10_task)

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function week9_task(req, res) {
  try {
    const week9 = new Week9();
    week9.execute(req, res);
  } catch (err) {
    console.log('Error - will need to resolve:', err);
    res.render("pages/error-report");
  }
}

function week10_task(req, res) {
  try {
    const week10team = new Week10Team();
    week10team.execute(req, res);
  } catch (err) {
    console.log('Error - will need to resolve:', err);
    res.render("pages/error-report");
  }

}