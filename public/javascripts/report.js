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

