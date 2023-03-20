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

window.addEventListener("click", (e) => {
  effect(false);
  player.playVideo();
});

var hellGate = document.querySelector(".hell-gate");
var satan = document.querySelector(".sixsixsix");

function sellYourSoul(){
  hellGate.focus();
}

function defyingGod(){
  effect(true);
}

function fallenAngel(){
  effect(false);
}

function effect(effect = true){
  if(effect || document.activeElement.className == "hell-gate"){
    document.body.style.filter = "contrast(2)";
    document.body.style.backdropFilter = "contrast(2)";
    satan.scrollIntoView();
  }
  else{
    document.body.style.filter = "";
    document.body.style.backdropFilter = "";
  }
}

var skip = document.getElementsByClassName("skip");

//hey... you found the code, it's cheating tho, but good job... here's a very secret video for you: https://youtube.com/clip/UgkxcBtAVHSNYBsZXEd7eKj9WL9lImAzK_Ji
function doYouWishToAscend(){
  if(hellGate.value.match(/ascend$/i)){
    localStorage.setItem("ascend1", "true");
    window.open("https://wardimension.github.io/👁","_top");
  }
}

window.addEventListener('contextmenu', e => {
  e.preventDefault();
  player.playVideo();
});