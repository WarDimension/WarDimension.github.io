const template = document.querySelector("template");

let index = 0;

function addList(alt = false){
    const list = template.content.cloneNode(true);

    const toggle = list.querySelectorAll(".toggle");
    const toggleButton = list.querySelectorAll(".toggle-button");

    toggle.forEach(element => {
        element.id = element.id + index;
    });

    toggleButton.forEach(element => {
        element.htmlFor = element.htmlFor + index;
    });

    index++;

    if(alt){
        list.querySelector(".list-wrapper").className += " alt";
        list.querySelector(".list-wrapper").style.backgroundColor = "#e4e4e4";

        document.querySelector(".alt-list-container").append(list);

        return;
    }

    document.querySelector(".list-container").append(list);

    if(document.querySelectorAll(".list-wrapper").length == 1){
        document.querySelector(".remove-list").setAttribute("hidden", "");
    }
    else{
        document.querySelector(".remove-list").removeAttribute("hidden");
    }
}

addList();

function removeList(removeButton){
    removeButton.parentElement.remove();

    if(document.querySelectorAll(".list-wrapper").length == 1){
        document.querySelector(".remove-list").setAttribute("hidden", "");
    }
}

function addTag(){
    if(!tags.value.match(/\|$/) && tags.value != ""){
        tags.value += "|";
    }
    tags.focus();
}

function removeTag(){
    tags.value = tags.value.replace(/((\|([^|]|)+$)|(^[^|]+$))/, "");
    tags.focus();
}

function copyResult(){
    navigator.clipboard.writeText(result.value);
    result.blur();
}

function list(listWrapper){
    let list = "";
    listWrapper.forEach((item, i) => {
        const title = item.querySelector(".title");
        const AniListTitle = item.querySelector(".AniListTitle");
        const MyAnimeListTitle = item.querySelector(".MyAnimeListTitle");
        const AniList = item.querySelector(".AniList");
        const MyAnimeList = item.querySelector(".MyAnimeList");
        const YouTube = item.querySelector(".YouTube");
        list +=
`{
                "title": "${title.value}"${AniListTitle.value != "" ? `,
                "AniListTitle": "${AniListTitle.value}"` : ""}${MyAnimeListTitle.value != "" ? `,
                "MyAnimeListTitle": "${MyAnimeListTitle.value}"` : ""}${AniList.value != "" ? `,
                "AniList": "${AniList.value}"` : ""}${MyAnimeList.value != "" ? `,
                "MyAnimeList": "${MyAnimeList.value}"` : ""}${YouTube.value != "" ? `,
                "YouTube": "${YouTube.value}"` : ""}
            }`;
        if(i < listWrapper.length - 1){
            list +=
`,
            `;
        }
    });

    return list;
}

const result = document.querySelector(".result");
const name = document.querySelector(".name");
const tags = document.querySelector(".tags");

function updateResult(){
    const listWrapper = document.querySelectorAll(".list-wrapper:not(.alt)");
    const listWrapperAlt = document.querySelectorAll(".alt");

    result.value = "";
    result.value +=
`
    {
        "name": "${name.value}"${tags.value != "" ? `,
        "tags": ${JSON.stringify(tags.value.split("|"))}` : ""},
        "list": [
            ${list(listWrapper)}
        ]${listWrapperAlt.length > 0 ? `,
        "alt": [
            ${list(listWrapperAlt)}
        ]` : ""}
    },`;
}

updateResult();