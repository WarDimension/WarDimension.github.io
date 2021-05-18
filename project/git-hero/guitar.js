const chart = document.querySelector(".chart");

chart.addEventListener("change", function (e) {
    const reder = new FileReader();
    reder.onload = function(){
        const rChart = reder.result;

        let offset = rChart.match(/Offset = .*/g);
        offset = offset[0].match(/\d+.?\d+/g)[0];

        console.log(offset);

        let expertSingle = rChart.match(/\[ExpertSingle]([\n\r].*)+}/gm);
        expertSingle = expertSingle[0].match(/\d+ = .*/gm);

        console.log(expertSingle);
    }
    reder.readAsText(chart.files[0]);
}, false);

const song = document.querySelector(".song");
const audio = document.createElement("audio");

song.addEventListener("change", function (e) {
    const reder = new FileReader();
    reder.onload = function(){
        audio.src = reder.result;
    }
    reder.readAsDataURL(song.files[0]);
}, false);

const playButton = document.querySelector(".play");

playButton.addEventListener("click", function (e) {
    audio.play();
}, false);