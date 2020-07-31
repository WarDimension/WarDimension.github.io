var mvp = document.getElementById("vp");
if(screen.width < 920) {
  mvp.setAttribute("content","width=920, user-scalable=no");
}

window.addEventListener("resize", (e) => {
  if(screen.width < 920) {
    mvp.setAttribute("content","width=920, user-scalable=no");
  }else{
    mvp.setAttribute("content","width=device-width, initial-scale=1.0, user-scalable=no");
  }
});

var shiftKey = 0;
var maxShift = 3;
var highestNote = "C6";
var highestOctave = 5;

// LOAD SAMPLES

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

var audioSamples = [];

function loadSamples(samples){
    audioSamples = [];
    var src = "";

    loading.style.display = "";

    loadDone = false;
    loaded = 0;

    for(var i = 1; i <= highestOctave; i++){
        notes.forEach(note => {
            src = "./notes/" + samples + "/" + note.replace("#", "%23") + i.toString() + ".ogg";
            audioSamples.push(new Audio(src));
            audioSamples[audioSamples.length - 1].addEventListener("canplaythrough", loadedAudio, false);
        });
    }

    src = "./notes/" + samples + "/" + highestNote + ".ogg";

    audioSamples.push(new Audio(src));
    audioSamples[audioSamples.length - 1].addEventListener("canplaythrough", loadedAudio, false);
}

const loading = document.querySelector(".loading");

var loadDone = false;
var loaded = 0;

function loadedAudio(){
    loaded++;
    if (loaded == audioSamples.length){
        loadDone = true;
        loading.style.display = "none";
    }
}

loadSamples("stage-grand");

// END LOAD SAMPLES

var audio = [];

function playNote(note){
    var note = note.replace("#", "%23");

    audioSamples.forEach(playAudio => {
        if(playAudio.src.includes(note)){
            audio.push(playAudio.cloneNode());
            audio[audio.length - 1].volume = 1;
            audio[audio.length - 1].loop = false;
            audio[audio.length - 1].play();
        }

        if(playAudio.paused){
            playAudio.volume = 0;
            playAudio.loop = true;
            playAudio.play();
        }
    });
}

var fadeOutAudio = [];

function stopNote(note){
    note = note.replace("#", "%23");
    for(var i = 0; i < audio.length; i++){
        if(audio[i].src.includes(note)){
            fadeOutAudio.push(audio[i]);
            audio.splice(i, 1);
        }
    }
    if(fadeOutTimer == undefined && !keyPress.className.includes("space")){
        fadeOutTimer = setInterval(fadeOut, fadeOutTime);
    }
}

const keys = document.querySelectorAll(".key");

keys.forEach(key => {
    key.addEventListener("mousedown", (e) => {
        playNote(key.attributes.note.value);
    });
 
    window.addEventListener("mouseup", () => {
        stopNote(key.attributes.note.value);
    });
});

var fadeOutTime = 100;

var fadeOutTimer;
function fadeOut(){
    for(var i = 0; i < fadeOutAudio.length; i++){
        if(fadeOutAudio[i].volume == 0){
            fadeOutAudio[i].remove();
            fadeOutAudio.splice(i, 1);
        }
        else{
            fadeOutAudio[i].volume = (fadeOutAudio[i].volume - 0.1).toFixed(1);
        }
    }
    
    if(fadeOutAudio.length == 0){
        clearInterval(fadeOutTimer);
        fadeOutTimer = undefined;
    }
}

function setNote(note, oct){
    if(diatonic){
        note = scales[keySignature][modes][note];
        note = note + (oct + octave(note));
    }
    else if(shiftKey > 0){
        note = note.replace(/\d$/, parseInt(note.match(/\d$/)) + shiftKey);
    }

    if(note != highestNote && note.match(/\d$/) > highestOctave){
        return
    }

    playNote(note);
    const key = document.querySelector("[note='" + note + "']");

    if(key.className.includes("white")){
        key.style.background = "#babac9";
    }
    else{
        key.style.background = "#565647";
    }
}

