// ==UserScript==
// @name         Gamehag TV Zone Autoplay
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Autoplay TV Zone ads on Gamehag
// @author       WarDimension
// @match        https://gamehag.com/tv-zone
// @icon         https://www.google.com/s2/favicons?domain=gamehag.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    setTimeout(function () {
        document.querySelector(".video__play").click();
    }, 5000);

    const result = document.querySelector(".result");
    const preroll = document.querySelector("#preroll");

    //Banner
    const prerollObserver = new MutationObserver(function(mutationList){
        for(let mutation of mutationList){
            setTimeout(function () {
                const cpmsvideoclosebanner = document.querySelector(".cpmsvideoclosebanner");
                if(cpmsvideoclosebanner != null){
                    cpmsvideoclosebanner.click();
                }
            }, 5000);
        }
    });

    //Result
    const observer = new MutationObserver(function(mutationList){
        if(result.innerHTML.includes("You’ve reached the maximum daily limit of points earned on TV Zone")){
            observer.disconnect();
            prerollObserver.disconnect();
        }
        else{
            for(let mutation of mutationList){
                setTimeout(function () {
                    if(result.className == "result is-visible"){
                        document.querySelector(".result__primary").click();
                    }
                }, 5000);
            }
        }
    });

    observer.observe(result, {
        attributes: true,
        childList: true,
        subtree: true
    });

    prerollObserver.observe(preroll, {
        attributes: true,
        childList: true,
        subtree: true
    });
})();