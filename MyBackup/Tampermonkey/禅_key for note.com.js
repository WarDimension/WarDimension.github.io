// ==UserScript==
// @name         禅_key for note.com
// @namespace    http://tampermonkey.net/
// @version      2026-04-05
// @description  try to take over the world!
// @author       WarDimension
// @match        https://note.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=note.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    let style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = `
        ::-webkit-scrollbar{
            width: 5px;
            cursor: default;
        }
        ::-webkit-scrollbar-thumb{
            background: #666;
            cursor: default;
        }
        ::-webkit-scrollbar-thumb:hover{
            background: #444;
        }
        .text-block{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .zen-mode-container{
            position: fixed;
            left: 50%;
            transform: translateX(-50%);
            bottom: 0;
            width: 300px;
            height: 160px;
            z-index: 50;
        }
        .zen-mode{
            position: fixed;
            bottom: -100px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 100px;
            border-radius: 100%;
            border: 2px dashed #adadad;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 32px;
            margin: auto;
            background: white;
            user-select: none;
            -moz-user-select: none;
            -webkit-user-drag: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            transition: all 0.6s cubic-bezier(.25,.8,.25,1.1);
        }
        .zen-mode-container:hover .zen-mode{
            bottom: 30px;
        }
        .zen-mode:hover{
            background: #1b1b1b;
            color: #707070;
            border-color: white;
        }
        .close-button{
            position: absolute;
            top: 30px;
            right: 30px;
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #707070;
            font-weight: bold;
            font-size: 20px;
            border-radius: 100%;
            border: 2px dashed #adadad;
            z-index: 300;
        }
        .close-button:hover{
            color: #f20000;
            border-color: #f20000;
        }
        .background{
            position: fixed;
            top: 0;
            left: 50%;
            width: 0;
            height: 100%;
            background: #1b1b1b;
            z-index: -100;
            opacity: 0;
            transition: all 0.6s cubic-bezier(.25,.8,.25,1.1);
        }
        .typing-container{
            position: relative;
            margin: auto;
            top: 50px;
            width: fit-content;
            max-width: calc(100% - 200px);
            height: calc(100% - 100px);
            padding: 200px 30px 200px 30px;
            color: #707070;
            user-select: none;
            -moz-user-select: none;
            -webkit-user-drag: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            cursor: text;
            overflow-x: hidden;
            overflow-y: scroll;
            scroll-padding-top: 20px;
            scroll-padding-bottom: 20px;
        }
        .typing-container::before,
        .typing-container::after{
            content: "";
            position: fixed;
            width: 100%;
            left: 0;
            height: 20px;
            pointer-events: none;
            z-index: 200;
        }
        .typing-container::before{
            top: 50px;
            background: linear-gradient(to bottom, rgba(27, 27, 27, 1), rgba(27, 27, 27, 0));
        }
        .typing-container::after{
            bottom: 50px;
            background: linear-gradient(to top, rgba(27, 27, 27, 1), rgba(27, 27, 27, 0));
        }
        .typing-target{
            position: relative;
            display: inline;
            z-index: 10;
        }
        .typing-input{
            position: absolute;
            top: 200px;
            left: 0;
            margin: 0 30px 0 30px;
            min-width: 1px;
            max-width: 100%;
            min-height: 1em;
            field-sizing: content;
            color: white;
            outline: none;
            resize: none;
        }
        .typing-check{
            position: relative;
            width: fit-content;
            display: inline;
            color: transparent;
            pointer-events: none;
            z-index: 10;
        }
        .typing-target p, .typing-check p{
            display: inline;
        }
    `;

    document.getElementsByTagName("head")[0].appendChild(style);

    let zenModeContainer = document.createElement("div");
    zenModeContainer.className = "zen-mode-container";

    document.body.appendChild(zenModeContainer);

    let zenMode = document.createElement("div");
    zenMode.className = "zen-mode";
    zenMode.innerHTML = "<p>禅</p><div class='text-block'></div>";

    zenModeContainer.appendChild(zenMode);

    let background = document.createElement("div");
    background.className = "background";

    document.body.appendChild(background);

    let closeButton = document.createElement("div");
    closeButton.className = "close-button";
    closeButton.innerHTML = "<p>X</p><div class='text-block'></div>";

    background.appendChild(closeButton);

    let typingContainer = document.createElement("div");
    typingContainer.className = "typing-container";

    background.appendChild(typingContainer);

    let typingTarget = document.createElement("div");
    typingTarget.className = "typing-target";

    let typingCheck = document.createElement("div");
    typingCheck.className = "typing-check";

    let typingInput = document.createElement("textarea");
    typingInput.className = "typing-input";

    typingInput.setAttribute('data-gramm', 'false');
    typingInput.setAttribute('data-gramm_editor', 'false');
    typingInput.setAttribute('data-enable-grammarly', 'false');

    zenMode.addEventListener("click", () => {
        background.style.zIndex = "100";
        background.style.opacity = "1";
        background.style.width = "100%";
        background.style.left = "0";

        let textBody = document.querySelector(".note-common-styles__textnote-body");

        typingTarget.innerHTML = textBody != null ? wrapInSpan(textBody.innerText) : wrapInSpan("にゃにゃめにゃにゃじゅうにゃにゃどのにゃらびでにゃくにゃくいにゃにゃくにゃにゃはんにゃにゃだいにゃんにゃくにゃらべてにゃがにゃがめ");
        typingContainer.appendChild(typingInput);
        typingContainer.appendChild(typingCheck);
        typingContainer.appendChild(typingTarget);

        setTimeout(() => { document.body.style.overflow = "hidden"; }, 300);
    });

    closeButton.addEventListener("click", () => {
        document.body.style.overflow = "";
        background.style.zIndex = "";
        background.style.opacity = "";
        background.style.width = "";
        background.style.left = "";
    });

    typingContainer.addEventListener("click", (e) => {
        typingInput.focus();
        const rect = typingInput.getBoundingClientRect();

        // Check if the click was outside the textarea
        if (event.target !== typingInput) {

            // 1. Click was ABOVE the textarea
            if (event.clientY < rect.top) {
                typingInput.setSelectionRange(0, 0);
            }

            // 2. Click was BELOW the textarea
            else if (event.clientY > rect.top) {
                const len = typingInput.value.length;
                typingInput.setSelectionRange(len, len);
            }
        }
    });

    typingInput.addEventListener("input", () => {
        updateTypingCheck();
        typingInput.focus();
    });

    function wrapInSpan(string){
        let stringSplit = string.split("\n");

        for(let i = 0; i < stringSplit.length; i++){
            stringSplit[i] = `${stringSplit[i].split("").map(char => { return char === "\n" ? "<br>" : `<span>${char}</span>`; }).join("")}${i < stringSplit.length - 1 ? "<span style='opacity: 0.5'>↵<br></span>" : ""}`;
        }

        return stringSplit == "<span><br></span>" ? "" : stringSplit.join("");
    }

    function updateTypingCheck(){
        let typingTargetElements = typingTarget.querySelectorAll("span");

        let typingCheckString = "";

        for(let i = 0; i < typingTargetElements.length; i++){
            typingTargetElements[i].style.display = typingInput.value[i] ? "none" : "";

            if(typingInput.value[i]){
                switch(typingInput.value[i]){
                    case typingTargetElements[i].innerText:
                        typingCheckString += typingInput.value[i] == "\n" ? "<span style='color: #707070; opacity: 0.5'>↵<br></span>" : `<span>${typingInput.value[i]}</span>`;
                        break;
                    default:
                        typingCheckString += typingInput.value[i] == "\n" ? "<span style='color: #707070; opacity: 0.5; text-decoration: underline; text-decoration-color: #f20000'>↵<br></span>" : `<span style='text-decoration: underline; text-decoration-color: #f20000'>${typingInput.value[i]}</span>`;
                        break;
                }
            }
        }

        typingCheck.innerHTML = typingCheckString;
    }
})();