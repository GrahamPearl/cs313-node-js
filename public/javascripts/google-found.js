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
        //UXI.safeExtract(data.items[0].volumeInfo.imageLinks.smallThumbnail);

        //;
        //document.getElementById("info_in_library").value = data.items.volumeInfo.;
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
            });
    }
}

class UXHandler extends Object {
    static find_google_api = find_google_api;
}

UXHandler.find_google_api();
document.addEventListener("DOMContentLoaded", () => {
    window.setTimeout(function () {
        document.body.classList.remove('fade');
        document.body.classList.add('fadeIn');
    }, 230);
});