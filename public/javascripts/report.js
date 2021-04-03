function btnFormatter(value, row) {
//+value+
  let items = ''+value+' ';
      items += '<button type="button" class="btn btn-primary" href="#"><i class="far fa-eye"></i></button>';
      items += '<button type="button" class="btn btn-success" href="#"><i class="fas fa-edit"></i></button>';
      items += '<button type="button" class="btn btn-danger" href="#"><i class="far fa-trash-alt"></i></button>';
  return items;  
}

function add_buttons_to_build_table() {
 
  $('#data-table tr').each(function () {
    console.log("Reading Row");
    let customButtons = $(this).find("td").eq(3).html();
    customButtons.append('<button type="button" class="btn btn-primary" href="#"><i class="far fa-eye"></i></button>');
    customButtons.append('<button type="button" class="btn btn-success" href="#"><i class="fas fa-edit"></i></button>');
    customButtons.append('');
  });
}

function build_table_books(info) {
  $('#data-table').bootstrapTable({
    formatLoadingMessage: function () {
      return '<b>Data is being loaded - please wait</b>';
    },
    "pagination": true,
    "smartDisplay": true,
    "pagingType": "simple",

    columns: [{
      field: 'id',
      title: 'Item ID',
      formatter: "btnFormatter"
    }, {
      field: 'author',
      title: 'Authors',      
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
    "pagination": true,
    "smartDisplay": true,
    "pagingType": "simple",
    columns: [{
      field: 'id',
      title: 'Item ID',
      formatter: "btnFormatter"
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

function find_books_all() {
  $.get("https://tranquil-river-49994.herokuapp.com/API/find_books_all",
    function (data) {
      let found = data.data
      build_table_books(found)
    })
}

function find_libraries_all() {
  $.get("https://tranquil-river-49994.herokuapp.com/API/find_library_all",
    function (data) {
      let found = data.data
      build_table_patrons(found)
    })
}

function find_patrons_all() {
  $.get("https://tranquil-river-49994.herokuapp.com/API/find_patrons_all",
    function (data) {
      let found = data.data
      build_table_patrons(found)
    })
}
