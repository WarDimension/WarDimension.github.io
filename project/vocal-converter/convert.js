const vocal = document.querySelector(".vocal");
const result = document.querySelector(".result");

let srt = "";

vocal.addEventListener("change", function (e) {
    const reader = new FileReader();
    reader.onload = function(){
        const rVocal = reader.result;

        if(vocal.files[0].name.includes(".xml")){
            let lyrics = rVocal.match(/time.*"/g);
    
            let firstLine = true;
    
            let i = 1;
    
            let lyric = "";
    
            lyrics.forEach(syllable => {
                if(firstLine){
                    let time = syllable.match(/\d+.\d+/);
    
                    time = sec2time(time[0]);
    
                    srt += `${i}\n${time} --> `;
    
                    firstLine = false;
    
                    lyric = "";
                }
    
                lrc = syllable.match(/lyric="\w+[-+=]?"/);
                lyric += lrc[0].replace(/lyric="(\w+)[-+=]?"/, "$1");

                if(lrc[0].match(/"\w+"/)){
                    lyric += " ";
                }
    
                if(syllable.includes("+")){
                    let time = syllable.match(/\d+.\d+/);
    
                    time = sec2time(time[0]);
    
                    srt += `${time}\n${lyric}\n\n`;
    
                    firstLine = true;
    
                    i++;
                }
            });
        }
        downloadToFile(srt, vocal.files[0].name.replace(/.\w+$/, ".srt"), "text/plain");
    }
    reader.readAsText(vocal.files[0]);
}, false);

const downloadToFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], {type: contentType});
    
    a.href= URL.createObjectURL(file);
    a.download = filename;
    a.click();
    
    URL.revokeObjectURL(a.href);
};

function sec2time(timeInSeconds) {
    var pad = function(num, size) { return ('000' + num).slice(size * -1); },
    time = parseFloat(timeInSeconds).toFixed(3),
    hours = Math.floor(time / 60 / 60),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60),
    milliseconds = time.slice(-3);

    return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2) + ',' + pad(milliseconds, 3);
}