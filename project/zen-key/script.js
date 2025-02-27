const typingData = [
    {
        "lang": "jp",
        "text": "にゃにゃめにゃにゃじゅうにゃにゃどのにゃらびでにゃくにゃくいにゃにゃくにゃにゃはんにゃにゃだいにゃんにゃくにゃらべてにゃがにゃがめ",
        "source": "ブラック羽川（化[ばけ]物[もの]語[がたり]）"
    },
    {
        "lang": "jp",
        "text": "斜[なな]め七[なな]十[じゅう]七[なな]度[ど]の並[なら]びで泣[な]く泣[な]く嘶[いなな]くナナハン七[なな]台[だい]難[なん]なく並[なら]べて長[なが]眺[なが]め",
        "source": "早[はや]口[くち]言[こと]葉[ば]"
    },
    {
        "lang": "jp",
        "text": "今日[きょう]の敵[てき]は、明日[あした]の友[とも]",
        "source": "宮[みや]本[もと]武[む]蔵[さし]"
    },
    {
        "lang": "jp",
        "text": "明日[あした]は明日[あした]の風[かぜ]が吹[ふ]く",
        "source": "諺[ことわざ]"
    },
    {
        "lang": "jp",
        "text": "開[あ]いた口[くち]が塞[ふさ]がらない",
        "source": "諺[ことわざ]"
    },
    {
        "lang": "jp",
        "text": "猫[ねこ]になってください",
        "source": "-"
    },
    {
        "lang": "jp",
        "text": "猫[ねこ]になりたい",
        "source": "-"
    },
    {
        "lang": "jp",
        "text": "一[ひと]人[り]で完[かん]結[けつ]してない世[せ]界[かい]は思[おも]ってたよりずっとうれしい",
        "source": "黒[くろ]沼[ぬま]爽[さわ]子[こ]（君[きみ]に届[とど]け）"
    },
    {
        "lang": "jp",
        "text": "超[ちょう]正[せい]攻[こう]法[ほう]だからね！",
        "source": "矢[や]野[の]あやね（君[きみ]に届[とど]け）"
    },
    {
        "lang": "jp",
        "text": "比[くら]べようがないのは他[ほか]の男[だん]子[し]と接[せっ]触[しょく]がないからでしょ",
        "source": "胡桃[くるみ]沢[ざわ]梅[うめ]（君[きみ]に届[とど]け）"
    },
    {
        "lang": "jp",
        "text": "近[きん]所[じょ]の子[こ]がなんだってんだ？",
        "source": "吉[よし]田[だ]千[ち]鶴[づる]（君[きみ]に届[とど]け）"
    },
    {
        "lang": "jp",
        "text": "俺[おれ]がベタ惚[ぼ]れなんだから",
        "source": "風[かぜ]早[はや]翔[しょう]太[た]（君[きみ]に届[とど]け）"
    },
    {
        "lang": "jp",
        "text": "鈍[にぶ]さに慣[な]れるな！",
        "source": "胡桃[くるみ]沢[ざわ]梅[うめ]（君[きみ]に届[とど]け）"
    },
    {
        "lang": "jp",
        "text": "雨[あめ]の日[ひ]も、風[かぜ]の日[ひ]も、吹[ふ]雪[ぶき]の日[ひ]だって！！",
        "source": "胡桃[くるみ]沢[ざわ]梅[うめ]（君[きみ]に届[とど]け）"
    },
    {
        "lang": "jp",
        "text": "それでもようやく自[じ]分[ぶん]の居[い]場[ば]所[しょ]を見[み]つけて",
        "source": "小[こ]鞠[まり]知[ち]花[か]（負[ま]けヒロインが多[おお]すぎる！）"
    },
    {
        "lang": "jp",
        "text": "余[よ]計[けい]なこと言[い]わなくていい！",
        "source": "七[なな]海[み]燈[とう]子[こ]（やがて君[きみ]になる）"
    },
    {
        "lang": "jp",
        "text": "ドキドキしたことないもの",
        "source": "七[なな]海[み]燈[とう]子[こ]（やがて君[きみ]になる）"
    },
    {
        "lang": "jp",
        "text": "君[きみ]は、そのままでいいんだよ",
        "source": "七[なな]海[み]燈[とう]子[こ]（やがて君[きみ]になる）"
    },
    {
        "lang": "jp",
        "text": "かわいいとダメなの？",
        "source": "日向[ひゅうが]朱[あか]里[り]（やがて君[きみ]になる）"
    },
    {
        "lang": "jp",
        "text": "今[いま]、すっごく緊[きん]張[ちょう]してるんだけど",
        "source": "七[なな]海[み]燈[とう]子[こ]（やがて君[きみ]になる）"
    },
    {
        "lang": "jp",
        "text": "知[し]ってる人[ひと]は知[し]ってるもんね",
        "source": "七[なな]海[み]燈[とう]子[こ]（やがて君[きみ]になる）"
    },
    {
        "lang": "jp",
        "text": "私[わたし]を好[す]きにならないで",
        "source": "七[なな]海[み]燈[とう]子[こ]（やがて君[きみ]になる）"
    },
    {
        "lang": "jp",
        "text": "私[わたし]、別[べつ]に女[おんな]に興[きょう]味[み]ないんだけど",
        "source": "箱[はこ]崎[ざき]理[り]子[こ]（やがて君[きみ]になる）"
    },
    {
        "lang": "jp",
        "text": "先[せん]輩[ぱい]のバーカ！",
        "source": "小[こ]糸[いと]侑[ゆう]（やがて君[きみ]になる）"
    },
    {
        "lang": "jp",
        "text": "約[やく]束[そく]したでしょ\n私[わたし]は先[せん]輩[ぱい]のそばにいるし\n劇[げき]だって手[て]伝[つだ]うし\nほかの人[ひと]を好[す]きにならないし\n先[せん]輩[ぱい]のことを好[す]きにも嫌[きら]いにもならない\nちゃんと守[まも]ってるんだから\n先[せん]輩[ぱい]も信[しん]じてください、私[わたし]のこと",
        "source": "小[こ]糸[いと]侑[ゆう]（やがて君[きみ]になる）"
    },
    {
        "lang": "jp",
        "text": "少[しょう]女[じょ]漫[まん]画[が]もラブソングの歌[か]詞[し]も\n私[わたし]には、キラキラとまぶしくて\nでも\nどうしても届[とど]かなくて",
        "source": "小[こ]糸[いと]侑[ゆう]（やがて君[きみ]になる）"
    }
];

