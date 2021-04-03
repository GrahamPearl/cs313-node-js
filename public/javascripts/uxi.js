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

const safeExtract = (item) => {
    if (typeof item !== 'undefined') {
        return item;
    } else return "";
}

const safeExtractList = (items, list) => {
    if (typeof items !== 'undefined') {
        list = [];
        for (let [key, item] of Object.entries(items)) {
            list.push(item);
        }
    }
}

/*
if (typeof value.volumeInfo.industryIdentifiers !== 'undefined') {
    let identifiers = value.volumeInfo.industryIdentifiers;
    for (let [key, identify] of Object.entries(identifiers)) {
        if (identifiers[key].type !== 'undefined') {
            if (identifiers[key].type == 'ISBN_13') item.ISBN_13 = identify.identifier;
            if (identifiers[key].type == 'ISBN_10') item.ISBN_10 = identify.identifier;
        }
    }
}

if (typeof items !== 'undefined') {    
    for (let [key, item] of Object.entries(items)) {
        if (items[key].field !== 'undefined') {            
            if (items[key].field == criteria) item.ISBN_10 = item.value;
        }
    }
}
*/

const safeExtractValueOfItem = (items, field, criteria, value) => {
    if (typeof items !== 'undefined') {
        for (let [key, item] of Object.entries(items)) {
            if (items[key][field] !== 'undefined') {
                if (items[key][field] == criteria) return item[value];
            }
        }
    }
}

class UXI extends Object {
    static set_all_in_list_display_as = set_all_in_list_display_as;
    static show_selected = show_selected;
    static toggleForm = toggleForm;
    static safeExtract = safeExtract;
    static safeExtractList = safeExtractList;
    static safeExtractValueOfItem = safeExtractValueOfItem;
}

export {
    UXI
};