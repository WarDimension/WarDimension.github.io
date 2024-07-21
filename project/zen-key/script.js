const typingData = [
    {
        "text": "{古[ふる]}びたコトバ{繰[く]}り{返[かえ]}しつぶやいてみる\n{伸[の]}ばしたままの{爪[つめ]}{痕[あと]}はほら{消[き]}えないよ",
        "source": "{花[はな]}{残[のこ]}り{月[つき]} by nano.RIPE"
    },
    {
        "text": "にゃにゃめにゃにゃじゅうにゃにゃどのにゃらびでにゃくにゃくいにゃにゃくにゃにゃはんにゃにゃだいにゃんにゃくにゃらべてにゃがにゃがめ",
        "source": "{化[ばけ]}{物[もの]}{語[がたり]}"
    },
    {
        "text": "{斜[なな]}め{七[なな]}{十[じゅう]}{七[なな]}{度[ど]}の{並[なら]}びで{泣[な]}く{泣[な]}く{嘶[いなな]}くナナハン{七[なな]}{台[だい]}{難[なん]}なく{並[なら]}べて{長[なが]}{眺[なが]}め",
        "source": "{早[はや]}{口[くち]}{言[こと]}{葉[ば]}"
    }
];

const typingTarget = document.querySelector(".typing-target");
const flexContainer = document.querySelector(".flex-container");
const typingInput = document.querySelector(".typing-input");
const rawInput = document.querySelector(".raw-input-container");
const source = document.querySelector(".source");
const statsElement = document.querySelector(".stats");
const result = document.querySelector(".result");
const contextMenu = document.querySelector(".context-menu");

function convertText(text){
    const charArray = text.split("");
    let type = "kana base";

    let newSpan = document.createElement("span");
    let newRT = document.createElement("rt");
    let newRuby = document.createElement("ruby");
    let newText = document.createElement("p");

    charArray.forEach(char => {
        newRuby.className = "typing-target-ruby";
        newSpan.setAttribute("data-original", char.replace("\n", "<i class='material-icons'>keyboard_return</i>"));
        switch(char){
            case "{":
                type = "kanji base";
                break;
            case "[":
                const newRP1 = document.createElement("rp");
                newRP1.innerHTML = "(";
                newRuby.appendChild(newRP1);

                type = "kana furigana";
                break;
            case "]":
                newRuby.appendChild(newRT);
                newRT = document.createElement("rt");

                const newRP2 = document.createElement("rp");
                newRP2.innerHTML = ")";
                newRuby.appendChild(newRP2);
                break;
            case "}":
                newRuby.classList.add("kanji");
                newSpan.removeAttribute("data-original");
                newSpan.appendChild(newRuby);
                newText.appendChild(newSpan);
                newSpan = document.createElement("span");
                newRuby = document.createElement("ruby");

                type = "kana base";
                break;
            case "\n":
                newSpan.innerHTML = "<i class='material-icons'>keyboard_return</i>";
                newSpan.className = type;
                newRuby.classList.add("enter");
                newRuby.appendChild(newSpan);
                newSpan = document.createElement("span");
                newSpan.appendChild(newRuby);
                newText.appendChild(newSpan);
                newSpan = document.createElement("span");
                newRuby = document.createElement("ruby");
                newSpan = document.createElement("span");
                newText.appendChild(document.createElement("br"));
                break;
            default:
                newSpan.innerHTML = char;
                newSpan.className = type;
                switch(type){
                    case "kanji base":
                        newRuby.appendChild(newSpan);
                        newSpan = document.createElement("span");
                        newRuby.classList.add(checkCharacterType(char));
                        break;
                    case "kana furigana":
                        if(isFuriganaHidden) newSpan.style.opacity = 0;
                        newRT.appendChild(newSpan);
                        newSpan = document.createElement("span");
                        newRuby.classList.add(checkCharacterType(char));
                        break;
                    default:
                        if(char === " " || char === "　"){
                            newRuby.classList.add("space");
                        }
                        else{
                            newRuby.classList.add(checkCharacterType(char));
                        }
                        newRuby.appendChild(newSpan);
                        newSpan = document.createElement("span");
                        newSpan.appendChild(newRuby);
                        newText.appendChild(newSpan);
                        newSpan = document.createElement("span");
                        newRuby = document.createElement("ruby");
                        break;
                }
                break;
        }
    });

    return newText.innerHTML;
}

