const {
  Pool
} = require("pg");

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

const getBooks = (request, response) => {
  pool.query('SELECT * FROM books', (error, results) => {
    if (error) {
      throw error
    }
    var params = {
      headers: ["id", "author", "title"],
      rows: new Array(4).fill(results.rows)
    };

    response.render(Books.urlResponse, params);
    //response.status(200).json(results.rows)
  })
}

const getBooksOnGoogle = (request, response) => {

  var books = require('google-books-search');

  books.search('Professional JavaScript for Web Developers', function (error, results) {
    if (!error) {
      console.log(results);

      let params = results;
      response.render(Books.urlResponse, params);
      
    } else {
      console.log(error);
      res.render("pages/error-report");
    }
  });

  

}

const addBook = (request, response) => {
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
        message: 'Book added.'
      })
    },
  )
}

class Books extends Object {
  static urlResponse = "pages/books_report";
  static insertBook = addBook;
  static searchEvent = getBooksOnGoogle;

  execute(req, res) {
    try {
      pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
      })

      Books.searchEvent(req, res);

    } catch (err) {
      console.log('Error - will need to resolve:', err);            
    }
  };
}

module.exports = Books