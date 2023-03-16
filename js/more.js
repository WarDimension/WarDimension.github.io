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
    
    content.innerHTML = platformTemplate(song);
    content.innerHTML += platformTemplate(song.url[0].more[0]);
    
    content.querySelector(".more-button").remove();

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