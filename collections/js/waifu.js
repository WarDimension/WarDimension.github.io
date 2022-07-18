const search = document.querySelector(".search");
const database = document.querySelector(".database");
const hideCheckbox = document.querySelector(".hide");
let content = "";

function showGirls(waifu){
    content += "<ol>";
    waifu.forEach(girl => {
        if(girl[database.value] != undefined || !hideCheckbox.checked){
            let link = girl[database.value] != undefined ? girl[database.value] : girl[Object.keys(girl)[1]];
            let title = girl[database.value + "Title"] != undefined ? girl[database.value + "Title"] : girl.title;
            content += `<a href="${link}" target="_blank"><li>${title}</li></a>`;
        }
    })
    content += "</ol>";
}

function showWaifuList(){
    content = "";

    series.forEach(show => {
        if((search.value == null || JSON.stringify(show).match(new RegExp(search.value, "mi"))) && show.waifu != undefined && (JSON.stringify(show).match(new RegExp(database.value, "m")) || !hideCheckbox.checked)){
            content += `<p>${show.name}</p>`;
            showGirls(show.waifu);
        }
    });

    document.querySelector(".container").innerHTML = content;
}

showWaifuList();