let isFuriganaHidden = false;
function toggleFurigana(){
    const furiganaElements = document.querySelectorAll(".furigana");
    furiganaElements.forEach(furigana => {
        switch(isFuriganaHidden){
            case true:
                furigana.removeAttribute("style");
                break;
            default:
                furigana.style.opacity = 0;
                break;
        }
    });
    isFuriganaHidden = !isFuriganaHidden;
}

let isJustHiragana = false;
function toggleJustHiragana(){
    if(stats.state !== state.COMPLETE){
        
    }
    isJustHiragana = !isJustHiragana;
}

const state = {
    "UNSTARTED": "UNSTARTED",
    "TYPING": "TYPING",
    "COMPLETE": "COMPLETE"
}

const statsReset = {
    "keyPressed": 0,
    "lastKPM": 0,
    "peakKPM": 0,
    "avgKPM": 0,
    "persistentCorrect": 0,
    "lastCPM": 0,
    "peakCPM": 0,
    "avgCPM": 0,
    "correctKanji": 0,
    "semiCorrectKanji": 0,
    "totalKanji": 0,
    "correctHiragana": 0,
    "semiCorrectHiragana": 0,
    "totalHiragana": 0,
    "correctKatakana": 0,
    "semiCorrectKatakana": 0,
    "totalKatakana": 0,
    "correctFurigana": 0,
    "totalFurigana": 0,
    "correctLatin": 0,
    "semiCorrectLatin": 0,
    "totalLatin": 0,
    "correctPercentage": 0,
    "progress": 0,
    "totalText": 0,
    "state": state.UNSTARTED
};

let stats = {
    ...statsReset
};

let previousRandom = -1;

function getRandomText(){
    let randomIndex = Math.floor(Math.random() * typingData.length);
    while(randomIndex == previousRandom && typingData.length > 1){
        randomIndex = Math.floor(Math.random() * typingData.length);
    }
    previousRandom = randomIndex;
    typingTarget.innerHTML = convertText(typingData[randomIndex].text);
    source.innerHTML = convertText(typingData[randomIndex].source);
}
getRandomText();

function setStats(){
    stats = {
        ...statsReset
    };

    stats.totalKanji = typingTarget.querySelectorAll(".kanji .kanji").length;
    stats.totalHiragana = typingTarget.querySelectorAll(".hiragana").length;
    stats.totalKatakana = typingTarget.querySelectorAll(".katakana").length;
    stats.totalFurigana = typingTarget.querySelectorAll(".furigana").length;
    stats.totalLatin = typingTarget.querySelectorAll(".latin").length;
    stats.totalText = typingTarget.querySelectorAll(".base").length;
    stats.state = state.UNSTARTED;
}
setStats();

function updateStats(){
    stats.correctKanji = typingTarget.querySelectorAll(".kanji.correct").length;
    stats.semiCorrectKanji = typingTarget.querySelectorAll(".semi-correct .kanji").length;
    stats.correctHiragana = typingTarget.querySelectorAll(".hiragana .correct").length;
    stats.semiCorrectHiragana = typingTarget.querySelectorAll(".hiragana .semi-correct").length;
    stats.correctKatakana = typingTarget.querySelectorAll(".katakana .correct").length;
    stats.semiCorrectKatakana = typingTarget.querySelectorAll(".katakana .semi-correct").length;
    stats.correctFurigana = typingTarget.querySelectorAll(".furigana.correct").length;
    stats.correctLatin = typingTarget.querySelectorAll(".latin .correct").length;
    stats.semiCorrectLatin = typingTarget.querySelectorAll(".latin .semi-correct").length;
    stats.progress = typingTarget.querySelectorAll(".base.correct, .base.semi-correct, .base.incorrect, .semi-correct .base, .semi-incorrect .base").length;
    stats.correctPercentage = computePercentage();

    computeSpeed();
}

let startTime = null;

function startTyping(){
    startTime = new Date();
    stats.state = state.TYPING;
}

function computePersistentCorrect(){
    const progressElements = typingTarget.querySelectorAll(".correct, .incorrect");
    const lastProgress = progressElements[progressElements.length - 1];

    if(lastProgress.classList.contains("correct")){
        stats.persistentCorrect++;
    }
}

