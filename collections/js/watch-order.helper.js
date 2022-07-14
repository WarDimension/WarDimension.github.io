const template = document.querySelector("template");

let index = 0;

function addList(){
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

    document.querySelector(".list-container").append(list);
}

addList();

function removeList(removeButton){
    removeButton.parentElement.remove();
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
    const listWrapper = document.querySelectorAll(".list-wrapper");
    result.value = "";
    result.value +=
`
    {
        "name": "${name.value}"${tags.value != "" ? `,
        "tags": ${JSON.stringify(tags.value.split("|"))}` : ""},
        "list": [
            ${list(listWrapper)}
        ]
    },`;
}

updateResult();