import {
    UXI
} from './uxi.js';

class Render_JSON extends Object {
    // USED TO DEMONSTRATE THE RE-STRUCTURING OF A JSON FROM A COMPLEX JSON OBJECT FOR RENDERING
    static apply(data) {
        document.getElementById("info_thumbnail").src = UXI.safeExtract(data.items[0].volumeInfo.imageLinks.smallThumbnail);
        document.getElementById("info_author").value = UXI.safeExtract(data.items[0].volumeInfo.authors);
        document.getElementById("info_title").value = UXI.safeExtract(data.items[0].volumeInfo.title);
        document.getElementById("info_publisher").value = UXI.safeExtract(data.items[0].volumeInfo.publisher);
        document.getElementById("info_publishedDate").value = UXI.safeExtract(data.items[0].volumeInfo.publishedDate);
        document.getElementById("info_averageRating").value = UXI.safeExtract(data.items[0].volumeInfo.averageRating);
        document.getElementById("info_categories").value = UXI.safeExtract(data.items[0].volumeInfo.categories);
        document.getElementById("info_description").value = UXI.safeExtract(data.items[0].volumeInfo.description);

        if (typeof data.items[0].volumeInfo.industryIdentifiers !== 'undefined') {
            let isbns = data.items[0].volumeInfo.industryIdentifiers;
            let isbn10 = UXI.safeExtractValueOfItem(isbns, "type", "ISBN_10", "identifier");
            let isbn13 = UXI.safeExtractValueOfItem(isbns, "type", "ISBN_13", "identifier");

            document.getElementById("info_ISBN_10").value = isbn10;
            document.getElementById("info_ISBN_13").value = isbn13;
        }

        document.getElementById("item_preview").href = UXI.safeExtract(data.items[0].volumeInfo.previewLink);
        //document.getElementById("info_in_library").href = UXI.safeExtract(data.items[0].volumeInfo.previewLink);                
    }
}

const find_google_api = () => {
    const queryString = new URLSearchParams(window.location.search);
    if (queryString.has("id")) {
        let filter_id = queryString.get("id");
        let searchFor = "https://www.googleapis.com/books/v1/volumes?q=id:" + filter_id;

        console.log("Performing Search: " + searchFor);

        $.get(searchFor,
            function (data) {
                $('#data-table').bootstrapTable('load', Render_JSON.apply(data))

                UXHandler.check_insert_google_api();
            });
    }
}

const length = (obj) => {
    return Object.keys(obj).length;
}

const insert_google_api = () => {
    let author = document.getElementById("info_author").value;
    let title = document.getElementById("info_title").value;
    let isbn10 = document.getElementById("info_ISBN_10").value;
    let isbn13 = document.getElementById("info_ISBN_13").value;
    let isbn = isbn10 + ',' + isbn13;
    let action = "";
    if ((author !== "") && (title !== "")) {
        action = "https://tranquil-river-49994.herokuapp.com/API/insert_book?author=" + author + "&title=" + title + "&isbn=" + isbn;
        console.log("action=" + action);
        $.get(action, function (data) {});

        alert("Added item to Library Collection");
    }
    UXHandler.check_insert_google_api();    
}

const check_insert_google_api = () => {
    let isbn10 = document.getElementById("info_ISBN_10").value;
    let isbn13 = document.getElementById("info_ISBN_13").value;
    if ((isbn10 !== "") || (isbn13 !== "")) {
        let filter = isbn10 + ',' + isbn13;
        let searchFor = "https://tranquil-river-49994.herokuapp.com/API/find_book_by_isbn?isbn=" + filter;

        console.log("searchFor=" + searchFor);
        $.get(searchFor,
            function (data) {
                let compare = JSON.stringify(data);
                let link = document.getElementById("info_in_library");

                if (compare === '{"data":[]}') {
                    link.value = "Add to Library Collection";
                    link.onclick = function () {
                        UXHandler.insert_google_api();
                    };
                } else {
                    link.value = "Item exists in Library";
                    link.onclick = function () {
                        alert("Unable to add - already exists");
                    };
                }
            });
    }
}

class UXHandler extends Object {
    static find_google_api = find_google_api;
    static insert_google_api = insert_google_api;
    static check_insert_google_api = check_insert_google_api;
}

UXHandler.find_google_api();

document.addEventListener("DOMContentLoaded", () => {
    window.setTimeout(function () {
        document.body.classList.remove('fade');
        document.body.classList.add('fadeIn');
    }, 230);
});