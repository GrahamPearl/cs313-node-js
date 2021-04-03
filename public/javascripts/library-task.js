import { UXI } from './uxi.js';

const doTask = () => {
    let task = document.getElementById("task").value;
    let link = '';
    UXI.set_all_in_list_display_as([
        "search_01",
        "search_02",
        "search_03"        
    ])
    switch (task) {
        case '01': UXI.show_selected("search_01"); break;
        case '02': UXI.show_selected("search_02"); break;
        case '03': UXI.show_selected("search_03"); break;        
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
