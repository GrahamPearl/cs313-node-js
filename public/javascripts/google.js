import {
    UXI
} from './uxi.js';

const build_table_google = (info) => {
    $('#data-table').bootstrapTable({
        formatLoadingMessage: function () {
            return '<b>Data has been loaded - please see below</b>';
        },
        "pagination": true,
        "smartDisplay": true,
        "pagingType": "simple",
        columns: [{
                field: "id",
                title: "Action",
                formatter: function (value, row) {
                    let items = '';//+value+' ';                    
                    items += '<a type="button" class="btn btn-primary" role="button" href="/google/found?id='+value+'"><i class="far fa-eye"></i></a>';
                    return items;
                }
            },
            {
                field: 'authors',
                title: 'Authors: '
            }, {
                field: 'title',
                title: 'Title: '
            }, {
                field: 'ISBN_10',
                title: 'ISBN-10: '
            }, {
                field: 'ISBN_13',
                title: 'ISBN-13: '
            }
        ]
        //,data: info
    })
}

const apply_filter_to_item_append_criteria = (item, criteria) => {
    return "" + String(item).replace(/ /g, "+") + criteria;
}

const apply_criteria_append_filter_to_item = (item, criteria) => {
    return "" + criteria + String(item).replace(/ /g, "+");
}

const check_defined_not_null_and_not_empty = (item_to_check, criteria, callback) => {
    let item = document.getElementById(item_to_check).value;
    if (typeof item !== 'undefined') {
        if (item !== null && String(item) !== '') {
            return callback(item, criteria)
        } else return ""
    } else return ""
}

class Filter extends Object {
    static apply(filter_type) {
        switch (filter_type) {
            case "0":
                return check_defined_not_null_and_not_empty("search_author", "inauthor:", apply_criteria_append_filter_to_item);
            case "1":
                return check_defined_not_null_and_not_empty("search_title", "intitle:", apply_criteria_append_filter_to_item);
            case "2":
                return check_defined_not_null_and_not_empty("search_author", "inauthor:", apply_criteria_append_filter_to_item) +
                    "&" + check_defined_not_null_and_not_empty("search_title", "intitle:", apply_criteria_append_filter_to_item);
            case "3":
                return check_defined_not_null_and_not_empty("search_author", "+inauthor", apply_filter_to_item_append_criteria);
            case "4":
                return check_defined_not_null_and_not_empty("search_title", "+intitle", apply_filter_to_item_append_criteria);
            case "5":
                return check_defined_not_null_and_not_empty("search_author", "+inauthor", apply_filter_to_item_append_criteria) +
                    "&" + check_defined_not_null_and_not_empty("search_title", "+intitle", apply_filter_to_item_append_criteria);
        }
        return "";
    }
}

class OrderBy extends Object {
    static apply(order_by) {
        switch (order_by) {
            case "0":
                return "&orderBy=relevance";
            case "1":
                return "&orderBy=newest";
        }
        return "";
    }
}

class Render_JSON extends Object {
    // USED TO DEMONSTRATE THE RE-STRUCTURING OF A JSON FROM A COMPLEX JSON OBJECT FOR RENDERING
    static apply(data) {
        let found = data.items;
        let render = {};
        render.items = [];

        for (let [key, value] of Object.entries(found)) {
            let item = {};

            item.id = UXI.safeExtract(value.id);
            item.title = UXI.safeExtract(value.volumeInfo.title);
            item.authors = UXI.safeExtract(data.items[0].volumeInfo.authors);
            //UXI.safeExtractList(value.volumeInfo.authors,item.authors);
            
            console.log("Authors: "+item.authors);

            item.ISBN_10 = UXI.safeExtractValueOfItem(value.volumeInfo.industryIdentifiers,"type","ISBN_10","identifier");
            item.ISBN_13 = UXI.safeExtractValueOfItem(value.volumeInfo.industryIdentifiers,"type","ISBN_13","identifier");
                        
            render.items.push(item);
        }
        return render.items;
    }
}

class UX extends Object {
    static apply_custom() { let filter_type = document.getElementById("task_custom").value; }
    static apply_filter() {}
}

const find_google_api = () => {
    let searchFor = "https://www.googleapis.com/books/v1/volumes?q="

    let filter_type = document.getElementById("task_filter").value;
    let sort_by = document.getElementById("task_order").value;
    //let filter_fields = document.getElementById("field_filter").value;

    console.log("Filter Type: " + filter_type);

    searchFor += Filter.apply(filter_type) +
        OrderBy.apply(sort_by);

    searchFor += "&fields=items(id,volumeInfo.title,volumeInfo.authors,volumeInfo.industryIdentifiers)";

    searchFor += "&maxResults=40";
    console.log("Performing GOOGLE API Search:" + searchFor)

    $.get(searchFor,
        function (data) {
            build_table_google();
            $('#data-table').bootstrapTable('load', Render_JSON.apply(data))
        });
}  

const task_customization = () => {
    let custom_type = document.getElementById("task_custom").value;
    UXI.set_all_in_list_display_as([
        "search_types",
        "field_filter",
        "task_order",
        "task_viewer",
        "task_filter"
    ])
    switch (custom_type) {
        case '0':
            UXI.show_selected("search_types");
            break;
        case '1':
            UXI.show_selected("field_filter");
            break;
        case '2':
            UXI.show_selected("task_order");
            break;
        case '3':
            UXI.show_selected("task_viewer");
            break;
        case '4':
            UXI.show_selected("task_filter");
            break;
    }
}

class UXHandler extends Object {
    static find_google_api = find_google_api;
    static task_customization = task_customization;       
}

document.getElementById("task_custom").onclick = function () { UXHandler.task_customization(); };
document.getElementById("task_order").onclick = function () {};
document.getElementById("task_filter").onclick = function () { UX.apply_filter(); };
document.getElementById("btn-submit").onclick = function () { UXHandler.find_google_api(); };

UXI.set_all_in_list_display_as([
    "search_types",
    "field_filter",
    "task_order",
    "task_viewer",
    "task_filter"
]);