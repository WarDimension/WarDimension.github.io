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

const keyPress = document.querySelector(".key-press");

window.addEventListener("keydown", (e) => {
    if(e.key == " " && !keyPress.className.includes("space")){
        keyPress.classList.add("space");
    }
    else if(e.key == "z" && !keyPress.className.includes(" z")){
        playNote("C1");
        keyPress.classList.add("z");
    }
    else if(e.key == "s" && !keyPress.className.includes(" s")){
        playNote("C#1");
        keyPress.classList.add("s");
    }
    else if(e.key == "x" && !keyPress.className.includes(" x")){
        playNote("D1");
        keyPress.classList.add("x");
    }
    else if(e.key == "d" && !keyPress.className.includes(" d")){
        playNote("D#1");
        keyPress.classList.add("d");
    }
    else if(e.key == "c" && !keyPress.className.includes(" c")){
        playNote("E1");
        keyPress.classList.add("c");
    }
    else if(e.key == "v" && !keyPress.className.includes(" v")){
        playNote("F1");
        keyPress.classList.add("v");
    }
    else if(e.key == "g" && !keyPress.className.includes(" g")){
        playNote("F#1");
        keyPress.classList.add("g");
    }
    else if(e.key == "b" && !keyPress.className.includes(" b")){
        playNote("G1");
        keyPress.classList.add("b");
    }
    else if(e.key == "h" && !keyPress.className.includes(" h")){
        playNote("G#1");
        keyPress.classList.add("h");
    }
    else if(e.key == "n" && !keyPress.className.includes(" n")){
        playNote("A1");
        keyPress.classList.add("n");
    }
    else if(e.key == "j" && !keyPress.className.includes(" j")){
        playNote("A#1");
        keyPress.classList.add("j");
    }
    else if(e.key == "m" && !keyPress.className.includes(" m")){
        playNote("B1");
        keyPress.classList.add("m");
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
        stopNote("C1");
        keyPress.classList.remove("z");
    }
    else if(e.key == "s"){
        stopNote("C#1");
        keyPress.classList.remove("s");
    }
    else if(e.key == "x"){
        stopNote("D1");
        keyPress.classList.remove("x");
    }
    else if(e.key == "d"){
        stopNote("D#1");
        keyPress.classList.remove("d");
    }
    else if(e.key == "c"){
        stopNote("E1");
        keyPress.classList.remove("c");
    }
    else if(e.key == "v"){
        stopNote("F1");
        keyPress.classList.remove("v");
    }
    else if(e.key == "g"){
        stopNote("F#1");
        keyPress.classList.remove("g");
    }
    else if(e.key == "b"){
        stopNote("G1");
        keyPress.classList.remove("b");
    }
    else if(e.key == "h"){
        stopNote("G#1");
        keyPress.classList.remove("h");
    }
    else if(e.key == "n"){
        stopNote("A1");
        keyPress.classList.remove("n");
    }
    else if(e.key == "j"){
        stopNote("A#1");
        keyPress.classList.remove("j");
    }
    else if(e.key == "m"){
        stopNote("B1");
        keyPress.classList.remove("m");
    }
});