function computeSpeed(){
    if(stats.keyPressed == 1) return;

    const elapsedTime = new Date() - startTime;
    const KPM = (stats.keyPressed / elapsedTime) * 60000;
    const CPM = (stats.persistentCorrect / elapsedTime) * 60000;

    const denominator = stats.lastKPM == 0 ? 1 : 2;

    stats.avgKPM = (KPM + stats.lastKPM) / denominator;
    stats.peakKPM = KPM > stats.lastKPM ? KPM : stats.lastKPM;

    stats.avgCPM = (CPM + stats.lastCPM) / denominator;
    stats.peakCPM = CPM > stats.lastCPM ? CPM : stats.lastCPM;

    stats.lastKPM = KPM;
    stats.lastCPM = CPM;
}

function computePercentage(){
    const total = ((stats.correctKanji + stats.correctHiragana + stats.correctKatakana) / (stats.totalKanji + stats.totalHiragana + stats.totalKatakana)) + (((stats.correctFurigana + stats.semiCorrectHiragana + stats.semiCorrectKatakana) / (stats.totalFurigana + stats.totalHiragana + stats.totalKatakana)) / 2);
    const totalPercentageRound = Math.round(((total * 100) + Number.EPSILON) * 100) / 100;

    if(isNaN(totalPercentageRound)) return 0;

    return totalPercentageRound;
}

function updateLiveStats(){
    updateStats();

    const avgCPM = Math.round(stats.avgCPM);
    const avgKPM = Math.round(stats.avgKPM);
    const correctPercentage = Math.round(stats.correctPercentage);

    statsElement.innerHTML = `${stats.progress}/${stats.totalText} ${correctPercentage}% ${avgCPM}<span class="unit">CMP</span> ${avgKPM}<span class="unit">KPM</span>`;

    if(stats.progress == stats.totalText && stats.correctPercentage != 100) statsElement.innerHTML = "fix your mistake or press <i class='material-icons'>keyboard_return</i> to complete";
}
updateLiveStats();

function countSmallKana(str){
    const smallKanaRegex = /[ぁぃぅぇぉゃゅょっァィゥェォャュョッ]/g;
    const matches = str.match(smallKanaRegex);
    return matches ? matches.length : 0;
}

function typingComplete(){
    startTime = null;
    typingInput.value = "";

    typingInput.setAttribute("hidden", "");
    typingTarget.setAttribute("hidden", "");
    statsElement.setAttribute("hidden", "");
    source.setAttribute("hidden", "");

    result.removeAttribute("hidden");

    const avgCPM = Math.round(stats.avgCPM);
    const avgDecimalCPM = Math.round((stats.avgCPM + Number.EPSILON) * 100) / 100;

    const avgKPM = Math.round(stats.avgKPM);
    const avgDecimalKPM = Math.round((stats.avgKPM + Number.EPSILON) * 100) / 100;

    const decimalLastCPM = Math.round((stats.lastCPM + Number.EPSILON) * 100) / 100;
    const decimalLastKPM = Math.round((stats.lastKPM + Number.EPSILON) * 100) / 100;

    const decimalPeakCPM = Math.round((stats.peakCPM + Number.EPSILON) * 100) / 100;
    const decimalPeakKPM = Math.round((stats.peakKPM + Number.EPSILON) * 100) / 100;

    const CPM = `<span title="Last: ${decimalLastCPM}, Peak: ${decimalPeakCPM}, AVG: ${avgDecimalCPM}">${avgCPM}<span class="unit">CMP</span></span>`;
    const KPM = `<span title="Last: ${decimalLastKPM}, Peak: ${decimalPeakKPM}, AVG: ${avgDecimalKPM}">${avgKPM}<span class="unit">KPM</span></span>`;

    const correctPercentage = Math.round(stats.correctPercentage);
    const decimalCorrectPercentage = Math.round((stats.correctPercentage + Number.EPSILON) * 100) / 100;

    const percentage = `<span class="percentage" title="${decimalCorrectPercentage}%">${correctPercentage}%</span>`;

    const kanji = stats.totalKanji == 0 ? "" : `<span title="correct: ${stats.correctKanji}, semi-correct: ${stats.semiCorrectKanji} (振り仮名: ${stats.correctFurigana}/${stats.totalFurigana}), incorrect: ${stats.totalKanji - stats.correctKanji - stats.semiCorrectKanji}, total: ${stats.totalKanji}">${convertText("{漢[かん]}{字[じ]}")}<br>${stats.correctKanji}/${stats.totalKanji}</span>`;
    const hiragana = stats.totalHiragana == 0 ? "" : `<span title="correct: ${stats.correctHiragana}, semi-correct: ${stats.semiCorrectHiragana}, incorrect: ${stats.totalHiragana - stats.correctHiragana - stats.semiCorrectHiragana}, total: ${stats.totalHiragana}">${convertText("{平[ひら]}{仮[が]}{名[な]}")}<br>${stats.correctHiragana}/${stats.totalHiragana}</span>`;
    const katakana = stats.totalKatakana == 0 ? "" : `<span title="correct: ${stats.correctKatakana}, semi-correct: ${stats.semiCorrectKatakana}, incorrect: ${stats.totalKatakana - stats.correctKatakana - stats.semiCorrectKatakana}, total: ${stats.totalKatakana}">${convertText("{片[かた]}{仮[か]}{名[な]}")}<br>${stats.correctKatakana}/${stats.totalKatakana}</span>`;
    const latin = stats.totalLatin == 0 ? "" : `<span title="correct: ${stats.correctLatin}, semi-correct: ${stats.semiCorrectLatin}, incorrect: ${stats.totalLatin - stats.correctLatin - stats.semiCorrectLatin}, total: ${stats.totalLatin}">${convertText("ローマ{字[じ]}}")}<br>${stats.correctLatin}/${stats.totalLatin}</span>`;

    result.innerHTML = `<span>${CPM} ${KPM}</span><br>${percentage}<br><span class="character-result">${kanji}${hiragana}${katakana}${latin}</span><br><span class="continue">press <i class="material-icons">keyboard_return</i> or click here to continue</span>`;

    stats.state = state.COMPLETE;
}

