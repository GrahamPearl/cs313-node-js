const {
  Pool
} = require("pg");

//const uriHeroku = 'postgres://eyrisxdztiubpj:c8ca45cbe5b9cf11038936746236f52eb49c76f384467bb2e27c7e4f7bc26bf0@ec2-54-242-43-231.compute-1.amazonaws.com:5432/dbadu7beav50j0';
//const uriHeroku = 'postgres://eyrisxdztiubpj:c8ca45cbe5b9cf11038936746236f52eb49c76f384467bb2e27c7e4f7bc26bf0@ec2-54-242-43-231.compute-1.amazonaws.com:5432/dbadu7beav50j0';
const uriLocal = 'postgres://api_user:password@localhost:5432/books_api';

var URI = '';
if (process.env._.indexOf("heroku") === -1) {
  URI = uriLocal;
} else {
  URI = process.env.DATABASE_URL
}

const connectionString = process.env.DATABASE_URL || URI;
const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

const getPatrons = (request, response) => {
   pool.query('SELECT * FROM books', (error, results) => {
    if (error) {
      throw error
    }
    var params = {
      headers: ["id", "author", "title"],
      rows: new Array(4).fill(results.rows)
    };

    response.render(Patrons.urlResponse, params);
    //response.status(200).json(results.rows)
  })
}

const addPatron = (request, response) => {
  const {
    author,
    title
  } = request.body

  pool.query(
    'INSERT INTO books (author, title) VALUES ($1, $2)',
    [author, title],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({
        status: 'success',
        message: 'Patron added.'
      })
    },
  )
}

class Patrons extends Object {
  static urlResponse = "pages/patrons_report";
  static insertBook = addPatron;
  static searchEvent = getPatrons;

  execute(req, res) {
    try {
      pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
      })

      Patrons.searchEvent(req,res);
      
    } catch (err) {
      console.log('Error - will need to resolve:', err);
      //res.render("pages/error-report");
    }
  };
}

module.exports = Patrons