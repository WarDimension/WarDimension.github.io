const chart = document.querySelector(".chart");

chart.addEventListener("change", function (e) {
    const reader = new FileReader();
    reader.onload = function(){
        const rChart = reader.result;

        let offset = rChart.match(/Offset = .*/g);
        offset = offset[0].match(/\d+.?\d+/g)[0];

        console.log(offset);

        let expertSingle = rChart.match(/\[ExpertSingle]([\n\r].*)+}/g);
        expertSingle = expertSingle[0].match(/\d+ = .*/g);

        console.log(expertSingle);
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

playButton.addEventListener("click", function (e) {
    audio.play();
}, false);