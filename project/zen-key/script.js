const typingData = [
    {
        "text": "{明日[あした]}　{古[ふる]}びたコトバ{繰[く]}り{返[かえ]}しつぶやいてみる\n{伸[の]}ばしたままの{爪[つめ]}{痕[あと]}はほら{消[き]}えないよ", //remember to remove {明日[あした]}
        "source": "{花[はな]}{残[のこ]}り{月[つき]} by nano.RIPE"
    }/*,
    {
        "text": "にゃにゃめにゃにゃじゅうにゃにゃどのにゃらびでにゃくにゃくいにゃにゃくにゃにゃはんにゃにゃだいにゃんにゃくにゃらべてにゃがにゃがめ",
        "source": "{化[ばけ]}{物[もの]}{語[がたり]}"
    },
    {
        "text": "{斜[なな]}め{七[なな]}{十[じゅう]}{七[なな]}{度[ど]}の{並[なら]}びで{泣[な]}く{泣[な]}く{嘶[いなな]}くナナハン{七[なな]}{台[だい]}{難[なん]}なく{並[なら]}べて{長[なが]}{眺[なが]}め",
        "source": "{早[はや]}{口[くち]}{言[こと]}{葉[ば]}"
    }*/
];

const typingTarget = document.querySelector(".typing-target");
const flexContainer = document.querySelector(".flex-container");
const typingInput = document.querySelector("textarea");

function convertText(text){
    charArray = text.split("");

    let id = 0;
    let type = "kana base";

    let newSpan = document.createElement("span");
    let newRT = document.createElement("rt");
    let newRuby = document.createElement("ruby");
    let newText = document.createElement("p");

    charArray.forEach(char => {
        newRuby.className = "typing-target-ruby";
        newRuby.id = id;
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
                newText.appendChild(newRuby);
                newRuby = document.createElement("ruby");

                type = "kana base";
                break;
            case "\n":
                newSpan.innerHTML = "<i class='material-icons'>keyboard_return</i>";
                newSpan.className = type;
                newRuby.appendChild(newSpan);
                newSpan = document.createElement("span");
                newText.appendChild(newRuby);
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
                        break;
                    case "kana furigana":
                        newRT.appendChild(newSpan);
                        newSpan = document.createElement("span");
                        break;
                    default:
                        newRuby.appendChild(newSpan);
                        newSpan = document.createElement("span");
                        newText.appendChild(newRuby);
                        newRuby = document.createElement("ruby");
                        break;
                }
                break;
        }
        
        if(type === "kana base"){
            id++;
        }
    });

    newText.appendChild(newRuby);

    return newText;
}

let stats = {
    "CPM": 0,
    "SPM": 0,
    "correctKanji": 0,
    "totalKanji": 0,
    "correctKana": 0,
    "totalKana": 0,
    "progress": 0,
    "totalText": 0
};

const statsReset = {
    ...stats
};

let previousRandom = -1;

function getRandomText(){
    let randomIndex = Math.floor(Math.random() * typingData.length);
    while(randomIndex == previousRandom){
        randomIndex = Math.floor(Math.random() * typingData.length);
    }
    previousRandom = randomIndex;
    typingTarget.innerHTML = convertText(typingData[randomIndex].text).innerHTML;

    stats.totalKanji = typingTarget.querySelectorAll(".kanji").length;
    stats.totalKana = typingTarget.querySelectorAll(".kana").length;
    stats.totalText = typingTarget.querySelectorAll(".base").length;
}

getRandomText();

function setCaret(arrayElement, index){
    if(arrayElement[index+1]){
        arrayElement[index+1].classList.add("caret");
        arrayElement[index].classList.remove("caret");
    }
    else{
        arrayElement[index].classList.add("caret-right");
    }
}

function setKanjiCaret(element){
    if(element.className.includes("furigana") && element.className.includes("caret") && element.matches(":first-child")){
        element.classList.remove("caret");
        element.parentElement.parentElement.querySelector(".kanji").classList.add("caret");
    }
    else if(element.className.includes("furigana") && element.matches(":first-child")){
        element.parentElement.parentElement.querySelector(".kanji").classList.remove("caret");
    }
}

