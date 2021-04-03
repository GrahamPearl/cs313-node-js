const build_table_books = (info) => {
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