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

function showGirls(showName, waifu){
    isFound = false;
    let contentTemp = "";
    contentTemp += "<ol>";
    waifu.forEach(girl => {
        let regex = new RegExp(search.value, "mi");
        let isGirlExist = girl.native.match(regex) || girl.romaji?.match(regex) || girl.tags?.match(regex);
        if((girl[database.value + "Link"] != undefined || !hideCheckbox.checked) && (search.value == null || isGirlExist)){
            let link = girl[database.value + "Link"] != undefined ? `<a href="${girl[database.value + "Link"]}" target="_blank">` : getFirstLink(girl);
            let romaji = girl.romaji != undefined ? `<span>${girl.romaji}</span>` : "";
            let image = girl.img != undefined ? `<img src="${girl.img}"/>` : "";
            contentTemp += `${link}<li>${image}<div>${girl.native}</div>${romaji}</li>`;
            contentTemp += link != "" ? "</a>" : "";
            isFound = true;
        }
    })
    if(isFound){
        content += `<p>${showName}</p>` + contentTemp + "</ol>";
    }
}

function showWaifuList(){
    content = "";

    series.forEach(show => {
        if(show.waifu != undefined){
            showGirls(show.name, show.waifu);
        }
    });

    document.querySelector(".container").innerHTML = content;
}

showWaifuList();