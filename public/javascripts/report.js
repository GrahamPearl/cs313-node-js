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
    "pagination": true,
    "smartDisplay": true,
    "pagingType": "simple",
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