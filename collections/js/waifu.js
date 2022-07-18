const search = document.querySelector(".search");
const database = document.querySelector(".database");
const hideCheckbox = document.querySelector(".hide");
let content = "";

function showListItems(list){
    content += "<ol>";
    list.forEach(item => {
        if(item[database.value] != undefined || !hideCheckbox.checked){
            let link = item[database.value] != undefined ? item[database.value] : item[Object.keys(item)[1]];
            let title = item[database.value + "Title"] != undefined ? item[database.value + "Title"] : item.title;
            content += `<a href="${link}" target="_blank"><li>${title}</li></a>`;
        }
    })
    content += "</ol>";
}

function showList(){
    content = "";

    series.forEach(show => {
        if((search.value == null || JSON.stringify(show).match(new RegExp(search.value, "mi"))) && (JSON.stringify(show).match(new RegExp(database.value, "m")) || !hideCheckbox.checked)){
            content += `<p>${show.name}</p>`;
            showListItems(show.list);
            if(show.alt != undefined){
                content += "<span>Alternative</span>";
                showListItems(show.alt);
            }
        }
    });

    document.querySelector(".container").innerHTML = content;
}

showList();