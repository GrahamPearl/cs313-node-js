const getBooksOnGoogle = (querystring) => {
  const books = require('google-books-search');

  console.log("Performing Book Search");
  console.log("Request:" + JSON.stringify(querystring));
  console.log(" Author:" + querystring.author);
  console.log("  Title:" + querystring.title);    

  if ((querystring.title != undefined) || (querystring.author != undefined)) {
    console.log('Has enough parameters to perform search');    
   
    let search = '';
    if (querystring.title != undefined)
    {
      search += querystring.title+'+InTitle';
    }
    if (querystring.author != undefined)
    {
      search += querystring.author+'+InAuthor';
    }

    console.log("Search: "+search)

    //fetch('https://www.googleapis.com/books/v1/volumes?q=search-terms&key=your-API-key')
    fetch('https://www.googleapis.com/books/v1/volumes?q='+search)
    .then(response => response.json())
    .then(result => {
      this.setState({ books: result.items})
    })

  } else
  {
    console.log('Need parameters to perform search');
  }

}

class GoogleBooks extends Object {
  static urlResponse = "pages/found";
  static searchEvent = getBooksOnGoogle;  
}

module.exports = GoogleBooks