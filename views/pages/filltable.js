$(document).ready(() => {

$.ajax({
    url: "http://localhost:5000/list", 
    method: 'GET',
    success: function(response){
        if(response.rows.length > 0){
            for(let index = 0; index < response.rows.length; index++) {
                var newRow = $("<tr>");
                var cols = "";
                var firstname = '';
                var lastname = '';
                var gender = '';
                cols += '<td> '+ response.rows[index].firstname +'</td>';
                cols += '<td> '+ response.rows[index].lastname +'</td>';
                cols += '<td> '+ response.rows[index].gender+'</td>';                
                newRow.append(cols);
                $("#tableData .tbody").append(newRow);
            }  

        }
    }
})
})