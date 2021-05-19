const chart = document.querySelector(".chart");

let offset = 0;
let UPS = 0;
let expertSingle = "";

let hiperSpeed = 5;
let extraOffset = 0.4;

chart.addEventListener("change", function (e) {
    const reader = new FileReader();
    reader.onload = function(){
        const rChart = reader.result;

        offset = rChart.match(/Offset = .*/g);
        offset = offset[0].match(/\d+\.?(\d?)+/g)[0] * 1;

        let resolution = rChart.match(/Resolution = .*/g);
        resolution = resolution[0].match(/\d+/g)[0] * 1;

        let BPM = rChart.match(/B \d+/g);
        BPM = BPM[0].match(/\d+/g)[0] / 1000;

        let UPM = BPM * resolution;
        UPS = UPM / 60;

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
    if(audio.paused){
        audio.play();
    }
}, false);

audio.onplay = function() {
    for(let i = 1; i <= expertSingle.length; i++){
        let time = expertSingle[i-1].match(/\d+/)[0];
        time = (time / UPS) + offset - audio.currentTime + extraOffset;

        if(expertSingle[i-1].includes("N 0")){
            let note = greenNote.cloneNode(true);
            note.style.animation = `scrolling ${time}s linear`;
            note.style.transform = `translateZ(-${time * hiperSpeed}em)`;
            greenNote.after(note);
        }
        else if(expertSingle[i-1].includes("N 1")){
            let note = redNote.cloneNode(true);
            note.style.animation = `scrolling ${time}s linear`;
            note.style.transform = `translateZ(-${time * hiperSpeed}em)`;
            redNote.after(note);
        }
        else if(expertSingle[i-1].includes("N 2")){
            let note = yellowNote.cloneNode(true);
            note.style.animation = `scrolling ${time}s linear`;
            note.style.transform = `translateZ(-${time * hiperSpeed}em)`;
            yellowNote.after(note);
        }
        else if(expertSingle[i-1].includes("N 3")){
            let note = blueNote.cloneNode(true);
            note.style.animation = `scrolling ${time}s linear`;
            note.style.transform = `translateZ(-${time * hiperSpeed}em)`;
            blueNote.after(note);
        }
        else if(expertSingle[i-1].includes("N 4")){
            let note = orangeNote.cloneNode(true);
            note.style.animation = `scrolling ${time}s linear`;
            note.style.transform = `translateZ(-${time * hiperSpeed}em)`;
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