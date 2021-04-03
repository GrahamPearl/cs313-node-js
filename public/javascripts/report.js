function btnFormatter(value, row) {
//+value+
  let items = ''+value+' ';
      items += '<button type="button" class="btn btn-primary" href="#"><i class="far fa-eye"></i></button>';
      items += '<button type="button" class="btn btn-success" href="#"><i class="fas fa-edit"></i></button>';
      items += '<button type="button" class="btn btn-danger" href="#"><i class="far fa-trash-alt"></i></button>';
  return items;  
}

function build_table_books() {
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
  })
}

function build_table_libraries() {
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
  })
}


function build_table_patrons() {
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
  })
}

function find(url, callback) {
  console.log("Searching for: "+url);
  $.get(url,
    function (data) {      
      callback()
      $('#data-table').bootstrapTable('load', data.data);
    })
}

function get_fields() {
  let search_01 = document.getElementById('search_01').value.replace(/ /g, "+");;
  let search_02 = document.getElementById('search_02').value.replace(/ /g, "+");;
  let search_03 = document.getElementById('search_03').value.replace(/ /g, "+");;
  return [search_01, search_02, search_03];
}

function find_books_all() {  
  let params = get_fields();
  let task =  document.getElementById("task").value;
  let url = 'https://tranquil-river-49994.herokuapp.com/API/';
  let filters = 'isbn='+params[0]+'&author='+params[1]+'&title='+params[0]+'';  
  switch (task) {
    case '01': url += "find_book_by_isbn"; break;
    case '02': url += "find_book_by_author"; break;
    case '03': url += "find_book_by_title"; break;  
    default:
        url += "find_books_all";
        break;        
}  find(url,build_table_books);
}

function find_libraries_all() {
  let params = get_fields();
  let task =  document.getElementById("task").value;
  let url = 'https://tranquil-river-49994.herokuapp.com/API/';
  let filters = 'id='+params[0]+'&title='+params[1]+'&email='+params[0]+'';
  switch (task) {
    case '01': url += "find_branch_by_id"; break;
    case '02': url += "find_branch_by_title"; break;
    case '03': url += "find_branch_by_email"; break;
    default:
        url += "find_branchs_all";
        break;        
}  find(url+filters,build_table_libraries);
}

function find_patrons_all() {
  let params = get_fields();
  let task =  document.getElementById("task").value;
  let url = 'https://tranquil-river-49994.herokuapp.com/API/';  
  let filters = '?id='+params[0]+'&name_last='+params[1]+'&name_first='+params[2]+'';
  switch (task) {
    case '01': url += "find_patron_by_id";    break;
    case '02': url += "find_patron_by_last";  break;
    case '03': url += "find_patron_by_first"; break;
    default:
        url += "find_patrons_all";
        break;        
}  find(url+filters,build_table_patrons);
}