const testMode = 0;

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

    let kanjiGroup = "";
    let furiganaGroup = "";
    let furigana = false;
    let newText = "";
    let isRubyBase = false;
    let isKanji = false;
    charArray.forEach(char => {
        switch(checkCharacterType(char)){
            case "kanji":
                isKanji = true;
                kanjiGroup += isJustHiragana ? "" : `<span class="kanji base" data-original="${char}">${char}</span>`;
                break;
            case "hiragana":
                switch(furigana){
                    case true:
                        const style = isFuriganaHidden ? "style ='opacity: 0'" : "";
                        furiganaGroup += `<span class="kana furigana" data-original="${char}" ${style}>${char}</span>`;
                        break;
                    default:
                        newText += `<span><ruby class="typing-target-ruby hiragana"><span class="kana base" data-original="${char}">${char}</span></ruby></span>`;
                        break;
                }
                break;
            case "katakana":
                newText += isJustHiragana ? `<span><ruby class="typing-target-ruby hiragana"><span class="kana base" data-original="${katakanaToHiragana(char)}">${katakanaToHiragana(char)}</span></ruby></span>` : `<span><ruby class="typing-target-ruby katakana"><span class="kana base" data-original="${char}">${char}</span></ruby></span>`;
                break;
            case "latin":
                newText += `<span><ruby class="typing-target-ruby latin"><span class="kana base" data-original="${char}">${char}</span></ruby></span>`;
                break;
            case "number":
                newText += `<span><ruby class="typing-target-ruby number"><span class="kana base" data-original="${char}">${char}</span></ruby></span>`;
                break;
            default:
                switch(char){
                    case "|":
                        isRubyBase = true;
                        break;
                    case "[":
                        isRubyBase = false;
                        furigana = isJustHiragana ? false : true;
                        break;
                    case "]":
                        furigana = false;
                        newText += isJustHiragana ? "" : `<span><ruby class="typing-target-ruby ${isKanji ? "kanji" : "other"}">${kanjiGroup}<rp>(</rp><rt>${furiganaGroup}</rt><rp>)</rp></ruby></span>`;
                        kanjiGroup = furiganaGroup = "";
                        break;
                    case "\n":
                        newText += `<span><ruby class="typing-target-ruby enter"><span class="kana base" data-original="<i class='material-icons'>keyboard_return</i>"><i class="material-icons">keyboard_return</i></span></ruby></span><br>`;
                        break;
                    case "　": case " ":
                        newText += `<span><ruby class="typing-target-ruby space"><span class="kana base" data-original="${char}">${char}</span></ruby></span>`;
                        break;
                    default:
                        switch(isRubyBase){
                            case true:
                                isKanji = false;
                                kanjiGroup += isJustHiragana ? "" : `<span class="other base" data-original="${char}">${char}</span>`;
                                break;
                            default:
                                newText += `<span><ruby class="typing-target-ruby other"><span class="kana base" data-original="${char}">${char}</span></ruby></span>`;
                                break;
                        }
                        break;
                }
                break;
        }
    });

    return newText;
}

