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

  books.search(search, function (error, ress) {
    if (!error) {
      console.log(ress);

      let params = ress;
      response.render(Books.urlResponse, params);

    } else {
      console.log(error);
      res.render("pages/error-report");
    }
  });
}

class GoogleBooks extends Object {
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

module.exports = GoogleBooks