function unsetNote(note, oct){
    if(diatonic){
        note = scales[keySignature][modes][note];
        note = note + (oct + octave(note));
    }
    else if(shiftKey > 0){
        note = note.replace(/\d$/, parseInt(note.match(/\d$/)) + shiftKey);
    }

    if(note != highestNote && note.match(/\d$/) > highestOctave){
        return
    }

    stopNote(note);
    const key = document.querySelector("[note='" + note + "']");
    key.style.background = "";
}

function keyLower(key){
    key = key.toLowerCase();

    var keyNum = [")", "!",  "@",  "#",  "$",  "%",  "^",  "&",  "*",  "("];

    if(key == "<"){
        key = ",";
    }
    else if(key == ">"){
        key = ".";
    }
    else if(key == ":"){
        key = ";";
    }
    else if(key == "?"){
        key = "/";
    }
    else if(key == "{"){
        key = "[";
    }
    else if(key == "+"){
        key = "=";
    }
    else if(key == "}"){
        key = "]";
    }
    else if(keyNum.includes(key)){
        for(var i = 0; i < keyNum.length; i++){
            if(key == keyNum[i]){
                key = i;
            }
        }
    }

    return key;
}

var diatonic = false;
function playMode(direction){
    if(direction == "up"){
        rangeContainer.style.display = "none";
        up[1].style.color = "#565647";
        down[1].style.color = "";
        keySignatureContainer.style.display = "inline-block";
        modesContainer.style.display = "inline-block";
        playModeText.innerHTML = "Diatonic";
        diatonic = true;
    }
    else if(direction == "down"){
        rangeContainer.style.display = "";
        up[1].style.color = "";
        down[1].style.color = "#565647";
        keySignatureContainer.style.display = "";
        modesContainer.style.display = "";
        playModeText.innerHTML = "Chromatic";
        diatonic = false;
    }
    else if(direction != "up" && direction != "down"){
        console.log("Hey... What's up? Why don't play the piano instead of playing with the console?");
    }
}

function shifting(direction){
    if(direction == "up" && shiftKey < maxShift){
        shiftKey++;
    }
    else if(direction == "down" && shiftKey > 0){
        shiftKey--;
    }
    else if(direction != "up" && direction != "down"){
        console.log("Hey... What's up? Why don't play the piano instead of playing with the console?");
    }

    if(shiftKey == 0){
        range.innerHTML = "C1 - G3";
        down[2].style.color = "#565647";
    }
    else if(shiftKey == 1){
        range.innerHTML = "C2 - G4";
        down[2].style.color = "";
    }
    else if(shiftKey == 2){
        range.innerHTML = "C3 - G5";
        up[2].style.color = "";
    }
    else if(shiftKey == 3){
        range.innerHTML = "C4 - C6";
        up[2].style.color = "#565647";
    }
}

const scales = [
    [
        ["C", "D", "E", "F", "G", "A", "B"],
        ["C", "D", "D#", "F", "G", "G#", "A#"],
    ],
    [
        ["C#", "D#", "F", "F#", "G#", "A#", "C"],
        ["C#", "D#", "E", "F#", "G#", "A", "B"]
    ],
    [
        ["D", "E", "F#", "G", "A", "B", "C#"],
        ["D", "E", "F", "G", "A", "A#", "C"]
    ],
    [
        ["D#", "F", "G", "G#", "A#", "C", "D"],
        ["D#", "F", "F#", "G#", "A#", "B", "C#"]
    ],
    [
        ["E", "F#", "G#", "A", "B", "C#", "D#"],
        ["E", "F#", "G", "A", "B", "C", "D"]
    ],
    [
        ["F", "G", "A", "A#", "C", "D", "E"],
        ["F", "G", "G#", "A#", "C", "C#", "D#"]
    ],
    [
        ["F#", "G#", "A#", "B", "C#", "D#", "F"],
        ["F#", "G#", "A", "B", "C#", "D", "E"]
    ],
    [
        ["G", "A", "B", "C", "D", "E", "F#"],
        ["G", "A", "A#", "C", "D", "D#", "F"]
    ],
    [
        ["G#", "A#", "C", "C#", "D#", "F", "G"],
        ["G#", "A#", "B", "C#", "D#", "E", "F#"]
    ],
    [
        ["A", "B", "C#", "D", "E", "F#", "G#"],
        ["A", "B", "C", "D", "E", "F", "G"]
    ],
    [
        ["A#", "C", "D", "D#", "F", "G", "A"],
        ["A#", "C", "C#", "D#", "F", "F#", "G#"]
    ],
    [
        ["B", "C#", "D#", "E", "F#", "G#", "A#"],
        ["B", "C#", "D", "E", "F#", "G", "A"]
    ]
];

