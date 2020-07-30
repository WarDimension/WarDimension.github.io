var shiftKey = 0;
var highestNote = "C4";
var highestOctave = 3;

// LOAD SAMPLES

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

var samples = "stage-grand";

function loadSamples(){
    var audio;
    var src = "";
    for(var i = 1; i <= highestOctave; i++){
        notes.forEach(note => {
            src = "./notes/" + samples + "/" + note.replace("#", "%23") + i.toString() + ".ogg";
            audio = new Audio(src);
            audio.load();
            audio.remove();
        });
    }
    src = "./notes/" + samples + "/" + highestNote + ".ogg";
    audio = new Audio(src);
    audio.load();
    audio.remove();
}

loadSamples();

// END LOAD SAMPLES