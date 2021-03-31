//const { response } = require("express");

function handleTask() {
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

function set_all_unselected(status = "off") {
    items = [
        "search_book_isbn", "search_book_author", "search_book_title", "search_patron_id", "search_patron_name_last", "search_patron_name_first"
    ];

    items.forEach((value, index, array) => {
        let els = document.getElementsByClassName(value);
        [].forEach.call(els, function (el) {
            if (status == "on") {
                el.style.display = "grid"
            } else {
                el.style.display = "none";
            }
        });
    })

}

function show_selected(value) {
    let els =document.getElementsByClassName(value);
    [].forEach.call(els, function (el) {    
    el.style.display = "grid";
    });
}

function toggleForm(item, status = "off") {
    if (status == "on") {
        item.style.display = "grid"
    } else {
        item.style.display = "none";
    }
}

function doTask() {
    let task = document.getElementById("task").value;
    let link = '';
    set_all_unselected()
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
                    show_selected("search_patron_id");
                    break;
                case '03':
                    link.action = "/API/find_patron_by_last";
                    show_selected("search_patron_name_last");
                    break;
                case '04':
                    link.action = "/API/find_patron_by_first";
                    show_selected("search_patron_name_first");
                    break;
                case '05':
                    link.action = "/API/insert_patron";
                    set_all_unselected("on")
                    break;
            }
            toggleForm(document.getElementById("books"));
            toggleForm(document.getElementById("patrons"), "on");
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
                    show_selected("search_book_isbn");
                    break;
                case '08':
                    link.action = "/API/find_book_by_author";
                    show_selected("search_book_author");
                    break;
                case '09':
                    link.action = "/API/find_book_by_title";
                    show_selected("search_book_title");
                    break;
                case '10':
                    link.action = "/API/insert_patron";
                    set_all_unselected("on")
                    break;
            }
            toggleForm(document.getElementById("books"), "on");
            toggleForm(document.getElementById("patrons"));
            break;
        default:
            toggleForm(document.getElementById("books"));
            toggleForm(document.getElementById("patrons"));
            break;
    }
}

function showAction() {
    console.log("User invoked action - script working");
}

toggleForm(document.getElementById("books"));
toggleForm(document.getElementById("patrons"));