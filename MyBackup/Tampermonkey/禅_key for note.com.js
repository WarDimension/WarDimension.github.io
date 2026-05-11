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

    // -- CONFIGS --
    const conf = {
        "zenModeButtonAlwaysVisible": false,
        "doNOTshowZenModeButton": false,
        "doNOTshowCloseButton": false,
        "doNOTshowAutoCompleteButton": true,
        "doNOTshowAutoCompleteLineButton": true,
        "autoCompleteLineOnEnter": true, // autocomplete with Enter without pressing Shift (caret has to be at the very end)
        "deleteAutoCompleteLineOnBackspace": true,
        "deleteAutoCompleteLineOnDelete": true
    }

    // -- SHORTCUTS --
    // Esc = toggle 禅_mode
    // Tab = autocomplete 1 character
    // Shift+Tab or Shift+Enter = autocomplete entire line

    // -- COLORS --
    // Red = incorrect
    // Yellow = autocomplete
    // Plum = autocomplete that becomes incorrect

    window.isMobile = function(){
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };

    const style = document.createElement("style");
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
            width: ${conf.zenModeButtonAlwaysVisible ? "fit-content" : "300px"};
            height: ${conf.zenModeButtonAlwaysVisible ? "fit-content" : "160px"};
            z-index: 50;
            ${conf.doNOTshowZenModeButton ? "display: none;" : ""}
        }
        .zen-mode{
            position: fixed;
            bottom: ${conf.zenModeButtonAlwaysVisible ? "30" : "-100"}px;
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
        .side-button-container{
            position: absolute;
            top: 30px;
            right: 30px;
            z-index: 300;
        }
        .close-button, .auto-complete-button{
            position: relative;
            width: 35px;
            height: 35px;
            display: flex;
            margin-bottom: 20px;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #707070;
            font-weight: bold;
            font-size: 20px;
            border-radius: 100%;
            border: 2px dashed #adadad;
            user-select: none;
            -moz-user-select: none;
            -webkit-user-drag: none;
            -webkit-user-select: none;
            -ms-user-select: none;
        }
        ${conf.doNOTshowCloseButton ? ".close-button{display: none;}" : ""}
        .close-button:hover{
            color: #f20000;
            border-color: #f20000;
        }
        ${conf.doNOTshowAutoCompleteButton ? ".auto-complete-button{display: none;}" : ""}
        ${conf.doNOTshowAutoCompleteLineButton ? ".auto-complete-line-button{display: none;}" : ".auto-complete-line-button{display: flex;}"}
        .auto-complete-button:hover{
            color: #15ac47;
            border-color: #15ac47;
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
            scroll-padding-top: 80px;
            scroll-padding-bottom: 80px;
            ${window.isMobile() ? "top: 0; height: 100%;" : ""}
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
            ${window.isMobile() ? "display: none;" : ""}
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
            width: calc(100% - 60px);
            min-height: 1em;
            field-sizing: content;
            background: none;
            color: white;
            outline: none;
            resize: none;
            overflow: hidden;
        }
        .typing-check{
            position: relative;
            width: fit-content;
            display: inline;
            color: transparent;
            pointer-events: none;
            z-index: 10;
            white-space: pre-wrap;
        }
        .typing-check::before{
            content: "";
            position: absolute;
            top: 0;
            left: -10px;
            display: block;
            width: 3px;
            height: var(--pseudo-height, 100%);
            background: #707070;
            opacity: 0.3;
        }
        .typing-check span{
            border-bottom: 1.5px solid;
        }
        .tab{
            border-color: #b8860b !important;
        }
        .enter{
            position: relative;
            color: white;
        }
        .tab-enter{
            position: relative;
            color: #b8860b;
        }
        .target-enter{
            position: relative;
            color: #707070;
            opacity: 0.5;
        }
        .enter::after, .tab-enter::after, .target-enter::after{
            content: "↵";
            position: absolute;
            top: -0.2em;
            left: 0;
        }
        .incorrect{
            border-color: #f20000 !important;
        }
        .incorrect-enter{
            color: #f20000;
        }
        .tab.incorrect{
            border-color: #9C3F85 !important;
        }
        .tab-enter.incorrect-enter{
            color: #9C3F85;
        }
        @media screen and (max-width: 680px){
            .typing-container{
                max-width: 100%;
            }
        }
    `;

    document.getElementsByTagName("head")[0].appendChild(style);

    const zenModeContainer = document.createElement("div");
    zenModeContainer.className = "zen-mode-container";

    document.body.appendChild(zenModeContainer);

    const zenMode = document.createElement("div");
    zenMode.className = "zen-mode";
    zenMode.innerHTML = "<p>禅</p><div class='text-block'></div>";

    zenModeContainer.appendChild(zenMode);

    const background = document.createElement("div");
    background.className = "background";

    document.body.appendChild(background);

    const closeButton = document.createElement("div");
    closeButton.className = "close-button";
    closeButton.innerHTML = "<p>X</p><div class='text-block'></div>";

    const autoCompleteButton = document.createElement("div");
    autoCompleteButton.className = "auto-complete-button";
    autoCompleteButton.innerHTML = "<p>⇒</p><div class='text-block'></div>";

    const autoCompleteLineButton = document.createElement("div");
    autoCompleteLineButton.className = "auto-complete-button auto-complete-line-button";
    autoCompleteLineButton.innerHTML = "<p>⏎</p><div class='text-block'></div>";

    const sideButtonContainer = document.createElement("div");
    sideButtonContainer.className = "side-button-container";

    sideButtonContainer.appendChild(closeButton);
    sideButtonContainer.appendChild(autoCompleteButton);
    sideButtonContainer.appendChild(autoCompleteLineButton);

    background.appendChild(sideButtonContainer);

    const typingContainer = document.createElement("div");
    typingContainer.className = "typing-container";

    background.appendChild(typingContainer);

    const typingTarget = document.createElement("div");
    typingTarget.className = "typing-target";

    const typingCheck = document.createElement("div");
    typingCheck.className = "typing-check";
    typingCheck.innerHTML = "&#8203;";

    const typingInput = document.createElement("textarea");
    typingInput.className = "typing-input";
    typingInput.spellcheck = false;

    typingInput.setAttribute('data-gramm', 'false');
    typingInput.setAttribute('data-gramm_editor', 'false');
    typingInput.setAttribute('data-enable-grammarly', 'false');

    typingContainer.appendChild(typingInput);
    typingContainer.appendChild(typingCheck);
    typingContainer.appendChild(typingTarget);

    let hrefTemp = "";

    zenMode.addEventListener("click", () => {
        background.style.zIndex = "100";
        background.style.opacity = "1";
        background.style.width = "100%";
        background.style.left = "0";

        const textElements = document.querySelectorAll(".o-noteContentHeader__title, .note-common-styles__textnote-body");
        let text = ""
        if(textElements.length > 0){
            text = `${textElements[0].innerText}\n\n${textElements[1].innerText}`;
        }

        const currentHref = location.href;
        if(currentHref != hrefTemp){
            typingInput.value = "";
            typingInput.style.height = "auto";
            typingCheck.innerHTML = "&#8203;";
            hrefTemp = currentHref;
            typingTarget.innerHTML = text != "" ? wrapInSpan(text) : wrapInSpan("にゃにゃめにゃにゃじゅうにゃにゃどのにゃらびでにゃくにゃくいにゃにゃくにゃにゃはんにゃにゃだいにゃんにゃくにゃらべてにゃがにゃがめ");
        }

        setTimeout(() => { document.body.style.overflow = "hidden"; }, 300);

        typingInput.focus();
    });

    closeButton.addEventListener("click", () => {
        document.body.style.overflow = "";
        background.style.zIndex = "";
        background.style.opacity = "";
        background.style.width = "";
        background.style.left = "";
    });

    let timer = null;
    function runWhileDown(entireLine = false) {
        autoComplete({ "key": "Tab" }, entireLine);
    }

    function mouseDone(){
        clearInterval(timer);
        timer = null;
    }

    autoCompleteButton.addEventListener("pointerdown", () => {
        if (timer === null) {
            timer = setInterval(runWhileDown, 50);
        }
    });

    autoCompleteButton.addEventListener("pointerup", mouseDone);
    autoCompleteButton.addEventListener("pointerleave", mouseDone);

    autoCompleteLineButton.addEventListener("pointerdown", () => {
        if (timer === null) {
            timer = setInterval(() => runWhileDown(true), 50);
        }
    });

    autoCompleteLineButton.addEventListener("pointerup", mouseDone);
    autoCompleteLineButton.addEventListener("pointerleave", mouseDone);

    background.addEventListener("click", (e) => {
        if(e.target.className == "text-block"){
            typingInput.focus();
            return;
        }

        const rect = typingInput.getBoundingClientRect();

        if (e.target !== typingInput) {

            if (e.clientY < rect.top) {
                typingInput.setSelectionRange(0, 0);
            }

            else if (e.clientY > rect.top) {
                const len = typingInput.value.length;
                typingInput.setSelectionRange(len, len);
            }
        }

        typingInput.focus();
    });

    typingInput.addEventListener("input", (e) => {
        updateTypingCheck(e);
    });

    typingInput.addEventListener("keydown", (e) => {
        if(e.key == "Tab"){
            e.preventDefault();

            const entireLine = e.shiftKey ? true : false;
            autoComplete(e, entireLine);
        }
        else if(e.key == "Enter" && (e.shiftKey || conf.autoCompleteLineOnEnter) && typingTarget.innerText[0] && typingTarget.innerText[0] != "\n" && typingInput.selectionStart == typingInput.value.length){
            e.preventDefault();

            autoComplete({ "key": "Tab" }, true);
        }
        else if((e.key == "Backspace" && conf.deleteAutoCompleteLineOnBackspace) || (e.key == "Delete" && conf.deleteAutoCompleteLineOnDelete)){
            removeAutoComplete(e);
            focusCaret();
        }
        else if ((e.ctrlKey || e.metaKey) && e.key == "z") {
            e.preventDefault();
        }
    });

    window.addEventListener("keydown", (e) => {
        if(e.key == "Escape"){
            if(background.style.zIndex == "100"){
                closeButton.click();
            }
            else{
                zenMode.click();
            }
        }
    });

    function autoComplete(e, entireLine = false){
        if(typingTarget.innerText[0]){
            const line = typingTarget.innerText.match(/^.*(?:\n|$)/);

            typingInput.value += entireLine ? line : typingTarget.innerText[0];
            updateTypingCheck(e);
            setCaretToEnd();
        }
    }

    function removeAutoComplete(e){
        let index = e.key == "Backspace" ? typingInput.selectionStart - 1 : typingInput.selectionStart;
        if(typingInput.selectionStart == typingInput.selectionEnd && typingCheck.children[index] && (typingCheck.children[index].classList.contains("tab") || typingCheck.children[index].classList.contains("tab-enter"))){
            e.preventDefault();

            let input = typingInput.value;
            let stop = false;

            while(typingCheck.children[index] && (typingCheck.children[index].classList.contains("tab") || typingCheck.children[index].classList.contains("tab-enter")) && !stop){
                input = e.key == "Backspace" ? input.slice(0, index) + input.slice(index + 1) : input.slice(0, typingInput.selectionStart) + input.slice(typingInput.selectionStart + 1);
                index += e.key == "Backspace" ? -1 : 1;

                if(typingCheck.children[e.key == "Backspace" ? index : index - 1] && typingCheck.children[e.key == "Backspace" ? index : index - 1].classList.contains("tab-enter")) stop = true;
            }

            index = e.key == "Backspace" ? index + 1 : typingInput.selectionStart;

            typingInput.value = input;

            updateTypingCheck(e);

            typingInput.setSelectionRange(index, index);
        }
    }

    function setCaretToEnd(){
        const len = typingInput.value.length;

        typingInput.blur();
        typingInput.setSelectionRange(len, len);
        typingInput.focus();
    }

    function focusCaret(){
        const start = typingInput.selectionStart;
        const end = typingInput.selectionEnd;

        typingInput.blur();
        typingInput.setSelectionRange(start, end);
        typingInput.focus();
    }

    function wrapInSpan(string){
        const stringSplit = string.replaceAll("\t", "").split("\n");

        for(let i = 0; i < stringSplit.length; i++){
            stringSplit[i] = `${stringSplit[i].split("").map(char => `<span>${char}</span>`).join("")}${i < stringSplit.length - 1 ? "<span class='target-enter'><br></span>" : ""}`;
        }

        return stringSplit == "<span><br></span>" ? "" : stringSplit.join("");
    }

    function updateTypingCheck(e){
        const typingTargetElementsNONE = typingTarget.querySelectorAll("[style*='display: none']");

        if(typingTargetElementsNONE.length > typingInput.value.length){
            const firstIndex = typingInput.value.length;
            const lastIndex = typingTargetElementsNONE.length;

            for(let i = firstIndex; i < lastIndex; i++){
                typingTarget.children[i].style.display = "";
            }
        }

        const stringChange = getStringChange(typingCheck.innerText, typingInput.value + "\u200B");

        if(stringChange.type == "replace" || stringChange.type == "delete"){
            for(let i = stringChange.index; i < stringChange.index + stringChange.removed.length; i++){
                typingCheck.children[stringChange.index].remove();
            }
        }

        if(stringChange.type == "replace" || stringChange.type == "insert"){
            for(let i = 0; i < stringChange.added.length; i++){
                const newSpan = document.createElement("span");
                newSpan.innerText = stringChange.added[i];

                if(e.key == "Tab" || e.inputType == "insertFromPaste"){
                    if(stringChange.added[i] == "\n"){
                        newSpan.classList.add("tab-enter");
                    }
                    else{
                        newSpan.classList.add("tab");
                    }
                }
                else{
                    if(stringChange.added[i] == "\n") newSpan.classList.add("enter");
                }

                typingCheck.insertBefore(newSpan, typingCheck.childNodes[stringChange.index + i]);

                if(typingTarget.children[typingInput.value.length - i - 1]) typingTarget.children[typingInput.value.length - i - 1].style.display = "none";
            }
        }

        for(let i = stringChange.index; i < typingCheck.children.length; i++){
            if((typingTarget.children[i] && typingCheck.children[i].innerHTML != typingTarget.children[i].innerHTML) || i > typingTarget.children.length - 1){
                switch(typingCheck.children[i].innerText){
                    case "\n":
                        typingCheck.children[i].classList.add("incorrect-enter");
                        break;
                    default:
                        typingCheck.children[i].classList.add("incorrect");
                        break;
                }
            }
            else{
                typingCheck.children[i].classList.remove("incorrect-enter");
                typingCheck.children[i].classList.remove("incorrect");
            }
        }

        updateInputSize();
    }

    window.addEventListener("resize", () => {
        updateInputSize();
    });

    function updateInputSize(){
        typingInput.style.height = "0";
        typingInput.style.height = typingInput.scrollHeight + "px";
        typingCheck.style.setProperty("--pseudo-height", typingInput.scrollHeight - 6 + "px");
    }

    function getStringChange(original, updated) {
        let start = 0;

        // 1. Find common prefix
        while (
            start < original.length &&
            start < updated.length &&
            original[start] === updated[start]
        ) {
            start++;
        }

        // 2. Find common suffix
        let endOriginal = original.length - 1;
        let endUpdated = updated.length - 1;

        while (
            endOriginal >= start &&
            endUpdated >= start &&
            original[endOriginal] === updated[endUpdated]
        ) {
            endOriginal--;
            endUpdated--;
        }

        const removed = original.slice(start, endOriginal + 1);
        const added = updated.slice(start, endUpdated + 1);

        // 3. Classify
        let type;
        if (removed && added) {
            type = "replace";
        } else if (!removed && added) {
            type = "insert";
        } else if (removed && !added) {
            type = "delete";
        } else {
            type = "same";
        }

        return {
            type,
            index: start,
            removed,
            added
        };
    }
})();