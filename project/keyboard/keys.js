var audio = [];

function playNote(note) { 
    var src = "./notes/" + note.replace("#", "%23") + ".ogg";

    audio.push(new Audio(src));
    audio[audio.length - 1].play();
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
    key.addEventListener("mousedown", () => {
        playNote(key.attributes.note.value);
    });
    
    key.addEventListener("mouseup", () => {
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
    playNote(note);
    const key = document.querySelector("[note='" + note + "']");

    if(key.className.includes("white")){
        key.style.background = "#cbcbda";
    }
    else{
        key.style.background = "#343425";
    }
}

function unsetNote(note){
    stopNote(note);
    const key = document.querySelector("[note='" + note + "']");
    key.style.background = "";
}

const keyPress = document.querySelector(".key-press");

window.addEventListener("keydown", (e) => {
    if(e.key == " " && !keyPress.className.includes("space")){
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
});