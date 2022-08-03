var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'XjD05_I7X4w',
    playerVars: {
      'rel': 0,
      'controls': 0
    },
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

var play = false;

function playAndStopVideo(){
    if(play){
      player.stopVideo();
      play = false;
      return;
    }

    player.playVideo();
}

function onPlayerStateChange(event){
  if(event.data == YT.PlayerState.ENDED){
    player.stopVideo();
    play = false;
  }
  else if(event.data == YT.PlayerState.PLAYING){
    play = true;
  }
}