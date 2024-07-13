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
        "text": "{斜[なな]}め{七[なな]}{十[じゅう]}{七[なな]}{度[ど]}の{並[なら]}びで{泣[な]}く{泣[な]}く{嘶[いな]}くナナハン{七[なな]}{台[だい]}{難[なん]}なく{並[なら]}べて{長[なが]}{眺[なが]}め",
        "source": "{早[はや]}{口[くち]}{言[こと]}{葉[ば]}"
    },
];

const typingTarget = document.querySelector(".typing-target");
const typingTargetContainer = document.querySelector(".typing-target-container");

function convertText(text){
    charArray = text.split("");

    let id = 0;
    let type = "kana base";

    let newSpan = document.createElement("span");
    let newRT = document.createElement("rt");
    let newRuby = document.createElement("ruby");
    let newText = document.createElement("p");

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
                newText.appendChild(newRuby);
                newRuby.id = id;
                newRuby = document.createElement("ruby");

                type = "kana base";
                break;
            case "\n":
                newSpan.innerHTML = "<i class='material-icons'>keyboard_return</i>";
                newSpan.className = "kana base enter";
                newSpan.id = id;
                newText.appendChild(newSpan);
                newSpan = document.createElement("span");
                newText.appendChild(document.createElement("br"));
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
                        newText.appendChild(newSpan);
                        newSpan = document.createElement("span");
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

function getRandomText(){
    const randomIndex = Math.floor(Math.random() * typingData.length);
    typingTarget.innerHTML = convertText(typingData[randomIndex].text).innerHTML;
}

getRandomText();

function update(input){
    const arrayKanaText = typingTarget.querySelectorAll(".kana");
    const arrayCorrect = typingTarget.querySelector(".correct");

    let kanaArrayValue = input.replaceAll("\n", "⏎").split("");

    let currentID = 0;
    let correct = 0;
    let incorrect = 0;
    let canReplace = true;

    if(input == "") typingTargetContainer.scrollTo(0, 0);

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
            kanaArrayValue = kanaArrayValue.join("").replace(kanji, kana).split("");

            canReplace = false
        }

        const character = kanaArrayValue[i];
        const currentScroll = typingTargetContainer.scrollTop;

        if(character == null){
            characterSpan.classList.remove("correct");
            characterSpan.classList.remove("incorrect");
            
            characterSpan.parentElement.parentElement.classList.remove("correct");
            characterSpan.parentElement.parentElement.classList.remove("incorrect");
        }
        else if(character === characterSpan.innerText.replace("keyboard_return", "⏎")){
            characterSpan.classList.add("correct");
            characterSpan.classList.remove("incorrect");
            characterSpan.scrollIntoView({ block: "nearest" });
            if(currentScroll != typingTargetContainer.scrollTop){
                typingTargetContainer.scrollBy(0, 30);
            }
            correct++;
        }
        else{
            characterSpan.classList.remove("correct");
            characterSpan.classList.add("incorrect");
            characterSpan.scrollIntoView({ block: "nearest" });
            if(currentScroll != typingTargetContainer.scrollTop){
                typingTargetContainer.scrollBy(0, 30);
            }
            incorrect++;
        }

        if(characterSpan.className.includes("furigana") && characterSpan.nextElementSibling == null && character != null && correct > 0 && incorrect == 0){
            characterSpan.parentElement.parentElement.classList.add("correct");
            characterSpan.parentElement.parentElement.classList.remove("incorrect");
        }
        else if(characterSpan.className.includes("furigana") && incorrect > 0){
            characterSpan.parentElement.parentElement.classList.remove("correct");
            characterSpan.parentElement.parentElement.classList.add("incorrect");
        }
    });
}