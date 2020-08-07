window.mobileAndTabletCheck = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

var mvp = document.getElementById("vp");
if(mobileAndTabletCheck() && screen.width < 920){
    mvp.setAttribute("content","width=920, user-scalable=no");
}
else if(screen.width < 1280){
    mvp.setAttribute("content","width=1280, user-scalable=no");
}

window.addEventListener("resize", () => {
    if(mobileAndTabletCheck() && screen.width < 920){
        mvp.setAttribute("content","width=920, user-scalable=no");
    }
    else if(screen.width < 1280){
        mvp.setAttribute("content","width=1280, user-scalable=no");
    }
    else{
        mvp.setAttribute("content","width=device-width, initial-scale=1.0, user-scalable=no");
    }
});

const keysContainer = document.querySelector(".keys-container");
const controls = document.querySelector(".controls");

if(mobileAndTabletCheck()){
    keysContainer.style.marginTop = "0";
    controls.style.display = "none";
}

window.addEventListener("mousedown", () => {
    isMouseDown = true;
    playNote("blank");
});

const keys = document.querySelectorAll(".key");
const pedal = document.querySelector(".pedal");

var isMouseDown = false;

keys.forEach(key => {
    key.addEventListener("mousedown", () => {
        playNote(key.attributes.note.value);
    });
 
    window.addEventListener("mouseup", () => {
        stopNote(key.attributes.note.value);
        isMouseDown = false;
    });

    key.addEventListener("mouseenter", () => {
        if(isMouseDown){
            playNote(key.attributes.note.value);
        }
    });

    key.addEventListener("mouseleave", () => {
        stopNote(key.attributes.note.value);
    });
});

pedal.addEventListener("mousedown", () => {
    if(!keyPress.className.includes("space")){
        keyPress.classList.add("space");
        pedal.style.borderBottomColor = "#babac9";
    }
    else{
        keyPress.classList.remove("space");
        pedal.style.borderBottomColor = "";
    }
});

// CONSOLE NOTES

console.log("%cYoo!", "font-size: 30px");
console.log(
    "You can play with these:" +
    "\n\n" +
    "fadeOutTime = int;\n" +
    "//control the release (millisecond)" +
    "\n\n" +
    "playNote(\"note\");\n" +
    "//play a note; note example: C1" +
    "\n\n" +
    "stopNote(\"note\");\n" +
    "//stop a note; call this after playing a note"
);

// END CONSOLE NOTES

const keyPress = document.querySelector(".key-press");
const samplesText = document.querySelector(".samples");
const playModeText = document.querySelector(".play-mode");
const rangeContainer = document.querySelector(".range-container");
const leftRange = document.querySelector(".left-range");
const rightRange = document.querySelector(".right-range");
const keySignatureContainer = document.querySelector(".key-signature-container");
const keySignatureText = document.querySelector(".key-signature");
const modesContainer = document.querySelector(".modes-container");
const modesText = document.querySelector(".modes");
const up = document.querySelectorAll(".up");
const down = document.querySelectorAll(".down");

const controlsImg = document.querySelector(".controls-img");
const controlsButton = document.querySelector(".controls-button");
const expand = document.querySelector(".expand");

const maxShift = 3;
const maxShiftRight = 4;
const highestNote = "C6";
const highestOctave = 5;
const samplesList = ["stage-grand", "electric"];
const samplesName = ["Stage Grand", "Electric"];

var fadeOutTime = 30;