let isFuriganaHidden = false;
function toggleFurigana(){
    const furiganaRT = document.querySelectorAll("rt");

    isFuriganaHidden = !isFuriganaHidden;

    switch(isFuriganaHidden){
        case true:
            furiganaRT.forEach(furigana => {
                furigana.style.opacity = 0;
            });
            break;
        default:
            furiganaRT.forEach(furigana => {
                furigana.removeAttribute("style");
            });
            break;
    }

    setContextMenu();
    update(typingInput.value, {"inputType": "deleteContentBackward"});
}

let isJustHiragana = false;
function toggleJustHiragana(){
    isJustHiragana = !isJustHiragana;

    if(stats.state !== state.COMPLETE){
        getRandomText(false);
        setStats();
        update(typingInput.value, {"inputType": "deleteContentBackward"});
    }
    else{
        result.querySelector(".character-result").innerHTML = getCharacterResult();
    }

    setContextMenu();
}

function setContextMenu(){
    const labelElements = contextMenu.querySelectorAll("label");

    labelElements.forEach(label => {
        if((!isFuriganaHidden || isJustHiragana) && label.getAttribute("data-furigana")){
            label.innerHTML = convertText(label.getAttribute("data-furigana"));
        }
        else{
            label.innerHTML = label.getAttribute("data-furigana-hidden");
        }
    });
}
setContextMenu();

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
    "correctNumber": 0,
    "totalNumber": 0,
    "correctOther": 0,
    "semiCorrectOther": 0,
    "totalOther": 0,
    "correctPercentage": 0,
    "progress": 0,
    "totalText": 0,
    "state": state.UNSTARTED
};

let stats = {
    ...statsReset
};

let previousRandom = -1;

