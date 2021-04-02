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
        }]
        //,data: info
    })
}

const add_buttons_to_build_table = () => {
    console.log("Reading Table");

    $('#data-table tr').each(function () {
        console.log("Reading Row");
        let customButtons = $(this).find("td").eq(3).html();
        customButtons.append('<button type="button" class="btn btn-primary"><i class="far fa-eye"></i></button>');
        customButtons.append('<button type="button" class="btn btn-success"><i class="fas fa-edit"></i></button>');
        customButtons.append('<button type="button" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>');

    });
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

            if (typeof value.volumeInfo.title !== 'undefined') {
                let title = value.volumeInfo.title;
                item.title = title;
            }

            if (typeof value.volumeInfo.authors !== 'undefined') {
                let authors = value.volumeInfo.authors;
                item.authors = [];
                for (let [key, author] of Object.entries(authors)) {
                    item.authors.push(author);
                }
            }

            if (typeof value.volumeInfo.industryIdentifiers !== 'undefined') {
                let identifiers = value.volumeInfo.industryIdentifiers;
                for (let [key, identify] of Object.entries(identifiers)) {
                    if (identifiers[key].type !== 'undefined') {
                        if (identifiers[key].type == 'ISBN_13') item.ISBN_13 = identify.identifier;
                        if (identifiers[key].type == 'ISBN_10') item.ISBN_10 = identify.identifier;
                    }
                }
            }

            render.items.push(item);
        }
        return render.items;
    }
}

class UX extends Object {
    static apply_custom() {
        let filter_type = document.getElementById("task_custom").value;
    }

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
            UXI.show_selected("task_filter");
            break;
    }
}

class UXHandler extends Object {
    static find_google_api = find_google_api;
    static task_customization = task_customization;
}

document.getElementById("task_custom").onclick = function () {
    UXHandler.task_customization();
};
document.getElementById("task_order").onclick = function () {};
document.getElementById("task_filter").onclick = function () {
    UX.apply_filter();
};
document.getElementById("btn-submit").onclick = function () {
    UXHandler.find_google_api();
};

UXI.set_all_in_list_display_as([
    "search_types",
    "field_filter",
    "task_order",
    "task_filter"
]);


/*UXI.set_all_in_list_display_as([
    "search_types",
    "field_filter",
    "task_order",
    "task_filter"
]);
*/