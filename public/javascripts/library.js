import { UXI } from './uxi.js';

const doTask = () => {
    let task = document.getElementById("task").value;
    let link = '';
    UXI.set_all_in_list_display_as([
        "search_id",
        "search_title",
        "search_email"        
    ])
    switch (task) {
        case '01': UXI.show_selected("search_id"); break;
        case '02': UXI.show_selected("search_title"); break;
        case '03': UXI.show_selected("search_email"); break;        
        default:
            break;
    }
}

class UXHandler extends Object {
    static doTask = doTask;
}

document.getElementById("task").onclick =  function() {  
  UXHandler.doTask();
};
