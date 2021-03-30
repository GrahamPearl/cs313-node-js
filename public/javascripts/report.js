function buildTable(info) {
    $('#data-table').bootstrapTable({
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

function find_patrons_all() {    
    $.get("https://tranquil-river-49994.herokuapp.com/API/find_patrons_all",     
    function (data) {        
        let patrons = data.data        
        buildTable(patrons)
    })
}

find_patrons_all()