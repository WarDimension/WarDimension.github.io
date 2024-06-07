// ==UserScript==
// @name         Duolingo Random Kanji Practice
// @namespace    http://tampermonkey.net/
// @version      2024-06-02
// @description  Duolingo will take over the world!
// @author       WarDimension
// @match        https://www.duolingo.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=duolingo.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    function randomPractice(){
        let practiceButtons = document.querySelectorAll("._2kh-n > a");
        let randomNumber = Math.floor(Math.random() * practiceButtons.length);
        practiceButtons[randomNumber].click();
    }

    let injectComplete = false;

    const observer = new MutationObserver(function(mutationList){
        for(let mutation of mutationList){
            const practiceText = root.querySelector("._36de1");
            if(practiceText){
                if(practiceText.innerHTML.includes("Kanji!") && !injectComplete){
                    const randomButton = document.createElement("div");
                    randomButton.classList.add("aOH5N", "_1RpiQ");
                    randomButton.id = "random-kanji";
                    randomButton.innerHTML = "<div class='_2kh-n _3TNjX _1M9iF _36g4N _2YF0P'>RANDOM PRACTICE</div>";
                    randomButton.style = "border: none; margin: auto";
                    randomButton.addEventListener("click", randomPractice, false);
                    insertAfter(practiceText, randomButton);
                    injectComplete = true;
                }
                else if(!practiceText.innerHTML.includes("Kanji!") && injectComplete){
                    const randomButton = document.querySelector("#random-kanji");
                    randomButton.remove();
                    injectComplete = false;
                }
            }
            else{
                injectComplete = false;
            }
        }
    });

    const root = document.querySelector("#root");

    observer.observe(root, {
        childList: true,
        subtree: true
    });
})();