function getRandomText(random = true){
    let randomIndex = random ? Math.floor(Math.random() * typingData.length) : previousRandom;
    if(testMode){
        randomIndex = typingData.length - 1;
    }
    else{
        while(randomIndex == previousRandom && typingData.length > 1 && random){
            randomIndex = Math.floor(Math.random() * typingData.length);
        }
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
    stats.totalNumber = typingTarget.querySelectorAll(".number").length;
    stats.totalOther = typingTarget.querySelectorAll(".other .base, .space, .enter").length;
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
    stats.correctNumber = typingTarget.querySelectorAll(".number .correct").length;
    stats.correctOther = typingTarget.querySelectorAll(".other .base.correct, .space .correct, .enter .correct").length;
    stats.semiCorrectOther = typingTarget.querySelectorAll(".other.semi-correct").length;
    stats.progress = typingTarget.querySelectorAll(".base.correct, .base.semi-correct, .base.incorrect, .semi-correct .base, .semi-incorrect:not(.gray) .base").length;
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
    if(stats.keyPressed < 2) return;

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
    const total = ((stats.correctKanji + stats.correctHiragana + stats.correctKatakana + stats.correctLatin + stats.correctNumber + stats.correctOther) / (stats.totalKanji + stats.totalHiragana + stats.totalKatakana + stats.totalLatin + stats.totalNumber + stats.totalOther)) + (((stats.correctFurigana + stats.semiCorrectHiragana + stats.semiCorrectKatakana + stats.semiCorrectLatin) / (stats.totalFurigana + stats.totalHiragana + stats.totalKatakana + stats.totalLatin)) / 2);
    const totalPercentageRound = Math.round(((total * 100) + Number.EPSILON) * 100) / 100;

    if(isNaN(totalPercentageRound)) return 0;

    return totalPercentageRound;
}

function updateLiveStats(){
    updateStats();

    const avgCPM = Math.round(stats.avgCPM);
    const avgKPM = Math.round(stats.avgKPM);
    const correctPercentage = Math.round(stats.correctPercentage);

    statsElement.innerHTML = `${stats.progress}/${stats.totalText} ${correctPercentage}% ${avgCPM}<span class="unit">CPM</span> ${avgKPM}<span class="unit">KPM</span>`;

    if(stats.progress == stats.totalText && stats.correctPercentage != 100) statsElement.innerHTML = "fix your mistake or press <i class='material-icons'>keyboard_return</i> to complete";
}
updateLiveStats();

function countSmallKana(str){
    const smallKanaRegex = /[ぁぃぅぇぉゃゅょっァィゥェォャュョッ]/g;
    const matches = str.match(smallKanaRegex);
    return matches ? matches.length : 0;
}

function getCharacterResult(){
    const furigana = isJustHiragana ? "ふりがな" : "振り仮名";
    const kanji = stats.totalKanji == 0 ? "" : `<span title="correct: ${stats.correctKanji}, semi-correct: ${stats.semiCorrectKanji} (${furigana}: ${stats.correctFurigana}/${stats.totalFurigana}), incorrect: ${stats.totalKanji - stats.correctKanji - stats.semiCorrectKanji}, total: ${stats.totalKanji}">${convertText("漢[かん]字[じ]")}<br>${stats.correctKanji}/${stats.totalKanji}</span>`;
    const hiragana = stats.totalHiragana == 0 ? "" : `<span title="correct: ${stats.correctHiragana}, semi-correct: ${stats.semiCorrectHiragana}, incorrect: ${stats.totalHiragana - stats.correctHiragana - stats.semiCorrectHiragana}, total: ${stats.totalHiragana}">${convertText("平[ひら]仮[が]名[な]")}<br>${stats.correctHiragana}/${stats.totalHiragana}</span>`;
    const katakana = stats.totalKatakana == 0 ? "" : `<span title="correct: ${stats.correctKatakana}, semi-correct: ${stats.semiCorrectKatakana}, incorrect: ${stats.totalKatakana - stats.correctKatakana - stats.semiCorrectKatakana}, total: ${stats.totalKatakana}">${convertText("片[かた]仮[か]名[な]")}<br>${stats.correctKatakana}/${stats.totalKatakana}</span>`;
    const latin = stats.totalLatin == 0 ? "" : `<span title="correct: ${stats.correctLatin}, semi-correct: ${stats.semiCorrectLatin}, incorrect: ${stats.totalLatin - stats.correctLatin - stats.semiCorrectLatin}, total: ${stats.totalLatin}">${convertText("ローマ字[じ]")}<br>${stats.correctLatin}/${stats.totalLatin}</span>`;
    const number = stats.totalNumber == 0 ? "" : `<span title="correct: ${stats.correctNumber}, incorrect: ${stats.totalNumber - stats.correctNumber}, total: ${stats.totalNumber}">${convertText("数[すう]字[じ]")}<br>${stats.correctNumber}/${stats.totalNumber}</span>`;
    const other = stats.totalOther == 0 ? "" : `<span title="correct: ${stats.correctOther}, semi-correct: ${stats.semiCorrectOther}, incorrect: ${stats.totalOther - stats.correctOther}, total: ${stats.totalOther}">${convertText("その他[た]")}<br>${stats.correctOther}/${stats.totalOther}</span>`;

    return `${kanji}${hiragana}${katakana}${latin}${number}${other}`;
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

    const CPM = `<span title="Last: ${decimalLastCPM}, Peak: ${decimalPeakCPM}, AVG: ${avgDecimalCPM}">${avgCPM}<span class="unit">CPM</span></span>`;
    const KPM = `<span title="Last: ${decimalLastKPM}, Peak: ${decimalPeakKPM}, AVG: ${avgDecimalKPM}">${avgKPM}<span class="unit">KPM</span></span>`;

    const correctPercentage = Math.round(stats.correctPercentage);
    const decimalCorrectPercentage = Math.round((stats.correctPercentage + Number.EPSILON) * 100) / 100;

    const percentage = `<span class="percentage" title="${decimalCorrectPercentage}%">${correctPercentage}%</span>`;

    result.innerHTML = `<span>${CPM} ${KPM}</span><br>${percentage}<br><span class="character-result">${getCharacterResult()}</span><br><span class="continue">press <i class="material-icons">keyboard_return</i> or click here to continue</span>`;

    stats.state = state.COMPLETE;
}

function nextRound(random = true){
    getRandomText(random);
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
    if(/[\u4E00-\u9FFF]/.test(char)){
        return "kanji";
    }
    else if(/[\u3040-\u309F]/.test(char)){
        return "hiragana";
    }
    else if(/[\u30A0-\u30FF]/.test(char)){
        return "katakana";
    }
    else if(/[\u0041-\u005A\u0061-\u007A]/.test(char)){
        return "latin";
    }
    else if(/[\uFF41-\uFF5A]/.test(char)){
        return "fullwidth-latin";
    }
    else if(/[\u0030-\u0039]/.test(char)){
        return "number"
    }
    else{
        return "other";
    }
}

function isForceBase(char){
    return checkCharacterType(char) !== "hiragana" && checkCharacterType(char) !== "katakana" && checkCharacterType(char) !== "fullwidth-latin";
}

function hiraganaToKatakana(hiragana){
    const hiraganaCode = hiragana.charCodeAt(0);
    if(hiraganaCode >= 0x3041 && hiraganaCode <= 0x3096){
        return String.fromCharCode(hiraganaCode + 0x60);
    }
    return hiragana;
}

function katakanaToHiragana(katakana){
    const katakanaCode = katakana.charCodeAt(0);
    if(katakanaCode >= 0x30A1 && katakanaCode <= 0x30F6){
        return String.fromCharCode(katakanaCode - 0x60);
    }
    return katakana;
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
            caretElement.parentElement.parentElement.querySelector(".base").scrollIntoView({ block: "center" });
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
            const furiganaElements = ruby.querySelectorAll(".furigana");
            const kanjiElements = furiganaElements.length > 0 ? ruby.querySelectorAll(".base") : [];
            if(kanjiElements.length > 0 && (isForceBase(input.slice(0, kanjiElements.length)) || isForceBase(input.slice(0, furiganaElements.length)))){
                segment.push(input.slice(0, kanjiElements.length));
                input = input.slice(kanjiElements.length);
            }
            else if(furiganaElements.length == 0){
                segment.push(input[0]);
                input = input.slice(1);
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
        const rubyElements = ruby.querySelectorAll(".kanji, .kana, .other");
        const baseElements = ruby.querySelectorAll(".base");
        const furiganaElements = ruby.querySelectorAll(".furigana");
        const furiganaRT = ruby.querySelector("rt");

        rubyElements.forEach(element => {
            element.classList.remove("correct", "semi-correct", "incorrect");
            unsetInputToElement(element);
        });
        ruby.classList.remove("semi-correct", "semi-incorrect", "gray");

        if(furiganaRT) furiganaRT.classList.remove("converted");

        if(input == "" && isFuriganaHidden && furiganaRT){
            furiganaRT.style.opacity = 0;
        }
        else if(isForceBase(input) || (input.length < furiganaElements.length && !(inputSegment[i + 1] == "" || inputSegment[i + 1] == null)) || furiganaElements.length == 0){
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
            furiganaRT.removeAttribute("style");

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
            else if(input != "" && furiganaRT.innerText.includes(input) && furiganaRT.innerText !== input){
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

window.addEventListener("click", function(e) {
    if(contextMenu.style.opacity == 1 && !(e.target.classList.contains("context-menu") || e.target.closest(".context-menu"))){
        contextMenu.style.opacity = 0;
        contextMenu.style.pointerEvents = "none";
        typingInput.removeAttribute("hidden");
    }
    else if(stats.state === state.COMPLETE && contextMenu.style.opacity == 0){
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

    typingInput.setAttribute("hidden", "");

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