function searchBooks() {
    console.log("Searching by book...");

    var seach_id = $("#search_id").val();
    var search_author = $("#search_author").val();
    var search_title = $("#search_title").val();

    console.log("Search ID: " + search_id);
    console.log("Search Author: " + search_author);
    console.log("Search Title: " +   search_title);

    $.get("/search",{ seach_id:seach_id}, function (data) {
        console.log("Back from the server with:");
        console.log(data);
    })
}