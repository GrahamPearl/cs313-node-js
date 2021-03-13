const express = require('express')
const path = require('path')
const router_post = require('./routes/postmail');
const router_library = require('./routes/library');
const router_books = require('./routes/books');

const PORT = process.env.PORT || 5000

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

app.get('/', (req, res) => res.render('pages/index'))
app.use('/postmail', router_post); 
app.use('/library', router_library);
app.use('/books', router_books);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))