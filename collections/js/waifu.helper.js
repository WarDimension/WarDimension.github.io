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

function getDetails(item){
    let details = "";
    const detailsElement = item.querySelectorAll("input");
    if(detailsElement.length > 0){
        let i = 0;
        detailsElement.forEach(detail => {
            let value = detail.className == "tags" ? JSON.stringify(detail.value.split("|")) : `"${detail.value.replace(/(\[img\]|\[\/img\])/g, "")}"`;
            if(value != '""' && value != '[""]'){
                details += i == 0 ? "" : `,
                `;
                details += `"${detail.className}": ${value}`;
                i++;
            }
        });
    }

    return details;
}

function list(listWrapper){
    let list = "";
    listWrapper.forEach((item, i) => {
        list +=
`{
                ${getDetails(item)}
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
const wrapList = document.querySelector(".wrap-list");
const tags = document.querySelector(".tags");

function updateResult(){
    const listWrapper = document.querySelectorAll(".list-wrapper");

    result.value = "";
    result.value +=
`${wrapList.checked ? `,
        "waifu": [` : ""}
            ${list(listWrapper)}${wrapList.checked ? `
        ]` : ","}`;
}

updateResult();