keySignature = 0;
function keySignatureChange(direction){
    if(direction == "up" && keySignature < notes.length - 1){
        keySignature++;
    }
    else if(direction == "down" && keySignature > 0){
        keySignature--;
    }
    else if(direction != "up" && direction != "down"){
        console.log("Hey... What's up? Why don't play the piano instead of playing with the console?");
    }

    keySignatureText.innerHTML = notes[keySignature];

    if(keySignature == 0){
        down[3].style.color = "#565647";
    }
    else if(keySignature == notes.length - 1){
        up[3].style.color = "#565647";
    }
    else{
        up[3].style.color = "";
        down[3].style.color = "";
    }
}

modes = 0;
function modesChange(direction){
    if(direction == "up"){
        modesText.innerHTML = "Minor";
        up[4].style.color = "#565647";
        down[4].style.color = "";
        modes = 1;
    }
    else if(direction == "down"){
        modesText.innerHTML = "Major";
        up[4].style.color = "";
        down[4].style.color = "#565647";
        modes = 0;
    }
    else if(direction != "up" && direction != "down"){
        console.log("Hey... What's up? Why don't play the piano instead of playing with the console?");
    }
}

function octave(note){
    var key = scales[keySignature][modes];
    for(var i = 0; i < 7; i++){
        if(key[i] == "B" && note !="B"){
            return 1;
        }
        else if(key[i] == "A#" && note !="A#" && note !="B"){
            return 1;
        }
        else if(key[i] == note){
            return 0;
        }
    }
}

const keyPress = document.querySelector(".key-press");
const playModeText = document.querySelector(".play-mode");
const rangeContainer = document.querySelector(".range-container");
const range = document.querySelector(".range");
const keySignatureContainer = document.querySelector(".key-signature-container");
const keySignatureText = document.querySelector(".key-signature");
const modesContainer = document.querySelector(".modes-container");
const modesText = document.querySelector(".modes");
const up = document.querySelectorAll(".up");
const down = document.querySelectorAll(".down");

down.forEach(button => {
    button.style.color = "#565647";
});

