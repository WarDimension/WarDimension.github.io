var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

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

var doYouWishToAscend = "";

window.addEventListener("keydown", (e) => {
  var active = document.activeElement;
  if(e.key.length == 1) doYouWishToAscend += e.key;

  if (e.key == "ArrowLeft" || ( e.shiftKey && e.key == "Tab") || e.key == "ArrowRight" || e.key == "Tab"){
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
  else if(e.key == "Enter" && active.className == "sixsixsix" && doYouWishToAscend.toLocaleLowerCase().match(/ascend$/)){
    localStorage.setItem("ascend1", "true");
    window.open("https://wardimension.github.io/👁","_top");
  }
});

window.addEventListener('contextmenu', e => {
  e.preventDefault();
  player.playVideo();
});