function nextRound(){
    getRandomText();
    typingTarget.removeAttribute("hidden");
    statsElement.removeAttribute("hidden");
    source.removeAttribute("hidden");

    result.setAttribute("hidden", "");
    result.innerHTML = "";

    setCaret();
    setStats();
    updateLiveStats();
}

function setCaret(){
    const caretElements = typingTarget.querySelectorAll(".caret, .caret-right");

    caretElements.forEach(caretElement => {
        caretElement.classList.remove("caret", "caret-right");
    });

    const progressElements = typingTarget.querySelectorAll(".correct, .semi-correct, .incorrect");

    const lastProgress = progressElements[progressElements.length - 1];
    const lastProgressNext = typingTarget.querySelector("ruby:not(.semi-correct, .semi-incorrect, .gray) .base:not(.correct, .semi-correct, .incorrect), rt:not(.converted) .furigana:not(.correct, .incorrect)");

    if(progressElements.length > 0){
        if((!lastProgress.nextSibling && lastProgress.classList.contains("furigana")) || (lastProgress.classList.contains("furigana") && isFuriganaHidden) || (!lastProgress.parentElement.parentElement.nextSibling && lastProgress.classList.contains("base"))){
            lastProgress.classList.add("caret-right");
        }
        else{
            lastProgressNext.classList.add("caret");
        }
    }
    else{
        lastProgressNext.classList.add("caret");
    }

    scrollIntoView();
}
setCaret();

function checkCharacterType(char){
    if(/[\u4E00-\u9FFF]/.test(char) || /[\u3000-\u303F]/.test(char)){
        return "kanji";
    }
    else if(/[\u3040-\u309F]/.test(char)){
        return "hiragana";
    }
    else if(/[\u30A0-\u30FF]/.test(char)){
        return "katakana";
    }
    else if(/[\u0000-\u024F]/.test(char)){
        return "latin";
    }
    else{
        return "other";
    }
}

function hiraganaToKatakana(hiragana){
    const hiraganaCode = hiragana.charCodeAt(0);
    if(hiraganaCode >= 0x3041 && hiraganaCode <= 0x3096){
        return String.fromCharCode(hiraganaCode + 0x60);
    }
    return null;
}

function areSameSound(char1, char2){
    if(hiraganaToKatakana(char1) === char2 || hiraganaToKatakana(char2) === char1 || char1.toLowerCase() === char2.toLowerCase()){
        return true;
    }
    return false;
}

