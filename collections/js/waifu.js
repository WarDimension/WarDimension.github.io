const search = document.querySelector(".search");
const database = document.querySelector(".database");
const hideCheckbox = document.querySelector(".hide");
let content = "";

function getFirstLink(girl){
    let keys = Object.keys(girl);
    let link = "";

    keys.forEach(key =>{
        if(key.includes("Link") && link == ""){
            link = `<a href="${girl[key]}" target="_blank">`;
        }
    });

    return link;
}

function showGirls(waifu){
    content += "<ol>";
    waifu.forEach(girl => {
        if((girl[database.value + "Link"] != undefined || !hideCheckbox.checked) && (search.value == null || JSON.stringify(girl).match(new RegExp(search.value, "mi")))){
            let link = girl[database.value + "Link"] != undefined ? `<a href="${girl[database.value + "Link"]}" target="_blank">` : getFirstLink(girl);
            let romaji = girl.romaji != undefined ? `<span>${girl.romaji}</span>` : "";
            let image = girl.img != undefined ? `<img src="${girl.img}"/>` : "";
            content += `${link}<li>${image}<div>${girl.native}</div>${romaji}</li>`;
            content += link != "" ? "</a>" : "";
        }
    })
    content += "</ol>";
}

function showWaifuList(){
    content = "";

    series.forEach(show => {
        if((search.value == null || JSON.stringify(show).match(new RegExp(search.value, "mi"))) && show.waifu != undefined && (JSON.stringify(show.waifu).match(new RegExp(database.value, "m")) || !hideCheckbox.checked)){
            content += `<p>${show.name}</p>`;
            showGirls(show.waifu);
        }
    });

    document.querySelector(".container").innerHTML = content;
}

showWaifuList();