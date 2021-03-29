function buildTable() {
    log.console("Building Table Data...");
    let data = [{
            "UserID": 1,
            "UserName": "rooter",
            "Password": "12345",
            "Country": "UK",
            "Email": "sac@gmail.com"
        },
        {
            "UserID": 2,
            "UserName": "binu",
            "Password": "123",
            "Country": "uk",
            "Email": "Binu@gmail.com"
        },
        {
            "UserID": 3,
            "UserName": "cal",
            "Password": "123",
            "Country": "uk",
            "Email": "cal@gmail.com"
        },
        {
            "UserID": 4,
            "UserName": "nera",
            "Password": "1234",
            "Country": "uk",
            "Email": "nera@gmail.com"
        }
    ]

    log.console("Building Table Structure...");
    var html = '';
    html += '<tr>';
    var flag = 0;
    $.each(data[0], function (index, value) {
        html += '<th>' + index + '</th>';
    });
    html += '</tr>';
    $.each(data, function (index, value) 
    {
        log.console("Building Table Row...");
        
        html += '<tr>';
        $.each(value, function (index2, value2) {
            html += '<td>' + value2 + '</td>';
        });
        html += '<tr>';
    });

    $('table').html(html);
}