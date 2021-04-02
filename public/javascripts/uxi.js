const set_all_in_list_display_as = (items, status = "off") => {
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

const show_selected = (value) => {
    let els = document.getElementsByClassName(value);
    [].forEach.call(els, function (el) {
        el.style.display = "grid";
    });
}

const toggleForm = (item, status = "off") => {
    if (status == "on") {
        item.style.display = "grid"
    } else {
        item.style.display = "none";
    }
}

class UXI extends Object {
    static set_all_in_list_display_as = set_all_in_list_display_as;
    static show_selected = show_selected;
    static toggleForm = toggleForm;
}

export { UXI };