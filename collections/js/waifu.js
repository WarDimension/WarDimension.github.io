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

function showGirls(show, waifu, showAll = false){
    isFound = false;
    let contentTemp = "";
    let regex = new RegExp(search.value, "mi");
    contentTemp += "<ol>";
    waifu.forEach(girl => {
        let isGirlExist = girl.native.match(regex) || girl.romaji?.match(regex) || girl.tags?.match(regex);
        if(((girl[database.value + "Link"] != undefined || !hideCheckbox.checked) && (search.value == null || isGirlExist)) || showAll){
            let link = girl[database.value + "Link"] != undefined ? `<a href="${girl[database.value + "Link"]}" target="_blank">` : getFirstLink(girl);
            let romaji = girl.romaji != undefined ? `<span>${girl.romaji}</span>` : "";
            let image = girl.img != undefined ? `<img src="${girl.img}"/>` : "";
            contentTemp += `${link}<li>${image}<div>${girl.native}</div>${romaji}</li>`;
            contentTemp += link != "" ? "</a>" : "";
            isFound = true;
        }
    })
    if(isFound){
        content += `<p>${show.name}</p>` + contentTemp + "</ol>";
    }
    else if(show.name.match(regex) || (show.tags != undefined && JSON.stringify(show.tags).match(regex))){
        showGirls(show, waifu, true);
    }
}

function showWaifuList(){
    content = "";
    let regex = new RegExp(search.value, "mi");

    series.forEach(show => {
        if(show.waifu != undefined){
            showGirls(show, show.waifu);
        }
    });

    document.querySelector(".container").innerHTML = content;
}

showWaifuList();