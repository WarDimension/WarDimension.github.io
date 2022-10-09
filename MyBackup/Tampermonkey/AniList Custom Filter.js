// ==UserScript==
// @name         AniList Custom Filter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Custom filter for AniList search
// @author       WarDimension
// @match        https://anilist.co/search/anime*
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
        <label class="wd-label" for="None"><input id="None" class="wd-checkbox" type="checkbox" checked/>None</label><br/>
        <label class="wd-left-label">Episodes count:<input class="wd-input" type="number" placeholder="∞" min="1"/>-<input class="wd-input" type="number" placeholder="∞" min="1"/></label>
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
        max-width: 88.5vw;
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
    }
    .wd-left-label{
        display: inline-block;
        margin: 5px 10px;
    }
    .wd-input[type=number]{
        opacity: .5;
        width: 60px;
        font-size: 10pt;
        margin: 0 10px;
        padding: 2px 5px;
    }
    .wd-input[type=number]::placeholder{
        position: relative;
        color: #000;
        font-size: 20pt;
        top: 5px;
    }`;

    document.head.appendChild(WDStyle);

    const WDCheckbox = document.querySelectorAll(".wd-checkbox");
    const WDInput = document.querySelectorAll(".wd-input");

    let WDFilter = [];

    WDCheckbox.forEach(checkbox => {
        checkbox.addEventListener("change", e => {
            updateWDFilter();
        });
    });

    WDInput.forEach(input => {
        input.addEventListener("input", e => {
            updateWDFilter();
        });
    });

    function updateInfo(){
        const infos = document.querySelectorAll(".info:not([episodes-count])");

        infos.forEach(info => {
            let episodeCount = info.innerHTML.match(/(\d+) episodes/) || info.parentElement.innerHTML.match(/Ep (\d+)/);
            episodeCount != null ? info.innerHTML.match("episodes") ? episodeCount = episodeCount[1] : episodeCount = episodeCount[1] - 1 : info.innerHTML.match("Movie") ? episodeCount = 1 : episodeCount = 0;
            info.setAttribute("episodes-count", episodeCount);

            if(info.parentElement.parentElement.querySelector("[status]") == null){
                info.parentElement.parentElement.querySelector(".title").innerHTML += "<div class='list-status' status='None'></div>";
            }
        });
    }

    function updateCards(query, isVisible){
        if(query == ""){
            return;
        }

        const elementsToFilter = document.querySelectorAll(query);
        elementsToFilter.forEach(element => {
            if(isVisible){
                element.parentElement.parentElement.style.position = "";
                element.parentElement.parentElement.style.left = "";
                element.parentElement.parentElement.querySelector(".info").setAttribute("wd-hidden", "false");
            }
            else{
                element.parentElement.parentElement.style.position = "absolute";
                element.parentElement.parentElement.style.left = "-1000px";
                element.parentElement.parentElement.querySelector(".info").setAttribute("wd-hidden", "true");
            }
        });
    }

    let filterIndex = true; //to prevent info filter from checking the already loaded items

    function updateWDInfoFilter(){
        const in1 = WDInput[0].value * 1;
        const in2 = WDInput[1].value * 1;

        if(in1 != 0 || in2 != 0){
            updateInfo();
            const infos = document.querySelectorAll(`.info:not([filterIndex="${filterIndex}"])`);

            let episodeFilter = [];

            infos.forEach(info => {
                const episodesCount = info.getAttribute("episodes-count") * 1;

                if((in1 != 0 && in2 != 0 && ((in1 <= in2 && (episodesCount < in1 || episodesCount > in2)) ||
                                             (in1 > in2 && (episodesCount < in2 || episodesCount > in1)))) ||
                  (in2 == 0 && episodesCount < in1) ||
                  (in1 == 0 && episodesCount > in2)){
                    if(!episodeFilter.includes(`[episodes-count="${episodesCount}"]`)){
                        episodeFilter.push(`[episodes-count="${episodesCount}"]`);
                    }
                }

                info.setAttribute("filterIndex", filterIndex);
            });

            updateCards(episodeFilter.join(","), false);
        }
    }

    function updateWDFilter(){
        WDFilter = [];

        filterIndex = !filterIndex;

        WDCheckbox.forEach(checkbox => {
            if(checkbox.checked){
                updateCards(`.list-status[status="${checkbox.id}"]`, true);
            }
            else{
                updateCards(`.list-status[status="${checkbox.id}"]`, false);

                WDFilter.push(`.list-status[status="${checkbox.id}"]`);
            }
        });

        updateWDInfoFilter();
    }

    const observer = new MutationObserver(function(mutationList){
        for(let mutation of mutationList){
            if(mutation.type == "childList"){
                updateCards(WDFilter.join(","), false);
                updateWDInfoFilter();
            }
        }
    });

    const container = document.querySelector(".container");

    observer.observe(container, {
        childList: true,
        subtree: true
    });
})();