function scrollIntoView(){
    const caretElement = typingTarget.querySelector(".caret, .caret-right");

    switch(caretElement.classList.contains("furigana")){
        case true:
            caretElement.parentElement.parentElement.querySelector(".kanji").scrollIntoView({ block: "center" });
            break;
        default:
            caretElement.scrollIntoView({ block: "center" });
            break;
    }
}

function getInputSegment(input, arrayRuby){
    let segment = [];

    arrayRuby.forEach(ruby => {
        if(input == ""){
            segment.push("");
        }
        else{
            const kanjiElements = ruby.querySelectorAll(".kanji");
            const furiganaElements = ruby.querySelectorAll(".furigana");
            if(kanjiElements.length > 0 && (checkCharacterType(input.slice(0, kanjiElements.length)) === "kanji" || checkCharacterType(input.slice(0, furiganaElements.length)) === "kanji")){
                segment.push(input.slice(0, kanjiElements.length));
                input = input.slice(kanjiElements.length);
            }
            else if(furiganaElements.length == 0){
                segment.push(input[0]);
                input = input.slice(1);
            }
            else if(checkCharacterType(input.slice(0, kanjiElements.length)) === "kanji"){
                segment.push(input.slice(0, kanjiElements.length));
                input = input.slice(kanjiElements.length);
            }
            else{
                segment.push(input.slice(0, furiganaElements.length));
                input = input.slice(furiganaElements.length);
            }
        }
    });

    return segment;
}

function setInputToElement(element, input){
    element.innerHTML = input.replace("⏎", "<i class='material-icons'>keyboard_return</i><br>");

    if([" ", "　"].includes(input)){
        element.parentElement.classList.add("space");
    }
    else if(element.parentElement.classList.contains("space")){
        element.parentElement.classList.remove("space");
    }
}

function unsetInputToElement(element){
    element.innerHTML = element.getAttribute("data-original");

    if(![" ", "　"].includes(element.getAttribute("data-original"))){
        element.parentElement.classList.remove("space");
    }
    else{
        element.parentElement.classList.add("space");
    }
}

function insertIntoArray(array, index, element){
    return [...array.slice(0, index), element, ...array.slice(index)];
}

function applyInputToRuby(inputSegment, arrayRuby){
    for(let i = 0; i < inputSegment.length; i++){
        const input = inputSegment[i];
        const ruby = arrayRuby[i];
        const rubyElements = ruby.querySelectorAll(".kanji, .kana");
        const baseElements = ruby.querySelectorAll(".base");
        const furiganaElements = ruby.querySelectorAll(".furigana");
        const furiganaRT = ruby.querySelector("rt");

        rubyElements.forEach(element => {
            element.classList.remove("correct", "semi-correct", "incorrect");
            unsetInputToElement(element);
        });
        ruby.classList.remove("semi-correct", "semi-incorrect", "gray");

        if(furiganaRT) furiganaRT.classList.remove("converted");

        if(input == null){
        }
        else if(checkCharacterType(input) === "kanji" || (input.length < furiganaElements.length && inputSegment[i + 1] !== "") || furiganaElements.length == 0 || [" ", "　", "⏎"].some(char => input.includes(char))){
            if(furiganaRT) furiganaRT.classList.add("converted");

            baseElements.forEach((base, j) => {
                const baseText = base.getAttribute("data-original").replace("<i class='material-icons'>keyboard_return</i>", "⏎");

                if(input[j] == null){
                    base.classList.remove("correct", "incorrect");
                }
                else if(input[j] === baseText){
                    unsetInputToElement(base);
                    base.classList.add("correct");
                }
                else if(areSameSound(input[j], baseText)){
                    setInputToElement(base, input[j]);
                    base.classList.add("semi-correct");
                }
                else{
                    setInputToElement(base, input[j]);
                    base.classList.add("incorrect");
                }
            });
        }
        else{
            furiganaElements.forEach((furigana, j) => {
                const furiganaText = furigana.getAttribute("data-original").replace("<i class='material-icons'>keyboard_return</i>", "⏎");

                if(input[j] == null){
                    furigana.classList.remove("correct", "incorrect");
                    if(isFuriganaHidden) furigana.style.opacity = 0;
                }
                else if(input[j] === furiganaText){
                    unsetInputToElement(furigana);
                    furigana.classList.add("correct");
                    if(isFuriganaHidden) furigana.removeAttribute("style");
                }
                else{
                    setInputToElement(furigana, input[j]);
                    furigana.classList.add("incorrect");
                    ruby.classList.add("semi-incorrect");
                    if(isFuriganaHidden) furigana.removeAttribute("style");
                }
            });

            if(input.includes(furiganaRT.innerText) && !ruby.classList.contains("semi-incorrect")){
                ruby.classList.add("semi-correct");
            }
            else if(input != "" && furiganaRT.innerText.includes(input)){
                ruby.classList.add("gray");
            }
        }
    }
}

