import { UXI } from './uxi.js';

const handleTask = () => {
    let urlResponse = "";
    const task = document.getElementById("task");
    console.log("Task: " + task);

    switch (task) {
        case "01":
            urlResponse = "/API/find_patrons_all";
            break;
        case "02":
            urlResponse = "/API/find_patron_by_id";
            break;
        case "03":
            urlResponse = "/API/find_patron_by_last";
        case "04":
            urlResponse = "/API/find_patron_by_first";
        case "06":
            urlResponse = "/API/find_books_all";
            break;
        case "07":
            urlResponse = "/API/find_books_all";
            break;
        case "08":
            urlResponse = "/API/find_books_all";
            break;
        case "09":
            urlResponse = "/API/find_books_all";
            break;
        default:
            urlResponse = "pages/index";
    }
    response.render(urlResponse)
}

const doTask = () => {
    let task = document.getElementById("task").value;
    let link = '';
    UXI.set_all_in_list_display_as([
        "search_book_isbn",
        "search_book_author",
        "search_book_title",
        "search_patron_id",
        "search_patron_name_last",
        "search_patron_name_first"
    ])
    switch (task) {
        case '01':
        case '02':
        case '03':
        case '04':
        case '05':
            link = document.getElementById('patrons');
            switch (task) {
                case '01':
                    link.action = "/API/find_patrons_all";
                    break;
                case '02':
                    link.action = "/API/find_patron_by_id";
                    UXI.show_selected("search_patron_id");
                    break;
                case '03':
                    link.action = "/API/find_patron_by_last";
                    UXI.show_selected("search_patron_name_last");
                    break;
                case '04':
                    link.action = "/API/find_patron_by_first";
                    UXI.show_selected("search_patron_name_first");
                    break;
                case '05':
                    link.action = "/API/insert_patron";
                    UXI.set_all_in_list_display_as([
                        "search_book_isbn",
                        "search_book_author",
                        "search_book_title",
                        "search_patron_id",
                        "search_patron_name_last",
                        "search_patron_name_first"
                    ], "on")
                    break;
            }
            UXI.toggleForm(document.getElementById("books"));
            UXI.toggleForm(document.getElementById("patrons"), "on");
            break;
        case '06':
        case '07':
        case '08':
        case '09':
        case '10':
            link = document.getElementById('books');
            switch (task) {
                case '06':
                    link.action = "/API/find_books_all";
                    break;
                case '07':
                    link.action = "/API/find_book_by_isbn";
                    UXI.show_selected("search_book_isbn");
                    break;
                case '08':
                    link.action = "/API/find_book_by_author";
                    UXI.show_selected("search_book_author");
                    break;
                case '09':
                    link.action = "/API/find_book_by_title";
                    UXI.show_selected("search_book_title");
                    break;
                case '10':
                    link.action = "/API/insert_book";
                    UXI.set_all_in_list_display_as([
                        "search_book_isbn",
                        "search_book_author",
                        "search_book_title",
                        "search_patron_id",
                        "search_patron_name_last",
                        "search_patron_name_first"
                    ], "on")
                    break;
            }
            UXI.toggleForm(document.getElementById("books"), "on");
            UXI.toggleForm(document.getElementById("patrons"));
            break;
        default:
            UXI.toggleForm(document.getElementById("books"));
            UXI.toggleForm(document.getElementById("patrons"));
            break;
    }
}

class UXHandler extends Object {
    static handleTask = handleTask;
    static doTask = doTask;
}

document.getElementById("task").onclick =  function() {  
  UXHandler.doTask();
};
//

UXI.toggleForm(document.getElementById("books"));
UXI.toggleForm(document.getElementById("patrons"));