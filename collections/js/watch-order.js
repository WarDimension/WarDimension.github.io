const search = document.querySelector(".search");
const database = document.querySelector(".database");
const hideCheckbox = document.querySelector(".hide");
let content = "";

function getFirstLink(item){
    let keys = Object.keys(item);
    let link = "";

    keys.forEach(key =>{
        if(key.includes("Link") && link == ""){
            link = `<a href="${item[key]}" target="_blank">`;
        }
    });

    return link;
}

function showListItems(list){
    content += "<ol>";
    list.forEach(item => {
        if(item[database.value + "Link"] != undefined || !hideCheckbox.checked){
            let link = item[database.value + "Link"] != undefined ? `<a href="${item[database.value + "Link"]}" target="_blank">` : getFirstLink(item);
            let title = item[database.value + "Title"] != undefined ? item[database.value + "Title"] : item.title;
            content += `${link}<li>${title}</li>`;
            content += link != "" ? "</a>" : "";
        }
    })
    content += "</ol>";
}

function showList(){
    document.querySelector(".container").innerHTML = "";
    let regex = new RegExp(search.value, "mi");
    series.forEach(show => {
        content = "";
        let isShowExist = show.name.match(regex) || (show.tags != undefined && JSON.stringify(show.tags).match(regex) || JSON.stringify(show.list).match(regex));
        if((search.value == null || isShowExist) && (JSON.stringify(show.list).match(new RegExp(database.value + "Link", "m")) || !hideCheckbox.checked)){
            content += `<p>${show.name}</p>`;
            showListItems(show.list);
            if(show.alt != undefined){
                content += "<span>Alternative</span>";
                showListItems(show.alt);
            }
        }
        document.querySelector(".container").innerHTML += content;
    });
}

function url(){
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value){
        vars[key] = value;
    });
    return vars;
}

if(url()["s"]){
    search.value = decodeURI(url()["s"]);
}

showList();