function scrollNextIntoView(arrayElement, index){
    if(arrayElement[index+1]){
        arrayElement[index+1].scrollIntoView({ block: "center" });
    }
    else{
        arrayElement[index].scrollIntoView({ block: "center" });
    }
}

let startTime = null;

function update(input, e){
    if(startTime == null && e.inputType != null){
        startTyping();
    }

    const arrayRuby = typingTarget.querySelectorAll(".typing-target-ruby");
    let checkInput = input.replace("\n", "⏎");

    arrayRuby.forEach((ruby, i) => {
        const arrayBase = ruby.querySelectorAll(".base");
        const arrayFurigana = ruby.querySelectorAll(".furigana");

        let correct = 0;
        let incorrect = 0;
        let arrayChar = arrayFurigana;

        if(arrayChar.length == 0) arrayChar = arrayBase;

        arrayChar.forEach((char, j) => {
            if(checkInput[0] == null){
                char.classList.remove("correct");
                char.classList.remove("incorrect");
                ruby.classList.remove("semi-correct");
                ruby.classList.remove("incorrect");
            }
            else if(checkInput[0] === char.innerText.replace("keyboard_return", "⏎")){
                char.classList.add("correct");
                char.classList.remove("incorrect");
                correct++;
                if(incorrect > 0) incorrect--;
            }
            else{
                char.classList.remove("correct");
                char.classList.add("incorrect");
                incorrect++;
                if(correct > 0) correct--;
            }

            checkInput = checkInput.slice(1);
        });

        if(arrayChar[0].className.includes("furigana") && correct == arrayChar.length){
            ruby.classList.add("semi-correct");
            ruby.classList.remove("incorrect");
        }
        else if(arrayChar[0].className.includes("furigana") && incorrect > 0){
            ruby.classList.add("incorrect");
        }
    });

    /*
    const arrayKanaText = typingTarget.querySelectorAll(".kana");
    let arrayInput = input.replaceAll("\n", "⏎").split("");

    let currentID = 0;
    let correct = 0;
    let incorrect = 0;
    let canReplace = true;

    if(input == ""){
        flexContainer.scrollTo(0, 0);
        arrayKanaText[0].classList.add("caret");
    }

    arrayKanaText.forEach((characterSpan, i) => {
        if(characterSpan.className.includes("furigana")){
            if(characterSpan.parentElement.parentElement.id != currentID){
                correct = 0;
                incorrect = 0;
                canReplace = true;
            }
            currentID = characterSpan.parentElement.parentElement.id;
        }
        else{
            if(characterSpan.id != currentID){
                correct = 0;
                incorrect = 0;
                canReplace = true;
            }
            currentID = characterSpan.id;
        }

        if(characterSpan.className.includes("furigana") && canReplace){
            let kana = characterSpan.parentElement.innerText;
            let kanji = characterSpan.parentElement.parentElement.innerText.replace(kana, "");
            arrayInput = arrayInput.join("").replace(kanji, kana).split("");

            canReplace = false
        }

        const character = arrayInput[i];

        if(arrayKanaText[i+1]){
            arrayKanaText[i+1].classList.remove("caret");
        }
        else{
            characterSpan.classList.remove("caret-right");
        }

        if(character == null){
            characterSpan.classList.remove("correct");
            characterSpan.classList.remove("incorrect");
            
            characterSpan.parentElement.parentElement.classList.remove("correct");
            characterSpan.parentElement.parentElement.classList.remove("semi-correct");
            characterSpan.parentElement.parentElement.classList.remove("incorrect");
        }
        else if(character === characterSpan.innerText.replace("keyboard_return", "⏎")){
            characterSpan.classList.add("correct");
            characterSpan.classList.remove("incorrect");
            scrollNextIntoView(arrayKanaText, i);
            setCaret(arrayKanaText, i);
            correct++;
        }
        else{
            characterSpan.classList.remove("correct");
            characterSpan.classList.add("incorrect");
            scrollNextIntoView(arrayKanaText, i);
            setCaret(arrayKanaText, i);
            incorrect++;
        }

        setKanjiCaret(characterSpan);

        if(characterSpan.className.includes("furigana") && characterSpan.nextElementSibling == null && character != null && correct > 0 && incorrect == 0){
            characterSpan.parentElement.parentElement.classList.add("semi-correct");
            characterSpan.parentElement.parentElement.classList.remove("incorrect");
        }
        else if(characterSpan.className.includes("furigana") && incorrect > 0){
            characterSpan.parentElement.parentElement.classList.remove("semi-correct");
            characterSpan.parentElement.parentElement.classList.add("incorrect");
        }
    });

    const arrayKanjiText = typingTarget.querySelectorAll(".kanji");
    const arrayKanjiInput = getCorrectKanji().split("");

    arrayKanjiText.forEach((characterSpan, i) => {
        const character = arrayKanjiInput[i];
        if(character === characterSpan.innerText){
            characterSpan.parentElement.classList.replace("semi-correct", "correct");
        }
    });

    computeCPM(arrayInput.join(""));

    if(e.inputType === "insertLineBreak"){
        typingComplete();
    }*/
}

