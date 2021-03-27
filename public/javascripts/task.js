const { response } = require("express");

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
            urlResponse = "pages/index";
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
    switch (task) {
        case '01': 
        case '02': 
        case '03':
        case '04':
        case '05':
            let link = document.getElementById('patrons');
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