function update(input = "", e = {"inputType": null}){
    if(stats.state === state.UNSTARTED){
        startTyping();
    }

    const arrayRuby = typingTarget.querySelectorAll(".typing-target-ruby");
    const checkInput = input.replaceAll("\n", "⏎");

    let inputSegment = getInputSegment(checkInput, arrayRuby);

    if(e.inputType === "バックスペース" && checkInput.length > inputSegment.join("").length){
        typingInput.setAttribute("hidden", "");
    }
    else if(e.inputType === "バックスペースEND" && checkInput.length > inputSegment.join("").length){
        inputSegment[inputSegment.length - 1] = "";
        typingInput.value = inputSegment.join("");
        typingInput.removeAttribute("hidden");
    }
    else if(e.inputType === "deleteContentBackward" && checkInput.length > inputSegment.join("").length){
        typingInput.setAttribute("hidden", "");
        inputSegment[inputSegment.length - 1] = "";
        typingInput.value = inputSegment.join("");
        typingInput.removeAttribute("hidden");
    }

    applyInputToRuby(inputSegment, arrayRuby);
    
    const backspace = e.inputType === "deleteContentBackward" || e.inputType === "バックスペース" || e.inputType === "バックスペースEND";

    if(!backspace){
        stats.keyPressed++;
        computePersistentCorrect();
    }

    updateLiveStats();

    setCaret();

    if(stats.progress == stats.totalText && stats.correctPercentage == 100 || (checkInput.length > inputSegment.join("").length && checkInput[checkInput.length - 1] === "⏎")){
        typingComplete();
    }
}

typingInput.addEventListener("keydown", function(e) {
    if(e.code === "Enter"){
        //update(typingInput.value, {"inputType": "ばか"});
    }
});

typingInput.addEventListener("keyup", function(e) {
    if(e.code === "Space"){
        //update(typingInput.value, {"inputType": "ばか"});
    }
});

window.addEventListener("keydown", function(e) {
    typingInput.setSelectionRange(typingInput.value.length, typingInput.value.length);
    if((e.ctrlKey || e.metaKey) && (e.key === "a" || e.key === "v")){
        e.preventDefault();
    }
    else if(e.code === "Enter" && stats.state === state.COMPLETE){
        nextRound();
    }
    else if(e.code === "Backspace"){
        update(typingInput.value, {"inputType": "バックスペース"});
    }
});

window.addEventListener("keyup", function(e) {
    if(e.code === "Enter" && stats.state === state.UNSTARTED){
        typingInput.removeAttribute("hidden");
    }
    else if(e.code === "Backspace"){
        update(typingInput.value, {"inputType": "バックスペースEND"});
    }

    typingInput.focus();
});

window.addEventListener("click", function() {
    if(contextMenu.style.opacity == 1){
        contextMenu.style.opacity = 0;
        contextMenu.style.pointerEvents = "none";
    }
    else if(stats.state === state.COMPLETE){
        nextRound();
        typingInput.removeAttribute("hidden");
    }

    typingInput.focus();
});

window.addEventListener("contextmenu", function(e) {
    e.preventDefault();

    if(e.target.classList.contains("context-menu") || e.target.closest(".context-menu")){
        e.target.click();
        return;
    }

    const { clientX: mouseX, clientY: mouseY } = e;
    const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;

    const menuWidth = contextMenu.offsetWidth;
    const menuHeight = contextMenu.offsetHeight;

    let left = mouseX;
    let top = mouseY;

    if(mouseX + menuWidth > viewportWidth){
        left = viewportWidth - menuWidth - 10;
    }

    if(mouseY + menuHeight > viewportHeight){
        top = viewportHeight - menuHeight - 10;
    }

    contextMenu.style.left = `${left}px`;
    contextMenu.style.top = `${top}px`;
    contextMenu.style.opacity = 1;
    contextMenu.style.pointerEvents = "auto";
});