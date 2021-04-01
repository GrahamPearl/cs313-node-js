function build_table_books(info) {
  $('#data-table').bootstrapTable({
    formatLoadingMessage: function () {
      return '<b>Data is being loaded - please wait</b>';
    },

    columns: [{
      field: 'id',
      title: 'Item ID'
    }, {
      field: 'author',
      title: 'Authors'
    }, {
      field: 'title',
      title: 'Title'
    }],
    data: info

  })
}

function build_table_patrons(info) {
  $('#data-table').bootstrapTable({
    formatLoadingMessage: function () {
      return '<b>Data is being loaded - please wait</b>';
    },
    columns: [{
      field: 'id',
      title: 'Item ID'
    }, {
      field: 'first',
      title: 'First Name'
    }, {
      field: 'last',
      title: 'Last Price'
    }],
    data: info

  })
}

function build_table_google(info) {
  $('#data-table').bootstrapTable({
    formatLoadingMessage: function () {
      return '<b>Data is being loaded - please wait</b>';
    },
    "pagingType": "simple",
    columns: [{
      field: 'authors',
      title: 'Authors'
    }, {
      field: 'title',
      title: 'Title'
    }, {
      field: 'ISBN_10',
      title: 'ISBN-10'
    }, {
      field: 'ISBN_13',
      title: 'ISBN-13'
    }],
    data: info

  })
}

function add_buttons_to_build_table() {
  console.log("Reading Table");

  $('#data-table tr').each(function () {
    console.log("Reading Row");
    let customButtons = $(this).find("td").eq(3).html();
    customButtons.append('<button type="button" class="btn btn-primary"><i class="far fa-eye"></i></button>');
    customButtons.append('<button type="button" class="btn btn-success"><i class="fas fa-edit"></i></button>');
    customButtons.append('<button type="button" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>');

  });
}

function find_books_all() {
  $.get("https://tranquil-river-49994.herokuapp.com/API/find_books_all",
    function (data) {
      let found = data.data
      build_table_books(found)
    })
}

function find_patrons_all() {
  $.get("https://tranquil-river-49994.herokuapp.com/API/find_patrons_all",
    function (data) {
      let found = data.data
      build_table_patrons(found)
    })
}

function find_google_api() {
  let searchFor = "https://www.googleapis.com/books/v1/volumes?q="
  let addAuthor = "";
  let addTitle = "";

  let search_author = document.getElementById("search_author").value;
  if (typeof search_author !== 'undefined') {
    if (search_author !== null && String(search_author) !== '') {
      addAuthor = String(search_author).replace(/ /g, "+") + "+inauthor";
    }
  }

  let search_title = document.getElementById("search_title").value;
  if (typeof search_title !== 'undefined') {
    if (search_title !== null && String(search_title) !== '') {
      addTitle = String(search_title).replace(/ /g, "+") + "+intitle";
    }
  }

  searchFor += String(addAuthor);
  if ((addAuthor !== null && String(addAuthor) !== '') &&
    (addTitle !== null && String(addTitle) !== ''))
    searchFor += "&" + String(addTitle);
  else
  if ((addTitle !== null && String(addTitle) !== ''))
    searchFor += String(addTitle);

  searchFor += "&maxResults=40";
  console.log("Performing GOOGLE API Search:" + searchFor)

  $.get(searchFor,
    function (data) {
      let found = data.items;
      let render = {};
          render.items = [];

      for (let [key, value] of Object.entries(found)) {
        let item = {};

        if (typeof value.volumeInfo.title !== 'undefined') {
          let title = value.volumeInfo.title;
          item.title = title;
        }
        
        if (typeof value.volumeInfo.authors !== 'undefined') {
          let authors = value.volumeInfo.authors;
          item.authors = [];
          for (let [key, author] of Object.entries(authors)) {
            item.authors.push(author);
          }
        }

        if (typeof value.volumeInfo.industryIdentifiers !== 'undefined') {
          let identifiers = value.volumeInfo.industryIdentifiers;                  
          for (let [key, identify] of Object.entries(identifiers)) {
            if (identifiers[key].type !== 'undefined') {
              if (identifiers[key].type == 'ISBN_13') item.ISBN_13 = identify.identifier;
              if (identifiers[key].type == 'ISBN_10') item.ISBN_10 = identify.identifier;
            }
          }
        }        
        
        render.items.push(item);
      }
      console.log(JSON.stringify(render));
      

      //console.dir(found);      
      //found.action = "New Action";
      build_table_google(render.items);

    });
}