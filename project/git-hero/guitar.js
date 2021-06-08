const chart = document.querySelector(".chart");

let offset = 0;
let resolution = 0;
let BPM = {};
let UPS = 0;
let expertSingle = "";

let currentBPMIndex = -1;

let hiperSpeed = 5;
let extraOffset = 0.4;

function calculateUPS(){
    currentBPMIndex++;
    let UPM = BPM[currentBPMIndex][1] * resolution;
    UPS = UPM / 60;
}

function reset(){
    BPM = {};
    currentBPMIndex = -1;

    song.value = "";
    ini.value = "";

    audio.pause();
    audio.currentTime = 0;
}

chart.addEventListener("change", function (e) {
    reset();

    const noteClone = document.querySelectorAll(".note-clone");

    if(noteClone.length > 0){
        noteClone.forEach(el => el.remove());
    }

    const reader = new FileReader();
    reader.onload = function(){
        const rChart = reader.result;

        offset = rChart.match(/Offset = .*/g);
        offset = offset[0].match(/\d+\.?(\d?)+/g)[0] * 1;

        resolution = rChart.match(/Resolution = .*/g);
        resolution = resolution[0].match(/\d+/g)[0] * 1;

        let rBPM = rChart.match(/\d+ = B \d+/g);
        
        for(let i = 0; i < rBPM.length; i++){
            let time = rBPM[i].match(/\d+/)[0];

            let theBPM = rBPM[i].match(/B \d+/);
            theBPM = theBPM[0].match(/\d+/)[0] / 1000;
            
            BPM[i] = [time, theBPM];
        }

        calculateUPS();

        expertSingle = rChart.match(/\[ExpertSingle][\s\S]*?(?=})/g);
        expertSingle = expertSingle[0].match(/\d+ = .*/g);
    }
    reader.readAsText(chart.files[0]);
}, false);

const song = document.querySelector(".song");
const audio = document.createElement("audio");

song.addEventListener("change", function (e) {
    const reader = new FileReader();
    reader.onload = function(){
        audio.src = reader.result;
    }
    reader.readAsDataURL(song.files[0]);
}, false);

const playButton = document.querySelector(".play");

const greenNote = document.querySelector(".green-note");
const redNote = document.querySelector(".red-note");
const yellowNote = document.querySelector(".yellow-note");
const blueNote = document.querySelector(".blue-note");
const orangeNote = document.querySelector(".orange-note");

playButton.addEventListener("click", function (e) {
    if(audio.paused && !song.value == ""){
        audio.play();
    }
}, false);

audio.onplay = function() {
    let timeTemp = 0;

    for(let i = 1; i <= expertSingle.length; i++){
        let time = expertSingle[i-1].match(/\d+/)[0] * 1;

        if(BPM[currentBPMIndex + 1] != undefined && timeTemp != time && time >= BPM[currentBPMIndex + 1][0]){
            oldBPMTiming = BPM[currentBPMIndex + 1][0] / UPS;

            calculateUPS();

            newBPMTiming = BPM[currentBPMIndex][0] / UPS;

            offset += oldBPMTiming - newBPMTiming;
        }

        timeTemp = time;
        
        time = (time / UPS) + offset - audio.currentTime + extraOffset;

        if(expertSingle[i-1].includes("N 0")){
            let note = greenNote.cloneNode(true);

            note.style.animation = `scrolling ${time}s linear`;
            note.style.transform = `translateZ(-${time * hiperSpeed}em)`;
            note.classList.add("note-clone");

            note.addEventListener("animationend", function() {
                note.remove();
            }, false);

            greenNote.after(note);
        }
        else if(expertSingle[i-1].includes("N 1")){
            let note = redNote.cloneNode(true);

            note.style.animation = `scrolling ${time}s linear`;
            note.style.transform = `translateZ(-${time * hiperSpeed}em)`;
            note.classList.add("note-clone");

            note.addEventListener("animationend", function() {
                note.remove();
            }, false);

            redNote.after(note);
        }
        else if(expertSingle[i-1].includes("N 2")){
            let note = yellowNote.cloneNode(true);

            note.style.animation = `scrolling ${time}s linear`;
            note.style.transform = `translateZ(-${time * hiperSpeed}em)`;
            note.classList.add("note-clone");

            note.addEventListener("animationend", function() {
                note.remove();
            }, false);
            
            yellowNote.after(note);
        }
        else if(expertSingle[i-1].includes("N 3")){
            let note = blueNote.cloneNode(true);
            
            note.style.animation = `scrolling ${time}s linear`;
            note.style.transform = `translateZ(-${time * hiperSpeed}em)`;
            note.classList.add("note-clone");

            note.addEventListener("animationend", function() {
                note.remove();
            }, false);
            
            blueNote.after(note);
        }
        else if(expertSingle[i-1].includes("N 4")){
            let note = orangeNote.cloneNode(true);
            
            note.style.animation = `scrolling ${time}s linear`;
            note.style.transform = `translateZ(-${time * hiperSpeed}em)`;
            note.classList.add("note-clone");

            note.addEventListener("animationend", function() {
                note.remove();
            }, false);
            
            orangeNote.after(note);
        }
    }
};

const ini = document.querySelector(".ini");

ini.addEventListener("change", function (e) {
    const reader = new FileReader();
    reader.onload = function(){
        const rIni = reader.result;

        if(rIni.includes("offset")){
            offset = rIni.match(/delay ?= ?\d+/g);
            offset = offset[0].match(/\d+/)[0];
            offset = offset / 1000;
        }
    }
    reader.readAsText(ini.files[0]);
}, false);