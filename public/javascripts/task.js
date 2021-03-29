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

function toggleForm(item, status = "off") {
    console.log("Adjusting item: "+item);
    if (status == "on") {
        item.style.display = "grid"        
    } else {
        item.style.display = "none";
    }
}

function doTask() {
    let task = document.getElementById("task").value;
    let link = '';
    switch (task) {
        case '01': 
        case '02': 
        case '03':
        case '04':
        case '05':
            link = document.getElementById('patrons');
            switch (task) {
                case '01' : link.action = "/API/find_patrons_all"; break;
                case '02' : link.action = "/API/find_patron_by_id"; break;
                case '03' : link.action = "/API/find_patron_by_last"; break;
                case '04' : link.action = "/API/find_patron_by_first"; break;
                case '05' : link.action = "/API/insert_patron"; break;
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
                case '06' : link.action = "/API/find_books_all"; break;
                case '07' : link.action = "/API/find_book_by_isbn"; break;
                case '08' : link.action = "/API/find_book_by_author"; break;
                case '09' : link.action = "/API/find_book_by_title"; break;
                case 'q0' : link.action = "/API/insert_patron"; break;
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