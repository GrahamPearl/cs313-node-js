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

const row = html => `<tr>\n${html}</tr>\n`,
  heading = object => row(Object.keys(object).reduce((html, heading) => (html + `<th>${heading}</th>`), '')),
  datarow = object => row(Object.values(object).reduce((html, value) => (html + `<td>${value}</td>`), ''));

function htmlTable(dataList) {
  return `<table>
            ${heading(dataList[0])}
            ${dataList.reduce((html, object) => (html + datarow(object)), '')}
          </table>`
}

const getBooks = (request, response) => {
  pool.query('SELECT * FROM books', (error, results) => {
    if (error) {
      throw error
    }
    var params = {
      headers: ["isbn", "author", "title"],
      rows: new Array(4).fill(results.rows)
    };

    response.render(Books.urlResponse, params);
    //response.status(200).json(results.rows)
  })
}

const getBooksOnGoogle = (request, response) => {

  var books = require('google-books-search');
  var search = "";

  console.log("Performing Book Search");
  console.log("Request:" + request);
  console.log(" Params:" + request.searchParams);

  let search_params = request.searchParams;
  if (search_params.has("isbn")) {
    search += request.isbn + "+isbn";
  };
  if (search_params.has("author")) {
    search += request.author + "+inauthor";
  };
  if (search_params.has("title")) {
    search += request.title + "+intitle";
  };

  console.log("Searching for: ".search);

  books.search(search, function (error, results) {
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

      const search_params = req.searchParams;
      console.log("Entering Book Search");
      console.log("Request:" + req);
      console.log(" Params:" + req.searchParams);

      if ((search_params.has("isbn")) ||
        (search_params.has("author")) ||
        (search_params.has("title"))) {

        Books.searchEvent(req, res);
      }

    } catch (err) {
      console.log('Error - will need to resolve:', err);
    }
  };
}

module.exports = Books