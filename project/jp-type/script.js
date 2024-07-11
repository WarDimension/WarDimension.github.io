const typingData = [
    {
        "text": "{明日[あした]}は{雨[あめ]}ですか？"
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
                newRuby.className = "kanji-group";
                newRuby.id = id;
                newRuby = document.createElement("ruby");

                type = "kana base";
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
    const arrayValue = input.split("");

    let incorrectCounter = 0;
    let correctCounter = 0;
    let currentID = 0;

    arrayBaseText.forEach((characterSpan, i) => {
        const character = arrayValue[i];

        if(characterSpan.id != currentID){
            correctCounter = 0;
            incorrectCounter = 0;
        }

        currentID = characterSpan.id;

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

    arrayKanaText.forEach((characterSpan, i) => {
        const character = arrayValue[i];

        let correct = (characterSpan.getAttribute("data-correct-counter") > 0 || characterSpan.parentElement.parentElement.getAttribute("data-correct-counter") > 0) && (characterSpan.getAttribute("data-incorrect-counter") == 0 || characterSpan.parentElement.parentElement.getAttribute("data-incorrect-counter") == 0);

        if(character == null && !correct){
            characterSpan.classList.remove("correct");
            characterSpan.classList.remove("incorrect");
        }
        else if(character === characterSpan.innerText || correct){
            characterSpan.classList.add("correct");
            characterSpan.classList.remove("incorrect");
        }
        else if(!correct){
            characterSpan.classList.remove("correct");
            characterSpan.classList.add("incorrect");
        }
    });
}