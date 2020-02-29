var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'HmlSNmbTUw4',
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'showinfo': 0,
            'loop': 1,
            'rel': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

var done = false;

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        player.playVideo();
    }
}

function stopVideo() {
    player.stopVideo();
}

const block = document.querySelector(".block");

window.addEventListener("click", (e) => {
    player.playVideo();
});

window.addEventListener("touchmove", (e) => {
    player.playVideo();
});