window.addEventListener("keydown", (e) => {
    var key = keyLower(e.key);

    if(!loadDone){
        return;
    }
    else if(key == " " && !keyPress.className.includes("space")){
        keyPress.classList.add("space");
    }
    else if(e.key == "F2" && shiftKey < maxShift){
        shifting("up");

        if(fadeOutTimer == undefined){
            fadeOutAudio = audio;
            audio = [];
            fadeOutTimer = setInterval(fadeOut, fadeOutTime);
        }
    }
    else if(e.key == "F1"){
        e.preventDefault();

        shifting("down");

        if(fadeOutTimer == undefined){
            fadeOutTimer = setInterval(fadeOut, fadeOutTime);
        }
    }
    else if(diatonic){
        if(key == "z" && !keyPress.className.includes(" z")){
            keyPress.classList.add("z");
            setNote(0, 1);
        }
        else if(key == "x" && !keyPress.className.includes(" x")){
            keyPress.classList.add("x");
            setNote(1, 1);
        }
        else if(key == "c" && !keyPress.className.includes(" c")){
            keyPress.classList.add("c");
            setNote(2, 1);
        }
        else if(key == "v" && !keyPress.className.includes(" v")){
            keyPress.classList.add("v");
            setNote(3, 1);
        }
        else if(key == "b" && !keyPress.className.includes(" b")){
            keyPress.classList.add("b");
            setNote(4, 1);
        }
        else if(key == "n" && !keyPress.className.includes(" n")){
            keyPress.classList.add("n");
            setNote(5, 1);
        }
        else if(key == "m" && !keyPress.className.includes(" m")){
            keyPress.classList.add("m");
            setNote(6, 1);
        }
        else if(key == "," && !keyPress.className.includes(" ,")){
            keyPress.classList.add(",");
            setNote(0, 2);
        }
        else if(key == "." && !keyPress.className.includes(" .")){
            keyPress.classList.add(".");
            setNote(1, 2);
        }
        else if(key == "/" && !keyPress.className.includes(" /")){
            keyPress.classList.add("/");
            setNote(2, 2);
        }
        else if(key == "a" && !keyPress.className.includes(" a")){
            keyPress.classList.add("a");
            setNote(0, 2);
        }
        else if(key == "s" && !keyPress.className.includes(" s")){
            keyPress.classList.add("s");
            setNote(1, 2);
        }
        else if(key == "d" && !keyPress.className.includes(" d")){
            keyPress.classList.add("d");
            setNote(2, 2);
        }
        else if(key == "f" && !keyPress.className.includes(" f")){
            keyPress.classList.add("f");
            setNote(3, 2);
        }
        else if(key == "g" && !keyPress.className.includes(" g")){
            keyPress.classList.add("g");
            setNote(4, 2);
        }
        else if(key == "h" && !keyPress.className.includes(" h")){
            keyPress.classList.add("h");
            setNote(5, 2);
        }
        else if(key == "j" && !keyPress.className.includes(" j")){
            keyPress.classList.add("j");
            setNote(6, 2);
        }
        else if(key == "k" && !keyPress.className.includes(" k")){
            keyPress.classList.add("k");
            setNote(0, 3);
        }
        else if(key == "l" && !keyPress.className.includes(" l")){
            keyPress.classList.add("l");
            setNote(1, 3);
        }
        else if(key == ";" && !keyPress.className.includes(" ;")){
            keyPress.classList.add(";");
            setNote(2, 3);
        }
        else if(key == "'" && !keyPress.className.includes(" '")){
            keyPress.classList.add("'");
            setNote(3, 3);
        }
        else if(key == "q" && !keyPress.className.includes(" q")){
            keyPress.classList.add("q");
            setNote(0, 3);
        }
        else if(key == "w" && !keyPress.className.includes(" w")){
            keyPress.classList.add("w");
            setNote(1, 3);
        }
        else if(key == "e" && !keyPress.className.includes(" e")){
            keyPress.classList.add("e");
            setNote(2, 3);
        }
        else if(key == "r" && !keyPress.className.includes(" r")){
            keyPress.classList.add("r");
            setNote(3, 3);
        }
        else if(key == "t" && !keyPress.className.includes(" t")){
            keyPress.classList.add("t");
            setNote(4, 3);
        }
        else if(key == "y" && !keyPress.className.includes(" y")){
            keyPress.classList.add("y");
            setNote(5, 3);
        }
        else if(key == "u" && !keyPress.className.includes(" u")){
            keyPress.classList.add("u");
            setNote(6, 3);
        }
        else if(key == "i" && !keyPress.className.includes(" i")){
            keyPress.classList.add("i");
            setNote(0, 4);
        }
        else if(key == "o" && !keyPress.className.includes(" o")){
            keyPress.classList.add("o");
            setNote(1, 4);
        }
        else if(key == "p" && !keyPress.className.includes(" p")){
            keyPress.classList.add("p");
            setNote(2, 4);
        }
        else if(key == "[" && !keyPress.className.includes(" [")){
            keyPress.classList.add("[");
            setNote(3, 4);
        }
        else if(key == "]" && !keyPress.className.includes(" ]")){
            keyPress.classList.add("]");
            setNote(4, 4);
        }
        else if(key == "\\" && !keyPress.className.includes(" \\")){
            keyPress.classList.add("\\");
            setNote(5, 4);
        }
        else if(key == "1" && !keyPress.className.includes(" 1")){
            keyPress.classList.add("1");
            setNote(0, 4);
        }
        else if(key == "2" && !keyPress.className.includes(" 2")){
            keyPress.classList.add("2");
            setNote(1, 4);
        }
        else if(key == "3" && !keyPress.className.includes(" 3")){
            keyPress.classList.add("3");
            setNote(2, 4);
        }
        else if(key == "4" && !keyPress.className.includes(" 4")){
            keyPress.classList.add("4");
            setNote(3, 4);
        }
        else if(key == "5" && !keyPress.className.includes(" 5")){
            keyPress.classList.add("5");
            setNote(4, 4);
        }
        else if(key == "6" && !keyPress.className.includes(" 6")){
            keyPress.classList.add("6");
            setNote(5, 4);
        }
        else if(key == "7" && !keyPress.className.includes(" 7")){
            keyPress.classList.add("7");
            setNote(6, 4);
        }
        else if(key == "8" && !keyPress.className.includes(" 8")){
            keyPress.classList.add("8");
            setNote(0, 5);
        }
        else if(key == "9" && !keyPress.className.includes(" 9")){
            keyPress.classList.add("9");
            setNote(1, 5);
        }
        else if(key == "0" && !keyPress.className.includes(" 0")){
            keyPress.classList.add("0");
            setNote(2, 5);
        }
        else if(key == "-" && !keyPress.className.includes(" -")){
            keyPress.classList.add("-");
            setNote(3, 5);
        }
        else if(key == "=" && !keyPress.className.includes(" =")){
            keyPress.classList.add("=");
            setNote(4, 5);
        }
    }
    else{
        if(key == "z" && !keyPress.className.includes(" z")){
            keyPress.classList.add("z");
            setNote("C1");
        }
        else if(key == "s" && !keyPress.className.includes(" s")){
            keyPress.classList.add("s");
            setNote("C#1");
        }
        else if(key == "x" && !keyPress.className.includes(" x")){
            keyPress.classList.add("x");
            setNote("D1");
        }
        else if(key == "d" && !keyPress.className.includes(" d")){
            keyPress.classList.add("d");
            setNote("D#1");
        }
        else if(key == "c" && !keyPress.className.includes(" c")){
            keyPress.classList.add("c");
            setNote("E1");
        }
        else if(key == "v" && !keyPress.className.includes(" v")){
            keyPress.classList.add("v");
            setNote("F1");
        }
        else if(key == "g" && !keyPress.className.includes(" g")){
            keyPress.classList.add("g");
            setNote("F#1");
        }
        else if(key == "b" && !keyPress.className.includes(" b")){
            keyPress.classList.add("b");
            setNote("G1");
        }
        else if(key == "h" && !keyPress.className.includes(" h")){
            keyPress.classList.add("h");
            setNote("G#1");
        }
        else if(key == "n" && !keyPress.className.includes(" n")){
            keyPress.classList.add("n");
            setNote("A1");
        }
        else if(key == "j" && !keyPress.className.includes(" j")){
            keyPress.classList.add("j");
            setNote("A#1");
        }
        else if(key == "m" && !keyPress.className.includes(" m")){
            keyPress.classList.add("m");
            setNote("B1");
        }
        else if(key == "," && !keyPress.className.includes(" ,")){
            keyPress.classList.add(",");
            setNote("C2");
        }
        else if(key == "l" && !keyPress.className.includes(" l")){
            keyPress.classList.add("l");
            setNote("C#2");
        }
        else if(key == "." && !keyPress.className.includes(" .")){
            keyPress.classList.add(".");
            setNote("D2");
        }
        else if(key == ";" && !keyPress.className.includes(" ;")){
            keyPress.classList.add(";");
            setNote("D#2");
        }
        else if(key == "/" && !keyPress.className.includes(" /")){
            keyPress.classList.add("/");
            setNote("E2");
        }
        else if(key == "q" && !keyPress.className.includes(" q")){
            keyPress.classList.add("q");
            setNote("C2");
        }
        else if(key == "2" && !keyPress.className.includes(" 2")){
            keyPress.classList.add("2");
            setNote("C#2");
        }
        else if(key == "w" && !keyPress.className.includes(" w")){
            keyPress.classList.add("w");
            setNote("D2");
        }
        else if(key == "3" && !keyPress.className.includes(" 3")){
            keyPress.classList.add("3");
            setNote("D#2");
        }
        else if(key == "e" && !keyPress.className.includes(" e")){
            keyPress.classList.add("e");
            setNote("E2");
        }
        else if(key == "r" && !keyPress.className.includes(" r")){
            keyPress.classList.add("r");
            setNote("F2");
        }
        else if(key == "5" && !keyPress.className.includes(" 5")){
            keyPress.classList.add("5");
            setNote("F#2");
        }
        else if(key == "t" && !keyPress.className.includes(" t")){
            keyPress.classList.add("t");
            setNote("G2");
        }
        else if(key == "6" && !keyPress.className.includes(" 6")){
            keyPress.classList.add("6");
            setNote("G#2");
        }
        else if(key == "y" && !keyPress.className.includes(" y")){
            keyPress.classList.add("y");
            setNote("A2");
        }
        else if(key == "7" && !keyPress.className.includes(" 7")){
            keyPress.classList.add("7");
            setNote("A#2");
        }
        else if(key == "u" && !keyPress.className.includes(" u")){
            keyPress.classList.add("u");
            setNote("B2");
        }
        else if(key == "i" && !keyPress.className.includes(" i")){
            keyPress.classList.add("i");
            setNote("C3");
        }
        else if(key == "9" && !keyPress.className.includes(" 9")){
            keyPress.classList.add("9");
            setNote("C#3");
        }
        else if(key == "o" && !keyPress.className.includes(" o")){
            keyPress.classList.add("o");
            setNote("D3");
        }
        else if(key == "0" && !keyPress.className.includes(" 0")){
            keyPress.classList.add("0");
            setNote("D#3");
        }
        else if(key == "p" && !keyPress.className.includes(" p")){
            keyPress.classList.add("p");
            setNote("E3");
        }
        else if(key == "[" && !keyPress.className.includes(" [")){
            keyPress.classList.add("[");
            setNote("F3");
        }
        else if(key == "=" && !keyPress.className.includes(" =")){
            keyPress.classList.add("=");
            setNote("F#3");
        }
        else if(key == "]" && !keyPress.className.includes(" ]")){
            keyPress.classList.add("]");
            setNote("G3");
        }
    }
});

