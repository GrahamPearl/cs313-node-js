function build_table_google(info) {
    $('#data-table').bootstrapTable({
        formatLoadingMessage: function () {
            return '<b>Data is being loaded - please wait</b>';
        },
        "pagingType": "simple",
        columns: [{
            field: 'authors',
            title: 'Authors'
        }, {
            field: 'title',
            title: 'Title'
        }, {
            field: 'ISBN_10',
            title: 'ISBN-10'
        }, {
            field: 'ISBN_13',
            title: 'ISBN-13'
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

function apply_filter_to_item_append_criteria(item, criteria) {
    return "" + String(item).replace(/ /g, "+") + criteria;
}

function apply_criteria_append_filter_to_item(item, criteria) {
    return "" + criteria + String(item).replace(/ /g, "+");
}

function check_defined_not_null_and_not_empty(item_to_check, criteria, callback) {
    let item = document.getElementById(item_to_check).value;
    if (typeof item !== 'undefined') {
        if (item !== null && String(item) !== '') {
            return callback(item, criteria)
        } else return ""
    } else return ""
}

class Filter {

    static apply_filter(filter_type) {        
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

class UX {
    static apply_filter()
    {

    }
}

function find_google_api() {
    let searchFor = "https://www.googleapis.com/books/v1/volumes?q="

    let filter_type = document.getElementById("task").value;    
    console.log("Filter Type: "+filter_type);

    searchFor += Filter.apply_filter(filter_type);    
    searchFor += "&maxResults=40";
    console.log("Performing GOOGLE API Search:" + searchFor)

    $.get(searchFor,
        function (data) {
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
            console.log(JSON.stringify(render));


            //console.dir(found);      
            //found.action = "New Action";
            build_table_google(render.items);

        });
}