var samples = 0;
var shiftKey = 0;
var shiftKeyRight = 0;
var semiShiftKey = 0;
var diatonic = true;
var keySignature = 0;
var modes = 0;

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const modesList = ["Major", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Minor", "Locrian"];

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

function setArrow(index, position, max){
    if(position == 0){
        up[index].style.color = "";
        down[index].style.color = "#565647";
    }
    else if(position == max){
        up[index].style.color = "#565647";
        down[index].style.color = "";
    }
    else{
        up[index].style.color = "";
        down[index].style.color = "";
    }
}

function samplesChange(direction){
    if(direction == "up" && samples < samplesList.length - 1){
        samples++;
        loadSamples(samplesList[samples]);
    }
    else if(direction == "down" && samples > 0){
        samples--;
        loadSamples(samplesList[samples]);
    }
    else if(direction != "up" && direction != "down" && direction != "update"){
        console.log("Hey... What's up?");
    }

    samplesText.innerHTML = samplesName[samples];

    setArrow(0, samples, samplesList.length - 1);

    fadeOutAll();

    save();
}

function playMode(direction){
    if(direction == "up"){
        diatonic = false;
    }
    else if(direction == "down"){
        diatonic = true;
    }
    else if(direction != "up" && direction != "down" && direction != "update"){
        console.log("Hey... What's up?");
    }

    if(diatonic){
        rangeContainer.style.display = "";
        keySignatureContainer.style.display = "";
        modesContainer.style.display = "";

        playModeText.innerHTML = "Diatonic";
        controlsImg.src = "diatonic.png";
        
        setArrow(1, 0, 1);
    }
    else{
        rangeContainer.style.display = "inline-block";
        keySignatureContainer.style.display = "none";
        modesContainer.style.display = "none";

        playModeText.innerHTML = "Chromatic";
        controlsImg.src = "chromatic.png";
        
        setArrow(1, 1, 1);
    }

    fadeOutAll();

    shiftingRight("update");
    save();
}

function shifting(direction){
    if(direction == "up" && shiftKey < maxShift){
        shiftKey++;
    }
    else if(direction == "down" && shiftKey > 0){
        shiftKey--;
    }
    else if(direction != "up" && direction != "down" && direction != "update"){
        console.log("Hey... What's up?");
    }

    if(shiftKey == maxShift){
        leftRange.innerHTML = "C"+ (shiftKey + 1) + "-" + highestNote;
    }
    else{
        leftRange.innerHTML = "C" + (shiftKey + 1) + "-G" + (shiftKey + 3);
    }

    setArrow(2, shiftKey, maxShift);

    fadeOutAll();

    save();
}

function getNoteShift(rightKey){
    rightKey--;

    var index = semiShiftKey + rightKey;

    if(index >= notes.length){
        index -= notes.length;
    }

    return notes[index];
}

function getOctaveShift(rightKey){
    var octave = shiftKeyRight + 1;

    rightKey--;

    if(semiShiftKey >= notes.length - rightKey){
        octave++;
    }

    return octave;
}

function shiftingRight(direction){
    if(diatonic && direction == "up" && shiftKeyRight < maxShiftRight){
        shiftKeyRight++;
    }
    else if(diatonic && direction == "down" && shiftKeyRight > 0){
        shiftKeyRight--;
    }
    else if(direction == "up" && (shiftKeyRight < maxShiftRight || semiShiftKey < notes.length - 8)){
        semiShiftKey++;

        if(semiShiftKey >= notes.length){
            semiShiftKey -= notes.length;
            shiftKeyRight++;
        }
    }
    else if(direction == "down" && (shiftKeyRight > 0 || semiShiftKey > 0)){
        semiShiftKey--;

        if(semiShiftKey < 0){
            semiShiftKey += notes.length;
            shiftKeyRight--;
        }
    }
    else if(direction != "up" && direction != "down" && direction != "update"){
        console.log("Hey... What's up?");
    }

    if(diatonic){
        if(shiftKeyRight == maxShiftRight){
            var note = scales[keySignature][modes][0];
            rightRange.innerHTML = note + (shiftKeyRight + 1 + octave(note)) + "-" + highestNote;
        }
        else{
            var note = scales[keySignature][modes][0];
            var note1 = scales[keySignature][modes][1];
            rightRange.innerHTML = note + (shiftKeyRight + 1 + octave(note)) + "-" + note1 + (shiftKeyRight + 2 + octave(note1));
        }
    }
    else{
        var maxNoteIndex = semiShiftKey + 8;

        if(maxNoteIndex >= notes.length){
            maxNoteIndex -= notes.length;
        }

        var maxNote = notes[maxNoteIndex];

        var maxOctave = shiftKeyRight + 1;

        if(semiShiftKey >= notes.length - 8){
            maxOctave++;
        }

        rightRange.innerHTML = notes[semiShiftKey] + (shiftKeyRight + 1) + "-" + maxNote + maxOctave;
    }

    setArrow(5, shiftKeyRight, maxShiftRight);

    fadeOutAll();
    
    save();
}

function keySignatureChange(direction){
    if(direction == "up" && keySignature < notes.length - 1){
        keySignature++;
    }
    else if(direction == "down" && keySignature > 0){
        keySignature--;
    }
    else if(direction != "up" && direction != "down" && direction != "update"){
        console.log("Hey... What's up?");
    }

    keySignatureText.innerHTML = notes[keySignature];

    setArrow(3, keySignature, notes.length - 1);

    fadeOutAll();

    shiftingRight("update");
    save();
}

function modesChange(direction){
    if(direction == "up"){
        modes = 1;
    }
    else if(direction == "down"){
        modes = 0;
    }
    else if(direction != "up" && direction != "down" && direction != "update"){
        console.log("Hey... What's up?");
    }

    modesText.innerHTML = modesList[modes];

    setArrow(4, modes, modesList.length - 1);

    fadeOutAll();
    
    save();
}

function update(){
    if(localStorage.getItem("samples") != null){
        samples = parseInt(localStorage.getItem("samples"));
    }
    if(localStorage.getItem("shiftKey") != null){
        shiftKey = parseInt(localStorage.getItem("shiftKey"));
    }
    if(localStorage.getItem("shiftKeyRight") != null){
        shiftKeyRight = parseInt(localStorage.getItem("shiftKeyRight"));
    }
    if(localStorage.getItem("semiShiftKey") != null){
        semiShiftKey = parseInt(localStorage.getItem("semiShiftKey"));
    }
    if(localStorage.getItem("diatonic") != null){
        diatonic = localStorage.getItem("diatonic") == "true";
    }
    if(localStorage.getItem("keySignature") != null){
        keySignature = parseInt(localStorage.getItem("keySignature"));
    }
    if(localStorage.getItem("modes") != null){
        modes = parseInt(localStorage.getItem("modes"));
    }
    samplesChange("update");
    playMode("update");
    shifting("update");
    shiftingRight("update");
    keySignatureChange("update");
    modesChange("update");
}

function save(){
    localStorage.setItem("samples", samples);
    localStorage.setItem("shiftKey", shiftKey);
    localStorage.setItem("shiftKeyRight", shiftKeyRight);
    localStorage.setItem("semiShiftKey", semiShiftKey);
    localStorage.setItem("diatonic", diatonic);
    localStorage.setItem("keySignature", keySignature);
    localStorage.setItem("modes", modes);
}

update();

function showControls(){
    if(controlsImg.style.display != "block"){
        controlsImg.style.display = "block";
        expand.innerHTML = "expand_less";
    }
    else{
        controlsImg.style.display = "";
        expand.innerHTML = "expand_more";
    }
}

// LOAD SAMPLES

var audioSamples = [];

function loadSamples(samples){
    if(audioSamples.length > 0){
        audioSamples.forEach(audio => {
            audio.remove();
        });
        audioSamples = [];
    }
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

loadSamples(samplesList[samples]);

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

function fadeOutAll(){
    if(fadeOutTimer == undefined){
        fadeOutAudio = audio;
        audio = [];
        fadeOutTimer = setInterval(fadeOut, fadeOutTime);
    }
    keys.forEach(key => {
        key.style.background = "";
    });
}

function getNote(note, oct, right){
    if(diatonic){
        note = scales[keySignature][modes][note];
        oct = oct + octave(note);
    }

    if(!diatonic && shiftKey > 0 && !right){
        oct = oct + shiftKey;
    }
    else if(diatonic && shiftKeyRight > 0 && right){
        oct = oct + shiftKeyRight;
    }

    if(note + oct != highestNote && oct > highestOctave){
        return false;
    }

    return note + oct;
}

function setNote(note, oct, right = false){
    note = getNote(note, oct, right);

    if(!note){
        return;
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

function unsetNote(note, oct, right = false){
    note = getNote(note, oct, right);

    if(!note){
        return;
    }

    stopNote(note);
    const key = document.querySelector("[note='" + note + "']");
    key.style.background = "";
}

function keyLower(key, code){
    key = key.toLowerCase();

    var keyNum = [")", "!",  "@",  "#",  "$",  "%",  "^",  "&",  "*",  "("];

    if(key == "<"){
        key = ",";
    }
    else if(key == ">"){
        key = ".";
    }
    else if(key == "?"){
        key = "/";
    }
    else if(key == ":"){
        key = ";";
    }
    else if(key == '"'){
        key = "'";
    }
    else if(key == "{"){
        key = "[";
    }
    else if(key == "}"){
        key = "]";
    }
    else if(key == "|"){
        key = "\\";
    }
    else if(key == "_"){
        key = "-";
    }
    else if(key == "+"){
        key = "=";
    }
    else if(code.includes("Numpad")){
        key = code.toLowerCase();
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

window.addEventListener("keydown", (e) => {
    var key = keyLower(e.key, e.code);

    if(!loadDone){
        return;
    }
    else if(key == " "){
        e.preventDefault();

        keyPress.classList.add("space");

        pedal.style.borderBottomColor = "#babac9";
    }
    else if(key == "f2"){
        e.preventDefault();

        samplesChange("up");
    }
    else if(key == "f1"){
        e.preventDefault();

        samplesChange("down");
    }
    else if(key == "pageup"){
        e.preventDefault();

        playMode("up");
    }
    else if(key == "pagedown"){
        e.preventDefault();
        
        playMode("down");
    }
    else if(key == "home"){
        e.preventDefault();
        
        shiftingRight("up");
    }
    else if(key == "end"){
        e.preventDefault();
        
        shiftingRight("down");
    }
    else if(diatonic){
        if(key == "arrowup"){
            e.preventDefault();
            
            keySignatureChange("up");
        }
        else if(key == "arrowdown"){
            e.preventDefault();
    
            keySignatureChange("down");
        }
        else if(key == "arrowleft"){
            e.preventDefault();
    
            modesChange("down");
        }
        else if(key == "arrowright"){
            e.preventDefault();
    
            modesChange("up");
        }
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
        else if(key == "numpad1" && !keyPress.className.includes(" numpad1")){
            keyPress.classList.add("numpad1");
            setNote(0, 1, true);
        }
        else if(key == "numpad2" && !keyPress.className.includes(" numpad2")){
            keyPress.classList.add("numpad2");
            setNote(1, 1, true);
        }
        else if(key == "numpad3" && !keyPress.className.includes(" numpad3")){
            keyPress.classList.add("numpad3");
            setNote(2, 1, true);
        }
        else if(key == "numpad4" && !keyPress.className.includes(" numpad4")){
            keyPress.classList.add("numpad4");
            setNote(3, 1, true);
        }
        else if(key == "numpad5" && !keyPress.className.includes(" numpad5")){
            keyPress.classList.add("numpad5");
            setNote(4, 1, true);
        }
        else if(key == "numpad6" && !keyPress.className.includes(" numpad6")){
            keyPress.classList.add("numpad6");
            setNote(5, 1, true);
        }
        else if(key == "numpad7" && !keyPress.className.includes(" numpad7")){
            keyPress.classList.add("numpad7");
            setNote(6, 1, true);
        }
        else if(key == "numpad8" && !keyPress.className.includes(" numpad8")){
            keyPress.classList.add("numpad8");
            setNote(0, 2, true);
        }
        else if(key == "numpad9" && !keyPress.className.includes(" numpad9")){
            keyPress.classList.add("numpad9");
            setNote(1, 2, true);
        }
    }
    else{
        if(key == "arrowup"){
            e.preventDefault();
            
            shifting("up");
        }
        else if(key == "arrowdown"){
            e.preventDefault();
    
            shifting("down");
        }
        else if(key == "arrowright"){
            e.preventDefault();
            
            shiftingRight("up");
        }
        else if(key == "arrowleft"){
            e.preventDefault();
            
            shiftingRight("down");
        }
        else if(key == "z" && !keyPress.className.includes(" z")){
            keyPress.classList.add("z");
            setNote("C", 1);
        }
        else if(key == "s" && !keyPress.className.includes(" s")){
            keyPress.classList.add("s");
            setNote("C#", 1);
        }
        else if(key == "x" && !keyPress.className.includes(" x")){
            keyPress.classList.add("x");
            setNote("D", 1);
        }
        else if(key == "d" && !keyPress.className.includes(" d")){
            keyPress.classList.add("d");
            setNote("D#", 1);
        }
        else if(key == "c" && !keyPress.className.includes(" c")){
            keyPress.classList.add("c");
            setNote("E", 1);
        }
        else if(key == "v" && !keyPress.className.includes(" v")){
            keyPress.classList.add("v");
            setNote("F", 1);
        }
        else if(key == "g" && !keyPress.className.includes(" g")){
            keyPress.classList.add("g");
            setNote("F#", 1);
        }
        else if(key == "b" && !keyPress.className.includes(" b")){
            keyPress.classList.add("b");
            setNote("G", 1);
        }
        else if(key == "h" && !keyPress.className.includes(" h")){
            keyPress.classList.add("h");
            setNote("G#", 1);
        }
        else if(key == "n" && !keyPress.className.includes(" n")){
            keyPress.classList.add("n");
            setNote("A", 1);
        }
        else if(key == "j" && !keyPress.className.includes(" j")){
            keyPress.classList.add("j");
            setNote("A#", 1);
        }
        else if(key == "m" && !keyPress.className.includes(" m")){
            keyPress.classList.add("m");
            setNote("B", 1);
        }
        else if(key == "," && !keyPress.className.includes(" ,")){
            keyPress.classList.add(",");
            setNote("C", 2);
        }
        else if(key == "l" && !keyPress.className.includes(" l")){
            keyPress.classList.add("l");
            setNote("C#", 2);
        }
        else if(key == "." && !keyPress.className.includes(" .")){
            keyPress.classList.add(".");
            setNote("D", 2);
        }
        else if(key == ";" && !keyPress.className.includes(" ;")){
            keyPress.classList.add(";");
            setNote("D#", 2);
        }
        else if(key == "/" && !keyPress.className.includes(" /")){
            keyPress.classList.add("/");
            setNote("E", 2);
        }
        else if(key == "q" && !keyPress.className.includes(" q")){
            keyPress.classList.add("q");
            setNote("C", 2);
        }
        else if(key == "2" && !keyPress.className.includes(" 2")){
            keyPress.classList.add("2");
            setNote("C#", 2);
        }
        else if(key == "w" && !keyPress.className.includes(" w")){
            keyPress.classList.add("w");
            setNote("D", 2);
        }
        else if(key == "3" && !keyPress.className.includes(" 3")){
            keyPress.classList.add("3");
            setNote("D#", 2);
        }
        else if(key == "e" && !keyPress.className.includes(" e")){
            keyPress.classList.add("e");
            setNote("E", 2);
        }
        else if(key == "r" && !keyPress.className.includes(" r")){
            keyPress.classList.add("r");
            setNote("F", 2);
        }
        else if(key == "5" && !keyPress.className.includes(" 5")){
            keyPress.classList.add("5");
            setNote("F#", 2);
        }
        else if(key == "t" && !keyPress.className.includes(" t")){
            keyPress.classList.add("t");
            setNote("G", 2);
        }
        else if(key == "6" && !keyPress.className.includes(" 6")){
            keyPress.classList.add("6");
            setNote("G#", 2);
        }
        else if(key == "y" && !keyPress.className.includes(" y")){
            keyPress.classList.add("y");
            setNote("A", 2);
        }
        else if(key == "7" && !keyPress.className.includes(" 7")){
            keyPress.classList.add("7");
            setNote("A#", 2);
        }
        else if(key == "u" && !keyPress.className.includes(" u")){
            keyPress.classList.add("u");
            setNote("B", 2);
        }
        else if(key == "i" && !keyPress.className.includes(" i")){
            keyPress.classList.add("i");
            setNote("C", 3);
        }
        else if(key == "9" && !keyPress.className.includes(" 9")){
            keyPress.classList.add("9");
            setNote("C#", 3);
        }
        else if(key == "o" && !keyPress.className.includes(" o")){
            keyPress.classList.add("o");
            setNote("D", 3);
        }
        else if(key == "0" && !keyPress.className.includes(" 0")){
            keyPress.classList.add("0");
            setNote("D#", 3);
        }
        else if(key == "p" && !keyPress.className.includes(" p")){
            keyPress.classList.add("p");
            setNote("E", 3);
        }
        else if(key == "[" && !keyPress.className.includes(" [")){
            keyPress.classList.add("[");
            setNote("F", 3);
        }
        else if(key == "=" && !keyPress.className.includes(" =")){
            keyPress.classList.add("=");
            setNote("F#", 3);
        }
        else if(key == "]" && !keyPress.className.includes(" ]")){
            keyPress.classList.add("]");
            setNote("G", 3);
        }
        else if(key == "numpad1" && !keyPress.className.includes(" numpad1")){
            keyPress.classList.add("numpad1");
            setNote(getNoteShift(1), getOctaveShift(1), true);
        }
        else if(key == "numpad2" && !keyPress.className.includes(" numpad2")){
            keyPress.classList.add("numpad2");
            setNote(getNoteShift(2), getOctaveShift(2), true);
        }
        else if(key == "numpad3" && !keyPress.className.includes(" numpad3")){
            keyPress.classList.add("numpad3");
            setNote(getNoteShift(3), getOctaveShift(3), true);
        }
        else if(key == "numpad4" && !keyPress.className.includes(" numpad4")){
            keyPress.classList.add("numpad4");
            setNote(getNoteShift(4), getOctaveShift(4), true);
        }
        else if(key == "numpad5" && !keyPress.className.includes(" numpad5")){
            keyPress.classList.add("numpad5");
            setNote(getNoteShift(5), getOctaveShift(5), true);
        }
        else if(key == "numpad6" && !keyPress.className.includes(" numpad6")){
            keyPress.classList.add("numpad6");
            setNote(getNoteShift(6), getOctaveShift(6), true);
        }
        else if(key == "numpad7" && !keyPress.className.includes(" numpad7")){
            keyPress.classList.add("numpad7");
            setNote(getNoteShift(7), getOctaveShift(7), true);
        }
        else if(key == "numpad8" && !keyPress.className.includes(" numpad8")){
            keyPress.classList.add("numpad8");
            setNote(getNoteShift(8), getOctaveShift(8), true);
        }
        else if(key == "numpad9" && !keyPress.className.includes(" numpad9")){
            keyPress.classList.add("numpad9");
            setNote(getNoteShift(9), getOctaveShift(9), true);
        }
    }
});

window.addEventListener("keyup", (e) => {
    var key = keyLower(e.key, e.code);

    if(e.key == " "){
        keyPress.classList.remove("space");
        pedal.style.borderBottomColor = "";
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
        else if(key == "numpad1"){
            keyPress.classList.remove("numpad1");
            unsetNote(0, 1, true);
        }
        else if(key == "numpad2"){
            keyPress.classList.remove("numpad2");
            unsetNote(1, 1, true);
        }
        else if(key == "numpad3"){
            keyPress.classList.remove("numpad3");
            unsetNote(2, 1, true);
        }
        else if(key == "numpad4"){
            keyPress.classList.remove("numpad4");
            unsetNote(3, 1, true);
        }
        else if(key == "numpad5"){
            keyPress.classList.remove("numpad5");
            unsetNote(4, 1, true);
        }
        else if(key == "numpad6"){
            keyPress.classList.remove("numpad6");
            unsetNote(5, 1, true);
        }
        else if(key == "numpad7"){
            keyPress.classList.remove("numpad7");
            unsetNote(6, 1, true);
        }
        else if(key == "numpad8"){
            keyPress.classList.remove("numpad8");
            unsetNote(0, 2, true);
        }
        else if(key == "numpad9"){
            keyPress.classList.remove("numpad9");
            unsetNote(1, 2, true);
        }
    }
    else{
        if(key == "z"){
            keyPress.classList.remove("z");
            unsetNote("C", 1);
        }
        else if(key == "s"){
            keyPress.classList.remove("s");
            unsetNote("C#", 1);
        }
        else if(key == "x"){
            keyPress.classList.remove("x");
            unsetNote("D", 1);
        }
        else if(key == "d"){
            keyPress.classList.remove("d");
            unsetNote("D#", 1);
        }
        else if(key == "c"){
            keyPress.classList.remove("c");
            unsetNote("E", 1);
        }
        else if(key == "v"){
            keyPress.classList.remove("v");
            unsetNote("F", 1);
        }
        else if(key == "g"){
            keyPress.classList.remove("g");
            unsetNote("F#", 1);
        }
        else if(key == "b"){
            keyPress.classList.remove("b");
            unsetNote("G", 1);
        }
        else if(key == "h"){
            keyPress.classList.remove("h");
            unsetNote("G#", 1);
        }
        else if(key == "n"){
            keyPress.classList.remove("n");
            unsetNote("A", 1);
        }
        else if(key == "j"){
            keyPress.classList.remove("j");
            unsetNote("A#", 1);
        }
        else if(key == "m"){
            keyPress.classList.remove("m");
            unsetNote("B", 1);
        }
        else if(key == ","){
            keyPress.classList.remove(",");
            unsetNote("C", 2);
        }
        else if(key == "l"){
            keyPress.classList.remove("l");
            unsetNote("C#", 2);
        }
        else if(key == "."){
            keyPress.classList.remove(".");
            unsetNote("D", 2);
        }
        else if(key == ";"){
            keyPress.classList.remove(";");
            unsetNote("D#", 2);
        }
        else if(key == "/"){
            keyPress.classList.remove("/");
            unsetNote("E", 2);
        }
        else if(key == "q"){
            keyPress.classList.remove("q");
            unsetNote("C", 2);
        }
        else if(key == "2"){
            keyPress.classList.remove("2");
            unsetNote("C#", 2);
        }
        else if(key == "w"){
            keyPress.classList.remove("w");
            unsetNote("D", 2);
        }
        else if(key == "3"){
            keyPress.classList.remove("3");
            unsetNote("D#", 2);
        }
        else if(key == "e"){
            keyPress.classList.remove("e");
            unsetNote("E", 2);
        }
        else if(key == "r"){
            keyPress.classList.remove("r");
            unsetNote("F", 2);
        }
        else if(key == "5"){
            keyPress.classList.remove("5");
            unsetNote("F#", 2);
        }
        else if(key == "t"){
            keyPress.classList.remove("t");
            unsetNote("G", 2);
        }
        else if(key == "6"){
            keyPress.classList.remove("6");
            unsetNote("G#", 2);
        }
        else if(key == "y"){
            keyPress.classList.remove("y");
            unsetNote("A", 2);
        }
        else if(key == "7"){
            keyPress.classList.remove("7");
            unsetNote("A#", 2);
        }
        else if(key == "u"){
            keyPress.classList.remove("u");
            unsetNote("B", 2);
        }
        else if(key == "i"){
            keyPress.classList.remove("i");
            unsetNote("C", 3);
        }
        else if(key == "9"){
            keyPress.classList.remove("9");
            unsetNote("C#", 3);
        }
        else if(key == "o"){
            keyPress.classList.remove("o");
            unsetNote("D", 3);
        }
        else if(key == "0"){
            keyPress.classList.remove("0");
            unsetNote("D#", 3);
        }
        else if(key == "p"){
            keyPress.classList.remove("p");
            unsetNote("E", 3);
        }
        else if(key == "["){
            keyPress.classList.remove("[");
            unsetNote("F", 3);
        }
        else if(key == "="){
            keyPress.classList.remove("=");
            unsetNote("F#", 3);
        }
        else if(key == "]"){
            keyPress.classList.remove("]");
            unsetNote("G", 3);
        }
        else if(key == "numpad1"){
            keyPress.classList.remove("numpad1");
            unsetNote(getNoteShift(1), getOctaveShift(1), true);
        }
        else if(key == "numpad2"){
            keyPress.classList.remove("numpad2");
            unsetNote(getNoteShift(2), getOctaveShift(2), true);
        }
        else if(key == "numpad3"){
            keyPress.classList.remove("numpad3");
            unsetNote(getNoteShift(3), getOctaveShift(3), true);
        }
        else if(key == "numpad4"){
            keyPress.classList.remove("numpad4");
            unsetNote(getNoteShift(4), getOctaveShift(4), true);
        }
        else if(key == "numpad5"){
            keyPress.classList.remove("numpad5");
            unsetNote(getNoteShift(5), getOctaveShift(5), true);
        }
        else if(key == "numpad6"){
            keyPress.classList.remove("numpad6");
            unsetNote(getNoteShift(6), getOctaveShift(6), true);
        }
        else if(key == "numpad7"){
            keyPress.classList.remove("numpad7");
            unsetNote(getNoteShift(7), getOctaveShift(7), true);
        }
        else if(key == "numpad8"){
            keyPress.classList.remove("numpad8");
            unsetNote(getNoteShift(8), getOctaveShift(8), true);
        }
        else if(key == "numpad9"){
            keyPress.classList.remove("numpad9");
            unsetNote(getNoteShift(9), getOctaveShift(9), true);
        }
    }
});