import {
    UXI
} from './uxi.js';

const build_table_patrons = (info) => {
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
            formatter: function (value, row) {
                //+value+
                let items = '' + value + ' ';
                items += '<button type="button" class="btn btn-primary" href="#"><i class="far fa-eye"></i></button>';
                items += '<button type="button" class="btn btn-success" href="#"><i class="fas fa-edit"></i></button>';
                items += '<button type="button" class="btn btn-danger" href="#"><i class="far fa-trash-alt"></i></button>';
                return items;
            }
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


const find = (url, callback) => {
    console.log("Find URL: " + url);
    $.get(url,
        function (data) {
            let found = data.data;
            callback(found);
        })
}

const doTask = () => {
    let task = document.getElementById("task").value;
    let link = '';
    UXI.set_all_in_list_display_as([
        "search_id",
        "search_name_last",
        "search_name_first"
    ])
    UXHandler.task = '01';

    switch (task) {
        case '01':
            UXI.show_selected("search_id");
            break;
        case '02':
            UXI.show_selected("search_name_last");
            break;
        case '03':
            UXI.show_selected("search_name_first");
            break;
        default:
            break;
    }
}

class UXHandler extends Object {
    static task = '01';
    static doTask = doTask;
    static doFind = find_patrons;
}

function find_patrons() {
    let task = document.getElementById("task").value;
    let url = 'https://tranquil-river-49994.herokuapp.com/API/';
    let filter = '?';
    switch (task) {
        case '01':
            filter += 'id=' + document.getElementById("search_id").value;
            url += 'find_patron_by_id';
            break;
        case '02':
            filter += 'name_last=' + document.getElementById("search_name_last").value;
            url += 'find_patron_by_last';
            break;
        case '03':
            filter += 'name_first=' + document.getElementById("search_name_first").value;
            url += 'find_patron_by_first';
            break;
        default:
            url += 'find_patrons_all';
            break;
    }
    find(url + filter, build_table_patrons);
}

document.getElementById("task").onclick = function () {
    UXHandler.doTask();
};

UXI.set_all_in_list_display_as([
    "search_id",
    "search_name_last",
    "search_name_first"
])