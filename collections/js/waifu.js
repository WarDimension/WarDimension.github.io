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
    let regex = new RegExp(search.value, "i");
    contentTemp += "<ol>";
    waifu.forEach(girl => {
        let isGirlExist = girl.native.match(regex) || girl.romaji?.match(regex) || (girl.tags != undefined && JSON.stringify(girl.tags).match(regex));
        if((girl[database.value + "Link"] != undefined || !hideCheckbox.checked) && (search.value == null || isGirlExist || showAll)){
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
    else if((show.name.match(regex) || (show.tags != undefined && JSON.stringify(show.tags).match(regex))) && (!hideCheckbox.checked || (JSON.stringify(waifu).match(new RegExp(database.value + "Link", "m"))))){
        showGirls(show, waifu, true);
    }
}

function showWaifuList(){
    content = "";
    series.forEach(show => {
        if(show.waifu != undefined){
            showGirls(show, show.waifu);
        }
    });
    document.querySelector(".container").innerHTML = content;
    setImageAttribute();
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

showWaifuList();

function setImageAttribute(){
    const img = document.querySelectorAll("img");
    img.forEach(image => {
        let aspectRatio = (image.offsetWidth / image.offsetHeight).toFixed(1);
        image.setAttribute("aspectRatio", aspectRatio);
        image.style = "height: 280px";
    });
    resizeImage();
}

function resizeImage(){
    const img = document.querySelectorAll("img");
    img.forEach(image => {
        if(aspectRatio == NaN){
            setImageAttribute(image.getAttribute("aspectRatio") == NaN);
        }
        let aspectRatio = (image.offsetWidth / image.offsetHeight).toFixed(1);
        image.style = "height: 280px";
        if(aspectRatio != image.getAttribute("aspectRatio")){
            image.style.height = "";
            image.style.width = "460px";
        }
    });
}

window.addEventListener("resize", (e) => {
    resizeImage();
});