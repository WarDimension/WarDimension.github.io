// ==UserScript==
// @name         AniList Planning Search
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Only show anime with status Planning from the AniList search
// @author       WarDimension
// @match        https://anilist.co/search/*
// @icon         https://www.google.com/s2/favicons?domain=anilist.co
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    const observer = new MutationObserver(function(mutationList){
        for(let mutation of mutationList){
            if(mutation.type == "childList"){
                let completed = document.querySelectorAll("[status]:not([status='Planning'])");

                completed.forEach(anime => {
                    anime.parentElement.parentElement.remove();
                });
            }
        }
    });

    const results = document.querySelector(".results.cover");

    observer.observe(results, {
        childList: true,
        subtree: true
    });
})();