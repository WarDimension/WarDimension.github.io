// ==UserScript==
// @name         AniList Custom Filter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Custom filter for AniList search
// @author       WarDimension
// @match        https://anilist.co/search/anime
// @icon         https://www.google.com/s2/favicons?domain=anilist.co
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    const WDContainer = document.createElement("div");
    WDContainer.classList.add("wd-container");

    WDContainer.innerHTML = `
        <label class="wd-label" for="Watching"><input id="Watching" class="wd-checkbox" type="checkbox" checked/>Watching</label>
        <label class="wd-label" for="Planning"><input id="Planning" class="wd-checkbox" type="checkbox" checked/>Plan to watch</label>
        <label class="wd-label" for="Completed"><input id="Completed" class="wd-checkbox" type="checkbox" checked/>Completed</label>
        <label class="wd-label" for="Rewatching"><input id="Rewatching" class="wd-checkbox" type="checkbox" checked/>Rewatching</label>
        <label class="wd-label" for="Paused"><input id="Paused" class="wd-checkbox" type="checkbox" checked/>Paused</label>
        <label class="wd-label" for="Dropped"><input id="Dropped" class="wd-checkbox" type="checkbox" checked/>Dropped</label>
    `;

    const secondaryFilters = document.querySelector(".secondary-filters");
    secondaryFilters.parentNode.insertBefore(WDContainer, secondaryFilters);

    const WDStyle = document.createElement("style");
    WDStyle.innerHTML = `
        .wd-container{
        background: #fbfbfb;
        color: #adc0d2;
        font-weight: bold;
        border-radius: 6px;
        padding: 8px 20px;
        user-select: none;
        width: fit-content;
        margin: auto;
        margin-bottom: 20px;
        box-shadow: 0 14px 30px rgba(var(--color-shadow-blue),.1),0 4px 4px rgba(var(--color-shadow-blue),.04);
    }
    .wd-checkbox{
        margin-right: 10px;
        opacity: .5;
        cursor: pointer;
    }
    .wd-label{
        display: inline-block;
        margin: 5px 10px;
        cursor: pointer;
    }`;

    document.head.appendChild(WDStyle);

    const WDCheckbox = document.querySelectorAll(".wd-checkbox");

    let WDFilter = [];

    WDCheckbox.forEach(checkbox => {
        checkbox.addEventListener("change", e => {
            updateWDFilter();
        });
    });

    function updateCards(query, isVisible){
        const statuses = document.querySelectorAll(query);
        if(isVisible){
            statuses.forEach(status => {
                status.parentElement.parentElement.style.position = "";
                status.parentElement.parentElement.style.left = "";
            });
        }
        else{
            statuses.forEach(status => {
                status.parentElement.parentElement.style.position = "absolute";
                status.parentElement.parentElement.style.left = "-500px";
            });
        }
    }

    function updateWDFilter(){
        WDFilter = [];
        WDCheckbox.forEach(checkbox => {
            if(checkbox.checked){
                updateCards(`[status="${checkbox.id}"]`, true);
            }
            else{
                updateCards(`[status="${checkbox.id}"]`, false);

                WDFilter.push(`[status="${checkbox.id}"]`);
            }
        });
    }

    const observer = new MutationObserver(function(mutationList){
        for(let mutation of mutationList){
            if(mutation.type == "childList"){
                updateCards(WDFilter.join(","), false);
            }
        }
    });

    const container = document.querySelector(".container");

    observer.observe(container, {
        childList: true,
        subtree: true
    });
})();