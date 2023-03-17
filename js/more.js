const blurEl = document.querySelector('.blur');

let tabableTemp;

function openMore(songTitle = ""){
    blurEl.style.display = 'block';
    tabableTemp = tabable;
    tabable = ".more-content > a, .close-more";
    setMoreTabIndex("1");
    event.stopPropagation();

    if(songTitle != ""){
        buildMoreSongs(songTitle);
    }
}

function buildMoreSongs(songTitle){
    const content = blurEl.querySelector(".more-content");

    let song = songsData.find(song => {
        return song.title == songTitle;
    });
    
    content.innerHTML = platformTemplate(song, 0, "おっぱい");
    content.innerHTML += platformTemplate(song, 1, "おっぱい");

    let platforms = content.querySelectorAll("a");
    let firstRhythmGame;

    for(let i = platforms.length - 1; i >= 0; i--){
        console.log(platforms[i].innerHTML);
        if(["Rocksmith", "Clone Hero", "osu!"].some(x => platforms[i].innerHTML.includes(x))) {
            firstRhythmGame = platforms[i];
        }
    }

    if(firstRhythmGame != undefined){
        let musicH3 = document.createElement("h3");
        musicH3.innerHTML = "Music";
        content.prepend(musicH3);

        let rhythmGamesH3 = document.createElement("h3");
        rhythmGamesH3.innerHTML = "Rhythm Games";
        content.insertBefore(rhythmGamesH3, firstRhythmGame);
    }

}

function closeMore(){
    blurEl.style.display = 'none';
    tabable = tabableTemp;
    setMoreTabIndex("-1");
}

window.addEventListener("keydown", (e) => {
    if(e.key == "Escape") {
        closeMore();
    }
});

function setMoreTabIndex(value){
    let elms = blurEl.querySelectorAll("a, .close-more");
    elms.forEach(el => {
        el.tabIndex = value;
    });
}

setMoreTabIndex("-1");