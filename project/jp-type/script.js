const typingData = [
    {
        "text": `{明日[あした]}は{雨[あめ]}ですか？\n{明日[あした]}は{雨[あめ]}ですか？`
    }
];

const typingTarget = document.querySelector(".typing-target");

function convertText(text){
    charArray = text.split("");

    let id = 0;
    let type = "kana base";

    let newSpan = document.createElement("span");
    let newRT = document.createElement("rt");
    let newRuby = document.createElement("ruby");

    charArray.forEach(char => {
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
                typingTarget.appendChild(newRuby);
                newRuby.id = id;
                newRuby = document.createElement("ruby");

                type = "kana base";
                break;
            case "\n":
                newSpan.innerHTML = "⏎";
                newSpan.className = "kana base enter";
                newSpan.id = id;
                typingTarget.appendChild(newSpan);
                newSpan = document.createElement("span");
                typingTarget.appendChild(document.createElement("br"));
                break;
            default:
                switch(type){
                    case "kanji base":
                        newSpan.innerHTML = char;
                        newSpan.className = type;
                        newRuby.appendChild(newSpan);
                        newSpan = document.createElement("span");
                        break;
                    case "kana furigana":
                        newSpan.innerHTML = char;
                        newSpan.className = type;
                        newRT.appendChild(newSpan);
                        newSpan = document.createElement("span");
                        break;
                    default:
                        newSpan.innerHTML = char;
                        newSpan.className = type;
                        newSpan.id = id;
                        typingTarget.appendChild(newSpan);
                        newSpan = document.createElement("span");
                        break;
                }
                break;
        }
        
        if(type === "kana base"){
            id++;
        }
    });

    typingTarget.appendChild(newRuby);
}

convertText(typingData[0].text);

function update(input){
    const arrayBaseText = typingTarget.querySelectorAll(".base");
    const arrayKanaText = typingTarget.querySelectorAll(".kana");

    let incorrectCounter = 0;
    let correctCounter = 0;
    let currentID = 0;

    let baseArrayValue = input.replaceAll("\n", "⏎").split("");

    arrayBaseText.forEach((characterSpan, i) => {
        if(characterSpan.id != currentID){
            correctCounter = 0;
            incorrectCounter = 0;
        }

        currentID = characterSpan.id;

        if(characterSpan.className.includes("kanji")){
            let kana = characterSpan.parentElement.querySelector("rt").innerText;
            let kanji = characterSpan.parentElement.innerText.replace(kana, "");

            baseArrayValue = baseArrayValue.join("").replace(kana, kanji).split("");
        }
        const character = baseArrayValue[i];

        if(character == null){
            characterSpan.classList.remove("correct");
            characterSpan.classList.remove("incorrect");
        }
        else if(character === characterSpan.innerText){
            characterSpan.classList.add("correct");
            characterSpan.classList.remove("incorrect");

            correctCounter++;
        }
        else{
            characterSpan.classList.remove("correct");
            characterSpan.classList.add("incorrect");

            incorrectCounter++;
        }

        if(characterSpan.className.includes("kanji")){
            characterSpan.parentElement.setAttribute("data-correct-counter", correctCounter);
            characterSpan.parentElement.setAttribute("data-incorrect-counter", incorrectCounter);
        }
        else{
            characterSpan.setAttribute("data-correct-counter", correctCounter);
            characterSpan.setAttribute("data-incorrect-counter", incorrectCounter);
        }
    });

    let kanaArrayValue = input.replaceAll("\n", "⏎").split("");

    arrayKanaText.forEach((characterSpan, i) => {
        const character = kanaArrayValue[i];

        let correct = (characterSpan.getAttribute("data-correct-counter") > 0 || characterSpan.parentElement.parentElement.getAttribute("data-correct-counter") > 0) && (characterSpan.getAttribute("data-incorrect-counter") == 0 || characterSpan.parentElement.parentElement.getAttribute("data-incorrect-counter") == 0);

        if(character == null && !correct){
            characterSpan.classList.remove("correct");
            characterSpan.classList.remove("incorrect");
        }
        else if(character === characterSpan.innerText || correct){
            characterSpan.classList.add("correct");
            characterSpan.classList.remove("incorrect");

            if(correct && characterSpan.className.includes("furigana")){
                let kana = characterSpan.parentElement.innerText;
                let kanji = characterSpan.parentElement.parentElement.innerText.replace(kana, "");
                kanaArrayValue = kanaArrayValue.join("").replace(kanji, kana).split("");
            }
        }
        else if(!correct){
            characterSpan.classList.remove("correct");
            characterSpan.classList.add("incorrect");
        }
    });
}