update("", {"inputType": null});

function startTyping(){
    stats = statsReset;
    startTime = new Date();
    console.log("start");
}

function findLCS(s1, s2) {
    const memo = new Array(s1.length + 1).fill(null).map(() => new Array(s2.length + 1).fill(-1));

    function lcsHelper(i, j) {
        if (i === 0 || j === 0) return 0;

        if (memo[i][j] !== -1) return memo[i][j];

        if (s1[i - 1] === s2[j - 1])
            memo[i][j] = 1 + lcsHelper(i - 1, j - 1);
        else
            memo[i][j] = Math.max(lcsHelper(i - 1, j), lcsHelper(i, j - 1));

        return memo[i][j];
    }

    lcsHelper(s1.length, s2.length);

    let i = s1.length, j = s2.length;
    let lcs = "";

    while (i > 0 && j > 0) {
        if (s1[i - 1] === s2[j - 1]) {
            lcs = s1[i - 1] + lcs;
            i--;
            j--;
        } else if (memo[i - 1][j] > memo[i][j - 1])
            i--;
        else
            j--;
    }

    return lcs;
}

function getCorrectKanji(){
    const input = typingInput.value;
    const allKanji = Array.from(typingTarget.querySelectorAll(".kanji")).map(element => element.textContent).join("");
    const correctKanji = findLCS(input, allKanji);
    stats.correctKanji = correctKanji.length;
    return correctKanji;
}

function countSmallKana(str){
    const smallKanaRegex = /[ぁぃぅぇぉゃゅょっァィゥェォャュョッ]/g;
    const matches = str.match(smallKanaRegex);
    return matches ? matches.length : 0;
}

function computeCPM(input){
    const kanaCount = input.length;
    const smallKanaCount = countSmallKana(input);
    const elapsedTime = new Date() - startTime;
    const CPM = Math.round((((kanaCount / elapsedTime) * 60000) + Number.EPSILON) * 100) / 100;
    const SPM = Math.round(((((kanaCount - smallKanaCount) / elapsedTime) * 60000) + Number.EPSILON) * 100) / 100;

    if(CPM != 0){
        stats.CPM = CPM;
        stats.SPM = SPM;
    }

    console.log("CPM: " + stats.CPM + ", SPM: " + stats.SPM);
}

let enterToConfirm = false;

function typingComplete(){
    const incorrectCount = typingTarget.querySelectorAll(".kana.incorrect").length;
    const progressCount = typingTarget.querySelectorAll(".kana.correct, .kana.incorrect").length;
    const kanaCount = typingTarget.querySelectorAll(".kana").length;

    if(progressCount == kanaCount && (incorrectCount == 0 || enterToConfirm)){
        countCorrectKanji();
        console.log(stats);
        getRandomText();
        typingInput.value = "";
        update("", {"inputType": null});
        startTime = null;
        enterToConfirm = false;
    }
    else if(progressCount == kanaCount){
        enterToConfirm = true;
    }
}

typingInput.addEventListener("keydown", function(e) {
    this.setSelectionRange(this.value.length, this.value.length);
    this.scrollTo(0, this.scrollHeight);
    if((e.ctrlKey || e.metaKey) && (e.key === "a" || e.key === "v")){
        e.preventDefault();
    }
});

typingInput.addEventListener("keyup", function(e) {
    if(e.code === "Enter"){
        //typingComplete();
    }
});