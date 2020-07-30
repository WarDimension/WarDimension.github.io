var shiftKey = 0;
var highestNote = "C4";
var highestOctave = 3;

// LOAD SAMPLES

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

var samples = "stage-grand";
var audioSamples = [];

function loadSamples(){
    audioSamples = [];
    loadDone = false;
    var src = "";
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
        clearInterval(loadTimer);
    }
}

loadSamples();

// END LOAD SAMPLES

var audio = [];

function playNote(note){
    var note = note.replace("#", "%23");

    audioSamples.forEach(playAudio => {
        if(playAudio.src.includes(note)){
            audio.push(playAudio.cloneNode());
            audio[audio.length - 1].play();
        }
    });
}

var fadeOutAudio = [];

function stopNote(note){
    if(keyPress.className.includes("space")){
        return;
    }
    note = note.replace("#", "%23");
    for(var i = 0; i < audio.length; i++){
        if(audio[i].src.includes(note)){
            fadeOutAudio.push(audio[i]);
            audio.splice(i, 1);
        }
    }
    if(fadeOutTimer == undefined){
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

function setNote(note){

    if(shiftKey > 0){
        note = note.replace(/\d$/, parseInt(note.match(/\d$/)) + shiftKey);
        if(note != highestNote && note.match(/\d$/) > highestOctave){
            return
        }
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

function unsetNote(note){

    if(shiftKey > 0){
        note = note.replace(/\d$/, parseInt(note.match(/\d$/)) + shiftKey);
        if(note != highestNote && note.match(/\d$/) > highestOctave){
            return
        }
    }

    stopNote(note);
    const key = document.querySelector("[note='" + note + "']");
    key.style.background = "";
}

const keyPress = document.querySelector(".key-press");

window.addEventListener("keydown", (e) => {
    if(!loadDone){
        return;
    }
    else if(e.key == " " && !keyPress.className.includes("space")){
        keyPress.classList.add("space");
    }
    else if(e.key == "z" && !keyPress.className.includes(" z")){
        keyPress.classList.add("z");
        setNote("C1");
    }
    else if(e.key == "s" && !keyPress.className.includes(" s")){
        keyPress.classList.add("s");
        setNote("C#1");
    }
    else if(e.key == "x" && !keyPress.className.includes(" x")){
        keyPress.classList.add("x");
        setNote("D1");
    }
    else if(e.key == "d" && !keyPress.className.includes(" d")){
        keyPress.classList.add("d");
        setNote("D#1");
    }
    else if(e.key == "c" && !keyPress.className.includes(" c")){
        keyPress.classList.add("c");
        setNote("E1");
    }
    else if(e.key == "v" && !keyPress.className.includes(" v")){
        keyPress.classList.add("v");
        setNote("F1");
    }
    else if(e.key == "g" && !keyPress.className.includes(" g")){
        keyPress.classList.add("g");
        setNote("F#1");
    }
    else if(e.key == "b" && !keyPress.className.includes(" b")){
        keyPress.classList.add("b");
        setNote("G1");
    }
    else if(e.key == "h" && !keyPress.className.includes(" h")){
        keyPress.classList.add("h");
        setNote("G#1");
    }
    else if(e.key == "n" && !keyPress.className.includes(" n")){
        keyPress.classList.add("n");
        setNote("A1");
    }
    else if(e.key == "j" && !keyPress.className.includes(" j")){
        keyPress.classList.add("j");
        setNote("A#1");
    }
    else if(e.key == "m" && !keyPress.className.includes(" m")){
        keyPress.classList.add("m");
        setNote("B1");
    }
    else if(e.key == "," && !keyPress.className.includes(" ,")){
        keyPress.classList.add(",");
        setNote("C2");
    }
    else if(e.key == "l" && !keyPress.className.includes(" l")){
        keyPress.classList.add("l");
        setNote("C#2");
    }
    else if(e.key == "." && !keyPress.className.includes(" .")){
        keyPress.classList.add(".");
        setNote("D2");
    }
    else if(e.key == ";" && !keyPress.className.includes(" ;")){
        keyPress.classList.add(";");
        setNote("D#2");
    }
    else if(e.key == "/" && !keyPress.className.includes(" /")){
        keyPress.classList.add("/");
        setNote("E2");
    }
    else if(e.key == "q" && !keyPress.className.includes(" q")){
        keyPress.classList.add("q");
        setNote("C2");
    }
    else if(e.key == "2" && !keyPress.className.includes(" 2")){
        keyPress.classList.add("2");
        setNote("C#2");
    }
    else if(e.key == "w" && !keyPress.className.includes(" w")){
        keyPress.classList.add("w");
        setNote("D2");
    }
    else if(e.key == "3" && !keyPress.className.includes(" 3")){
        keyPress.classList.add("3");
        setNote("D#2");
    }
    else if(e.key == "e" && !keyPress.className.includes(" e")){
        keyPress.classList.add("e");
        setNote("E2");
    }
    else if(e.key == "r" && !keyPress.className.includes(" r")){
        keyPress.classList.add("r");
        setNote("F2");
    }
    else if(e.key == "5" && !keyPress.className.includes(" 5")){
        keyPress.classList.add("5");
        setNote("F#2");
    }
    else if(e.key == "t" && !keyPress.className.includes(" t")){
        keyPress.classList.add("t");
        setNote("G2");
    }
    else if(e.key == "6" && !keyPress.className.includes(" 6")){
        keyPress.classList.add("6");
        setNote("G#2");
    }
    else if(e.key == "y" && !keyPress.className.includes(" y")){
        keyPress.classList.add("y");
        setNote("A2");
    }
    else if(e.key == "7" && !keyPress.className.includes(" 7")){
        keyPress.classList.add("7");
        setNote("A#2");
    }
    else if(e.key == "u" && !keyPress.className.includes(" u")){
        keyPress.classList.add("u");
        setNote("B2");
    }
    else if(e.key == "i" && !keyPress.className.includes(" i")){
        keyPress.classList.add("i");
        setNote("C3");
    }
    else if(e.key == "9" && !keyPress.className.includes(" 9")){
        keyPress.classList.add("9");
        setNote("C#3");
    }
    else if(e.key == "o" && !keyPress.className.includes(" o")){
        keyPress.classList.add("o");
        setNote("D3");
    }
    else if(e.key == "0" && !keyPress.className.includes(" 0")){
        keyPress.classList.add("0");
        setNote("D#3");
    }
    else if(e.key == "p" && !keyPress.className.includes(" p")){
        keyPress.classList.add("p");
        setNote("E3");
    }
    else if(e.key == "[" && !keyPress.className.includes(" [")){
        keyPress.classList.add("[");
        setNote("F3");
    }
    else if(e.key == "=" && !keyPress.className.includes(" =")){
        keyPress.classList.add("=");
        setNote("F#3");
    }
    else if(e.key == "]" && !keyPress.className.includes(" ]")){
        keyPress.classList.add("]");
        setNote("G3");
    }
});

window.addEventListener("keyup", (e) => {
    if(e.key == " "){
        keyPress.classList.remove("space");
        fadeOutAudio = audio;
        audio = [];
        if(fadeOutTimer == undefined){
            fadeOutTimer = setInterval(fadeOut, fadeOutTime);
        }
    }
    else if(e.key == "z"){
        keyPress.classList.remove("z");
        unsetNote("C1");
    }
    else if(e.key == "s"){
        keyPress.classList.remove("s");
        unsetNote("C#1");
    }
    else if(e.key == "x"){
        keyPress.classList.remove("x");
        unsetNote("D1");
    }
    else if(e.key == "d"){
        keyPress.classList.remove("d");
        unsetNote("D#1");
    }
    else if(e.key == "c"){
        keyPress.classList.remove("c");
        unsetNote("E1");
    }
    else if(e.key == "v"){
        keyPress.classList.remove("v");
        unsetNote("F1");
    }
    else if(e.key == "g"){
        keyPress.classList.remove("g");
        unsetNote("F#1");
    }
    else if(e.key == "b"){
        keyPress.classList.remove("b");
        unsetNote("G1");
    }
    else if(e.key == "h"){
        keyPress.classList.remove("h");
        unsetNote("G#1");
    }
    else if(e.key == "n"){
        keyPress.classList.remove("n");
        unsetNote("A1");
    }
    else if(e.key == "j"){
        keyPress.classList.remove("j");
        unsetNote("A#1");
    }
    else if(e.key == "m"){
        keyPress.classList.remove("m");
        unsetNote("B1");
    }
    else if(e.key == ","){
        keyPress.classList.remove(",");
        unsetNote("C2");
    }
    else if(e.key == "l"){
        keyPress.classList.remove("l");
        unsetNote("C#2");
    }
    else if(e.key == "."){
        keyPress.classList.remove(".");
        unsetNote("D2");
    }
    else if(e.key == ";"){
        keyPress.classList.remove(";");
        unsetNote("D#2");
    }
    else if(e.key == "/"){
        keyPress.classList.remove("/");
        unsetNote("E2");
    }
    else if(e.key == "q"){
        keyPress.classList.remove("q");
        unsetNote("C2");
    }
    else if(e.key == "2"){
        keyPress.classList.remove("2");
        unsetNote("C#2");
    }
    else if(e.key == "w"){
        keyPress.classList.remove("w");
        unsetNote("D2");
    }
    else if(e.key == "3"){
        keyPress.classList.remove("3");
        unsetNote("D#2");
    }
    else if(e.key == "e"){
        keyPress.classList.remove("e");
        unsetNote("E2");
    }
    else if(e.key == "r"){
        keyPress.classList.remove("r");
        unsetNote("F2");
    }
    else if(e.key == "5"){
        keyPress.classList.remove("5");
        unsetNote("F#2");
    }
    else if(e.key == "t"){
        keyPress.classList.remove("t");
        unsetNote("G2");
    }
    else if(e.key == "6"){
        keyPress.classList.remove("6");
        unsetNote("G#2");
    }
    else if(e.key == "y"){
        keyPress.classList.remove("y");
        unsetNote("A2");
    }
    else if(e.key == "7"){
        keyPress.classList.remove("7");
        unsetNote("A#2");
    }
    else if(e.key == "u"){
        keyPress.classList.remove("u");
        unsetNote("B2");
    }
    else if(e.key == "i"){
        keyPress.classList.remove("i");
        unsetNote("C3");
    }
    else if(e.key == "9"){
        keyPress.classList.remove("9");
        unsetNote("C#3");
    }
    else if(e.key == "o"){
        keyPress.classList.remove("o");
        unsetNote("D3");
    }
    else if(e.key == "0"){
        keyPress.classList.remove("0");
        unsetNote("D#3");
    }
    else if(e.key == "p"){
        keyPress.classList.remove("p");
        unsetNote("E3");
    }
    else if(e.key == "["){
        keyPress.classList.remove("[");
        unsetNote("F3");
    }
    else if(e.key == "="){
        keyPress.classList.remove("=");
        unsetNote("F#3");
    }
    else if(e.key == "]"){
        keyPress.classList.remove("]");
        unsetNote("G3");
    }
});