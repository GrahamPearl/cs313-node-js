require('dotenv').config()

const express = require('express')
const path = require('path')

const router_admin = require('./routes/admin');
const router_books = require('./routes/books');
const router_library = require('./routes/library');
const router_patrons = require('./routes/patrons');
const router_personal = require('./routes/personal');
const router_post = require('./routes/postmail');
const router_weeks = require('./routes/weeks');

const PORT = process.env.PORT;

var bodyParser = require("body-parser");

var app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.static(path.join(__dirname, 'models')))
  .use(express.json())
  .use(bodyParser.urlencoded({
    extended: false
  }))
  .set('views', path.join(__dirname, 'views'))
  .set('models', path.join(__dirname, 'models'))
  .set('view engine', 'ejs');

app.get('/', (req, res) => {
  if (process.env.MODE === 'ADMIN') {
    res.render('pages/admin')
  } else {
    res.render('pages/index')
  }
})


app.use('/admin', router_admin);
app.use('/books', router_books);
app.use('/library', router_library);
app.use('/patrons', router_patrons);
app.use('/personal', router_personal);
app.use('/postmail', router_post);
app.use('/weeks', router_weeks);
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))