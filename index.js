const env = require('dotenv').config()
const express = require('express')
const path = require('path')

var session = require('express-session')
var $ = require("jquery");

const PORT = process.env.PORT;

var bodyParser = require("body-parser");
var app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.static(path.join(__dirname, 'models')))
  .use(express.json())
  .use(express.urlencoded({
    extended: true
  }))
  .use(session({
    secret: 'KZN-libaries',
    resave: false,
    saveUninitialized: true
  }))
  .use(logRequest)
  .set('views', path.join(__dirname, 'views'))
  .set('models', path.join(__dirname, 'models'))
  .set('view engine', 'ejs')
  .use('/API', require('./routes/api'))
  .use('/library', require('./routes/library'))

  .get('/', (req, res) => {
    if (process.env.MODE === 'ADMIN') {
      res.render('pages/admin')
    } else {
      res.render('pages/index')
    }
  })
  .get('/admin', (req, res) => {
    res.render('pages/admin')
  })
  .post('/login', handleLogin)
  .post('/logout', handleLogout);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

//==========================================================================================
function handleLogin(request, response) {
  var result = {
    success: false
  };
  if (request.body.username == "admin" && request.body.password == "password") {
    request.session.user = request.body.username;
    result = {
      success: true
    };
  }

  response.json(result);
}

function handleLogout(request, response) {
  var result = {
    success: false
  };
  if (request.session.user) {
    request.session.destroy();
    result = {
      success: true
    };
  }

  response.json(result);
}

function verifyLogin(request, response, next) {
  if (request.session.user) {
    next();
  } else {
    var result = {
      success: false,
      message: "Access Denied"
    };
    response.status(401).json(result);
  }
}

function logRequest(request, response, next) {
  console.log("Received a request for: " + request.url);
  next();
}