const vocal = document.querySelector(".vocal");
const result = document.querySelector(".result");

function parseUnicode(str){
    return str.replace("&apos;", "'");
}

let isSyllableMode = true;
let originalDelay = 3;
let targetDelay = 2.85;

vocal.addEventListener("change", function (e) {
    const reader = new FileReader();
    reader.onload = function(){
        const rVocal = reader.result;
        let result = "";

        if(vocal.files[0].name.includes(".xml")){
            let lyrics = [], match, regex = /time="(.*)" note.*length="(.*)" lyric="(.*)"/g;

            while(match = regex.exec(rVocal)){
                lyrics.push({"time": match[1] * 1 - originalDelay + targetDelay, "length": match[2] * 1, "lyric": match[3]});
            }

            let phrase = "", srtTime, isFirstSyllable = true, firstSyllableIndex, srtIndex = 1;

            for(let i = 0; i < lyrics.length; i++){
                if(lyrics[i].lyric.includes("+")){
                    lyrics[i].lyric = lyrics[i].lyric.replace("+", "");
                    lyrics[i].join = "+";
                }
                else if(lyrics[i].lyric.includes("-") && lyrics[i].lyric != "-"){
                    lyrics[i].lyric = lyrics[i].lyric.replace(/-/, "");
                    lyrics[i].join = "-";
                }
                else{
                    lyrics[i].join = "";
                }

                phrase += parseUnicode(lyrics[i].lyric);

                let endTime;

                switch(lyrics[i].join){
                    case "+":
                        endTime = lyrics[i].time + lyrics[i].length;
                        break;
                    default:
                        endTime = lyrics[i+1].time;
                        break;
                }

                if(isFirstSyllable){
                    firstSyllableIndex = i;
                    isFirstSyllable = false;
                }
                
                if(lyrics[i].join == "+" || isSyllableMode){
                    srtTime = sec2time(lyrics[firstSyllableIndex].time) + " --> " + sec2time(endTime);
    
                    result +=`${srtIndex}\n${srtTime}\n${phrase}\n\n`;
                    srtIndex++;

                    isFirstSyllable = true;
                }

                switch(lyrics[i].join){
                    case "":
                        phrase += " ";
                        break;
                    case "+":
                        phrase = "";
                        break;
                }
            }
        }
        console.clear();
        console.log(result);
        downloadToFile(result, vocal.files[0].name.replace(/.\w+$/, ".srt"), "text/plain");
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