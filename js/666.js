var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: "HmlSNmbTUw4",
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

function onPlayerReady(event){
  event.target.playVideo();
}

function onPlayerStateChange(event){
  if (event.data == YT.PlayerState.ENDED){
    player.playVideo();
  }
}

function stopVideo(){
  player.stopVideo();
}

const block = document.querySelector(".block");

window.addEventListener("click", (e) => {
  player.playVideo();
});

function effect(effect = true){
  if(effect){
    document.body.style.filter = "contrast(2)";
    document.body.style.backdropFilter = "contrast(2)";
  }
  else{
    document.body.style.filter = "";
    document.body.style.backdropFilter = "";
  }
}
var skip = document.getElementsByClassName("skip");
skip[0].addEventListener("keypress", (e) => {
  if (e.key == "Enter"){
    effect(false);
  }
});
window.addEventListener("keydown", (e) => {
  var active = document.activeElement;
  if (e.keyCode == "37" || ( e.shiftKey && e.keyCode == "9") || e.keyCode == "39" || e.keyCode == "9"){
    if(active.className == "sixsixsix"){
      effect(true);
    }
    else{
      effect(false);
    }
  }
  else if(e.key == "Enter" && active.className == "skip"){
    effect(true);
  }
});