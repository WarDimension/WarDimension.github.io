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
            z-index: 1;
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
        }
        .typing-container::before,
        .typing-container::after{
            content: "";
            position: fixed;
            width: 100%;
            left: 0;
            height: 20px;
            pointer-events: none;
        }
        .typing-container::before{
            top: 50px;
            background: linear-gradient(to bottom, rgba(27, 27, 27, 1), rgba(27, 27, 27, 0));
        }
        .typing-container::after{
            bottom: 50px;
            background: linear-gradient(to top, rgba(27, 27, 27, 1), rgba(27, 27, 27, 0));
        }
        .typing-input{
            position: absolute;
            top: 200px;
            left: 0;
            width: 100%;
            padding: 0 30px 0 30px;
            color: transparent;
            outline: none;
            caret-color: white;
            pointer-events: none;
        }
        .typing-check{
            position: absolute;
            left: 0;
            top: 200px;
            width: calc(100% + 1px);
            padding: 0 30px 0 30px;
            display: inline;
            color: white;
            pointer-events: none;
        }
        .typing-check span{
            background: #1b1b1b;
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

    typingContainer.appendChild(typingTarget);

    let typingCheck = document.createElement("div");
    typingCheck.className = "typing-check";

    let typingInput = document.createElement("div");
    typingInput.className = "typing-input";
    typingInput.contentEditable = true;

    typingInput.setAttribute('data-gramm', 'false');
    typingInput.setAttribute('data-gramm_editor', 'false');
    typingInput.setAttribute('data-enable-grammarly', 'false');

    zenMode.addEventListener("click", () => {
        background.style.zIndex = "100";
        background.style.opacity = "1";
        background.style.width = "100%";
        background.style.left = "0";

        let textBody = document.querySelector(".note-common-styles__textnote-body");

        typingTarget.innerText = textBody != null ? textBody.innerText : "にゃにゃめにゃにゃじゅうにゃにゃどのにゃらびでにゃくにゃくいにゃにゃくにゃにゃはんにゃにゃだいにゃんにゃくにゃらべてにゃがにゃがめ";
        typingContainer.appendChild(typingCheck);
        typingContainer.appendChild(typingInput);

        setTimeout(() => { document.body.style.overflow = "hidden"; }, 300);
    });

    closeButton.addEventListener("click", () => {
        document.body.style.overflow = "";
        background.style.zIndex = "";
        background.style.opacity = "";
        background.style.width = "";
        background.style.left = "";
    });

    background.addEventListener("click", (e) => {
        setCaretToEnd(typingInput);
    });

    typingInput.addEventListener("input", () => {
        updateTypingCheck();
        scrollCaretIntoView();
    });

    typingInput.addEventListener("keydown", (e) => {
        if(e.key == "ArrowUp" || e.key == "ArrowDown" || e.key == "ArrowLeft" || e.key == "ArrowRight"){
            scrollCaretIntoView();
        }
    });

    function wrapInSpan(el){
        let elSplit = el.innerText.replace(/\n\n/g, "\n").split("\n");

        for(let i = 0; i < elSplit.length; i++){
            switch(elSplit[i]){
                case "":
                    elSplit[i] = "<br>"
                    break;
                default:
                    elSplit[i] = `<p>${elSplit[i].split("").map(char => { return char === "\n" ? "<br>" : `<span>${char}</span>`; }).join("")}</p>`;
                    break;
            }
        }

        return elSplit.join("");
    }

    function updateTypingCheck(){
        let typingTargetSplit = typingTarget.innerText.split("\n");

        typingCheck.innerHTML =　wrapInSpan(typingInput);

        let typingCheckElements = typingCheck.querySelectorAll("p, br");

        for(let i = 0; i < typingCheckElements.length; i++){
            if(typingCheckElements[i].tagName != "br" && typingTargetSplit[i]){
                let typingCheckSpan = typingCheckElements[i].querySelectorAll("span");
                for(let j = 0; j < typingCheckSpan.length; j++){
                    if(typingTargetSplit[i][j] != typingCheckSpan[j].innerText){
                        typingCheckSpan[j].style.color = "#f20000";
                    }
                }
            }
        }
    }

    function setCaretToEnd(el){
        el.focus();

        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        scrollCaretIntoView();
    }

    function scrollCaretIntoView(){
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const span = document.createElement("span");

        span.innerHTML = "&#8203;";
        range.insertNode(span);

        span.scrollIntoView({ block: "center" });

        span.parentNode.removeChild(span);
    }
})();