window.addEventListener("keyup", (e) => {
    var key = keyLower(e.key);

    if(e.key == " "){
        keyPress.classList.remove("space");
        if(fadeOutTimer == undefined){
            fadeOutTimer = setInterval(fadeOut, fadeOutTime);
        }
    }
    else if(diatonic){
        if(key == "z"){
            keyPress.classList.remove("z");
            unsetNote(0, 1);
        }
        else if(key == "x"){
            keyPress.classList.remove("x");
            unsetNote(1, 1);
        }
        else if(key == "c"){
            keyPress.classList.remove("c");
            unsetNote(2, 1);
        }
        else if(key == "v"){
            keyPress.classList.remove("v");
            unsetNote(3, 1);
        }
        else if(key == "b"){
            keyPress.classList.remove("b");
            unsetNote(4, 1);
        }
        else if(key == "n"){
            keyPress.classList.remove("n");
            unsetNote(5, 1);
        }
        else if(key == "m"){
            keyPress.classList.remove("m");
            unsetNote(6, 1);
        }
        else if(key == ","){
            keyPress.classList.remove(",");
            unsetNote(0, 2);
        }
        else if(key == "."){
            keyPress.classList.remove(".");
            unsetNote(1, 2);
        }
        else if(key == "/"){
            keyPress.classList.remove("/");
            unsetNote(2, 2);
        }
        else if(key == "a"){
            keyPress.classList.remove("a");
            unsetNote(0, 2);
        }
        else if(key == "s"){
            keyPress.classList.remove("s");
            unsetNote(1, 2);
        }
        else if(key == "d"){
            keyPress.classList.remove("d");
            unsetNote(2, 2);
        }
        else if(key == "f"){
            keyPress.classList.remove("f");
            unsetNote(3, 2);
        }
        else if(key == "g"){
            keyPress.classList.remove("g");
            unsetNote(4, 2);
        }
        else if(key == "h"){
            keyPress.classList.remove("h");
            unsetNote(5, 2);
        }
        else if(key == "j"){
            keyPress.classList.remove("j");
            unsetNote(6, 2);
        }
        else if(key == "k"){
            keyPress.classList.remove("k");
            unsetNote(0, 3);
        }
        else if(key == "l"){
            keyPress.classList.remove("l");
            unsetNote(1, 3);
        }
        else if(key == ";"){
            keyPress.classList.remove(";");
            unsetNote(2, 3);
        }
        else if(key == "'"){
            keyPress.classList.remove("'");
            unsetNote(3, 3);
        }
        else if(key == "q"){
            keyPress.classList.remove("q");
            unsetNote(0, 3);
        }
        else if(key == "w"){
            keyPress.classList.remove("w");
            unsetNote(1, 3);
        }
        else if(key == "e"){
            keyPress.classList.remove("e");
            unsetNote(2, 3);
        }
        else if(key == "r"){
            keyPress.classList.remove("r");
            unsetNote(3, 3);
        }
        else if(key == "t"){
            keyPress.classList.remove("t");
            unsetNote(4, 3);
        }
        else if(key == "y"){
            keyPress.classList.remove("y");
            unsetNote(5, 3);
        }
        else if(key == "u"){
            keyPress.classList.remove("u");
            unsetNote(6, 3);
        }
        else if(key == "i"){
            keyPress.classList.remove("i");
            unsetNote(0, 4);
        }
        else if(key == "o"){
            keyPress.classList.remove("o");
            unsetNote(1, 4);
        }
        else if(key == "p"){
            keyPress.classList.remove("p");
            unsetNote(2, 4);
        }
        else if(key == "["){
            keyPress.classList.remove("[");
            unsetNote(3, 4);
        }
        else if(key == "]"){
            keyPress.classList.remove("]");
            unsetNote(4, 4);
        }
        else if(key == "\\"){
            keyPress.classList.remove("\\");
            unsetNote(5, 4);
        }
        else if(key == "1"){
            keyPress.classList.remove("1");
            unsetNote(0, 4);
        }
        else if(key == "2"){
            keyPress.classList.remove("2");
            unsetNote(1, 4);
        }
        else if(key == "3"){
            keyPress.classList.remove("3");
            unsetNote(2, 4);
        }
        else if(key == "4"){
            keyPress.classList.remove("4");
            unsetNote(3, 4);
        }
        else if(key == "5"){
            keyPress.classList.remove("5");
            unsetNote(4, 4);
        }
        else if(key == "6"){
            keyPress.classList.remove("6");
            unsetNote(5, 4);
        }
        else if(key == "7"){
            keyPress.classList.remove("7");
            unsetNote(6, 4);
        }
        else if(key == "8"){
            keyPress.classList.remove("8");
            unsetNote(0, 5);
        }
        else if(key == "9"){
            keyPress.classList.remove("9");
            unsetNote(1, 5);
        }
        else if(key == "0"){
            keyPress.classList.remove("0");
            unsetNote(2, 5);
        }
        else if(key == "-"){
            keyPress.classList.remove("-");
            unsetNote(3, 5);
        }
        else if(key == "="){
            keyPress.classList.remove("=");
            unsetNote(4, 5);
        }
    }
    else{
        if(key == "z"){
            keyPress.classList.remove("z");
            unsetNote("C1");
        }
        else if(key == "s"){
            keyPress.classList.remove("s");
            unsetNote("C#1");
        }
        else if(key == "x"){
            keyPress.classList.remove("x");
            unsetNote("D1");
        }
        else if(key == "d"){
            keyPress.classList.remove("d");
            unsetNote("D#1");
        }
        else if(key == "c"){
            keyPress.classList.remove("c");
            unsetNote("E1");
        }
        else if(key == "v"){
            keyPress.classList.remove("v");
            unsetNote("F1");
        }
        else if(key == "g"){
            keyPress.classList.remove("g");
            unsetNote("F#1");
        }
        else if(key == "b"){
            keyPress.classList.remove("b");
            unsetNote("G1");
        }
        else if(key == "h"){
            keyPress.classList.remove("h");
            unsetNote("G#1");
        }
        else if(key == "n"){
            keyPress.classList.remove("n");
            unsetNote("A1");
        }
        else if(key == "j"){
            keyPress.classList.remove("j");
            unsetNote("A#1");
        }
        else if(key == "m"){
            keyPress.classList.remove("m");
            unsetNote("B1");
        }
        else if(key == ","){
            keyPress.classList.remove(",");
            unsetNote("C2");
        }
        else if(key == "l"){
            keyPress.classList.remove("l");
            unsetNote("C#2");
        }
        else if(key == "."){
            keyPress.classList.remove(".");
            unsetNote("D2");
        }
        else if(key == ";"){
            keyPress.classList.remove(";");
            unsetNote("D#2");
        }
        else if(key == "/"){
            keyPress.classList.remove("/");
            unsetNote("E2");
        }
        else if(key == "q"){
            keyPress.classList.remove("q");
            unsetNote("C2");
        }
        else if(key == "2"){
            keyPress.classList.remove("2");
            unsetNote("C#2");
        }
        else if(key == "w"){
            keyPress.classList.remove("w");
            unsetNote("D2");
        }
        else if(key == "3"){
            keyPress.classList.remove("3");
            unsetNote("D#2");
        }
        else if(key == "e"){
            keyPress.classList.remove("e");
            unsetNote("E2");
        }
        else if(key == "r"){
            keyPress.classList.remove("r");
            unsetNote("F2");
        }
        else if(key == "5"){
            keyPress.classList.remove("5");
            unsetNote("F#2");
        }
        else if(key == "t"){
            keyPress.classList.remove("t");
            unsetNote("G2");
        }
        else if(key == "6"){
            keyPress.classList.remove("6");
            unsetNote("G#2");
        }
        else if(key == "y"){
            keyPress.classList.remove("y");
            unsetNote("A2");
        }
        else if(key == "7"){
            keyPress.classList.remove("7");
            unsetNote("A#2");
        }
        else if(key == "u"){
            keyPress.classList.remove("u");
            unsetNote("B2");
        }
        else if(key == "i"){
            keyPress.classList.remove("i");
            unsetNote("C3");
        }
        else if(key == "9"){
            keyPress.classList.remove("9");
            unsetNote("C#3");
        }
        else if(key == "o"){
            keyPress.classList.remove("o");
            unsetNote("D3");
        }
        else if(key == "0"){
            keyPress.classList.remove("0");
            unsetNote("D#3");
        }
        else if(key == "p"){
            keyPress.classList.remove("p");
            unsetNote("E3");
        }
        else if(key == "["){
            keyPress.classList.remove("[");
            unsetNote("F3");
        }
        else if(key == "="){
            keyPress.classList.remove("=");
            unsetNote("F#3");
        }
        else if(key == "]"){
            keyPress.classList.remove("]");
            unsetNote("G3");
        }
    }
});