function platform(url, sprite, name){
  return `
    ${url != undefined ?
      `<a class="platform-url" href="${url}"  target="aboutblank">
        <i class="platform-icon i-${sprite}"></i>${name}
      </a>` : ``
    }
  `
}

function platformTemplate(song){
  return `
    ${platform(song.url[0].itunes, "itunes", "iTunes/Apple Music")}
    ${platform(song.url[0].deezer, "deezer", "Deezer")}
    ${platform(song.url[0].googlePlay, "google-play", "Google Play")}
    ${platform(song.url[0].spotify, "spotify", "Spotify")}
    ${platform(song.url[0].youtube, "youtube", "YouTube")}
    ${platform(song.url[0].youtubeMusic, "youtube-music", "YouTube Music")}
    ${platform(song.url[0].amazon, "amazon", "Amazon Music")}
    ${platform(song.url[0].bandLab, "bandlab", "BandLab")}
    ${platform(song.url[0].soundCloud, "soundcloud", "SoundCloud")}
    ${platform(song.url[0].rocksmith, "rocksmith", "Rocksmith")}
  `;
}

function songTemplate(song, index, songsData){
  return `
    <div class="content" id="${index}" tabIndex="0">
      ${
        songsData ? `${index != songsData.length-1 ? `<a class="skip-content" href="#${index+1}">next album</a>` : `<a class="skip-content" href="#top">return</a>`}` : ``
      }
      <div class="album-container">
        <img class="song-img" src="${song.img}" alt="${song.title} Album Art" ${song.img1 != undefined ? `onmouseover="src='${song.img1}'" onmouseout="src='${song.img}'"` : ``}/><!--
        --><b class="song-title-disk"><p class="song-title">${song.title}</p></b>
      </div>
      <div class="platform-container">
        <h3 class="available-on">Available on</h3>
        ${platformTemplate(song)}
      </div>
      ${
        songsData ? `${index == songsData.length-1 ? `<a class="skip-content" href="#top">return</a>` : ``}` : ``
      }
    </div>
  `;
}

function songDisplay(){
  if(original && sortNewest){
    content.innerHTML = `${songsData.slice(0).reverse().map(songTemplate).join("")}`;
  }
  else if(original && !sortNewest){
    content.innerHTML = `${songsData.map(songTemplate).join("")}`;
  }
  else if(!original && sortNewest){
      content.innerHTML = `${coversData.slice(0).reverse().map(songTemplate).join("")}`;
  }
  else{
    content.innerHTML = `${coversData.map(songTemplate).join("")}`;
  }
}

function songSort(){
  if(sortNewest){
    sortNewest = false;
    sortButton.innerHTML = "▲";
  }
  else{
    sortNewest = true;
    sortButton.innerHTML = "▼";
  }
  songDisplay();
}

function originalSong(){
  original = true;
  songDisplay();
  originalButton.style.background = "#000";
  originalButton.style.color = "#fff";
  originalButton.style.cursor = "default";
  coverButton.style.background = "#fff";
  coverButton.style.color = "#000";
  coverButton.style.cursor = "pointer";
}

function coverSong(){
  original = false;
  songDisplay();
  originalButton.style.background = "#fff";
  originalButton.style.color = "#000";
  originalButton.style.cursor = "pointer";
  coverButton.style.background = "#000";
  coverButton.style.color = "#fff";
  coverButton.style.cursor = "default";
}

function trackListTemplate(track, index){
  return `
    <tr class="track-list">
      <td class="track-number">${index+1}</td>
      <td class="track-name" tabIndex="0" id="${index+2}" onclick="setSong('${track.youtubeID}','${track.title.replace("'","&apos")}',${index},true)" onkeypress="event.key == 'Enter' && setSong('${track.youtubeID}','${track.title.replace("'","&apos")}',${index},true)">
        <div class="track-name-text">${track.title}</div>
        ${track.romanized != undefined ? `<div class="track-tooltip">${track.romanized}</div>` : ``}
      </td>
      <td class="track-length">${track.length}</td>
    </tr>
  `;
}

function trackTemplate(song){
  currentAlbum = song;
  return `
    <div class="content" id="track-container">
      <table class="track">
        <tbody class="track-body">
        <tr class="track-head">
          <th class="track-number-head">#</th>
          <th class="track-name-head">Track Name</th>
          <th class="track-length-head">Length</th>
        </tr>
        ${song.track.map(trackListTemplate).join("")}
        </tbody>
      </table>
      <a class="skip-content" id="track-skip-content" href="#top">return</a>
    </div>
  `;
}

var original = true;
var sortNewest = true;
var content = document.getElementById("content-container");
var originalButton = document.getElementById("original");
var coverButton = document.getElementById("cover");
var sortButton = document.getElementById("cover-button");
songDisplay();

if(url()["album"]){
  var found = false;
  var song;
  for(i = 0; i< songsData.length; i++){
    if(songsData[i].title.toUpperCase() == url()["album"].toUpperCase()){
      content.innerHTML = songTemplate(songsData[i],"0");
      found = true;
    }
    else if(songsData[i].alt && songsData[i].alt.toUpperCase() == url()["album"].toUpperCase()){
      content.innerHTML = songTemplate(songsData[i],"0");
      found = true;
    }
    if(found){
      content.innerHTML += trackTemplate(songsData[i]);
      break;
    }
  }
  if(!found){
    for(i = 0; i< coversData.length; i++){
      if(coversData[i].title.toUpperCase() == url()["album"].toUpperCase()){
        coverSong();
        content.innerHTML = songTemplate(coversData[i],"0");
        found = true;
      }
      else if(coversData[i].alt && coversData[i].alt.toUpperCase() == url()["album"].toUpperCase()){
        coverSong();
        content.innerHTML = songTemplate(coversData[i],"0");
        found = true;
      }
      if(found){
        content.innerHTML += trackTemplate(coversData[i]);
        break;
      }
    }
  }
  setParams(`?album=${url()["album"]}`);
}

if(url()["sort"] == "old"){
  songSort();
}

if(url()["type"] == "cover"){
  coverSong();
}

window.addEventListener("click", track);

window.addEventListener("keypress", (e) => {
  if (e.key == "Enter"){
    track(e);
  }
});

function track(e){
  var target = e.target;
  if(!url()["album"] && getParentClass(target, "content") == "content"){
    var song;
    if(original == true){
      if(sortNewest == true){
        song = songsData[(songsData.length - 1) - getParentIdByElement(target)];
      }
      else{
        song = songsData[getParentIdByElement(target)];
      }
    }
    else{
      if(sortNewest == true){
        song = coversData[(coversData.length - 1) - getParentIdByElement(target)];
      }
      else{
        song = coversData[getParentIdByElement(target)];
      }
    }
    content.innerHTML = songTemplate(song,"0");
    content.innerHTML += trackTemplate(song);
    setParams(`?album=${(song.alt ? song.alt : song.title).toLowerCase()}`);
    index = indexDefault;
  }
  else if(target.className != "platform-url" && getParentId(target, "track-container") != "track-container" && getParentId(target, "music-player") != "music-player" && target.className != "skip" && target.className != "skip-content"){
    songDisplay();
    setParams("");
    index = indexDefault;
  }
  else if(target.className == "skip"){
    index = 0;
  }
  else if(target.className == "skip-content"){
    index++;
  }
  else if(target.className == "track-name"){
    index = target.id;
  }else if(target.className == "track-name-text"){
    index = target.parentElement.id;
  }
}

const indexDefault = -1;

var index = indexDefault;

window.addEventListener("keydown", (e) => {
  var className = ".content";
  var html = document.querySelector("html");
  if(url()["album"]) className += ", .track-name"; html.style.scrollBehavior="auto";
  var album = document.querySelectorAll(className);
  var active = document.activeElement;
  var activeParentHeight = parseInt(active.parentElement.offsetHeight);
  var activeTop = parseInt(active.offsetTop);
  if(e.keyCode == "38"){
    e.preventDefault();
    if(url()["album"] && index == 2){
      index = 1;
    }
    else if(index <= 0){
      index = album.length;
      html.style.scrollBehavior="auto";
      if(active.className == "skip-content" && (activeParentHeight < activeTop)){
        index = 1;
      }
    }
    else if(active.className == "skip-content" && (activeParentHeight < activeTop)){
      index++;
    }
    index--;
    album[index].focus();
    document.activeElement.scrollIntoViewCenter();
    html.style.scrollBehavior="smooth";
  }
  else if(e.keyCode == "40"){
    e.preventDefault();
    if(url()["album"] && index == 0){
      index = 1;
    }
    else if(index == album.length - 1){
      index = indexDefault;
      html.style.scrollBehavior="auto";
    }
    index++;
    album[index].focus();
    document.activeElement.scrollIntoViewCenter();
    html.style.scrollBehavior="smooth";
  }
  else if(e.key == "Escape") {
    if(url()["album"]){
      track(e);
    }
    index = indexDefault;
  }
  else if (e.keyCode == "37" || ( e.shiftKey && e.keyCode == "9") || e.keyCode == "39" || e.keyCode == "9"){
    if(active.className == "skip-content" && url()["album"]){
      index = album.length - 1;
    }
    else if(getParentClass(active,"content") == "content" || active.className == "track-name"){
      index = getParentIdByElement(active);
    }
    else{
      index = indexDefault;
    }
  }
});

Element.prototype.documentOffsetTop = function () {
  return this.offsetTop + ( this.offsetParent ? this.offsetParent.documentOffsetTop() : 0 );
};

Element.prototype.scrollIntoViewCenter = function () {
  window.scrollTo( 0, this.documentOffsetTop() - (window.innerHeight / 2 ) );
};

//Music Player
events = {
  'onStateChange': onPlayerStateChange
};

var playButton =  document.getElementById("play-button");

var prevButton =  document.getElementById("prev-button");

var nextButton =  document.getElementById("next-button");

var closePlayerButton = document.getElementById("close-player-button");

var playerState;

function onPlayerStateChange(event){
  if(event.data == YT.PlayerState.ENDED){
    clearInterval(time);
    timeSlider.value = "0";
    setSong(getSong(1).youtubeID,getSong(1).title,getSongIndex);
    playerState = "ENDED";
  }
  else if(event.data == YT.PlayerState.PLAYING){
    time = setInterval(updateTimeSlider,1000);
    playButton.innerHTML = "<span class='player-button-content' tabindex='-1'><i class='material-icons'>pause</i></span>";
    playButton.style.animation = "";
    playerState = "PLAYING";
  }
  else if(event.data == YT.PlayerState.BUFFERING){
    clearInterval(time);
    playButton.innerHTML = "<span class='player-button-content' tabindex='-1'><i class='material-icons'>pause</i></span>";
    playButton.style.animation = "buffering 1.4s cubic-bezier(.4,0,.4,1) infinite";
    playerState = "BUFFERING";
  }else if(event.data == YT.PlayerState.PAUSED){
    clearInterval(time);
    playButton.innerHTML = "<span class='player-button-content' tabindex='-1'><i class='material-icons'>play_arrow</i></span>";
    playButton.style.animation = "";
    play = false;
    playerState = "PAUSED";
  }else if(event.data == YT.PlayerState.UNSTARTED){
    clearInterval(time);
    timeSlider.value = "0";
    playButton.innerHTML = "<span class='player-button-content' tabindex='-1'><i class='material-icons'>error</i></span>";
    playButton.style.animation = "";
    play = undefined;
    playerState = "UNSTARTED";
  }
}

var time;

var currentAlbum;

var albumToPlay;

var currentTrack;

var musicPlayer = document.getElementById("music-player");

var songName = document.getElementById("player-song-name");

function setSong(videoId,title,trackIndex,setAlbumToPlay = false){
  player.loadVideoById(videoId);
  currentTrack = trackIndex;
  songName.innerHTML = title.replace("&apos","'");
  musicPlayer.style.bottom = "20px";
  musicPlayer.style.opacity = "1";
  playButton.tabIndex = "0";
  prevButton.tabIndex = "0";
  nextButton.tabIndex = "0";
  closePlayerButton.tabIndex = "0";
  if(setAlbumToPlay){
    albumToPlay = currentAlbum;
  }
}

function closePlayer(){
  player.pauseVideo();
  clearInterval(time);
  musicPlayer.style.bottom = "-200px";
  musicPlayer.style.opacity = "0";
  playButton.tabIndex = "-1";
  prevButton.tabIndex = "-1";
  nextButton.tabIndex = "-1";
  closePlayerButton.tabIndex = "-1";
}

var play;

function playSong(){
  if(play == false){
    player.playVideo();
    play = true;
  }else if(playerState != "PAUSED" || play == undefined || play == true){
    player.pauseVideo();
    play = false;
  }
}

function seekTo(){
  var currentTime = (timeSlider.value/timeSlider.max)*player.getDuration();
  player.seekTo(currentTime);
}

function prevSong(){
  if(player.getCurrentTime() >= 3){
    player.seekTo(0);
    timeSlider.value = "0";
  }
  else{
    setSong(getSong(-1).youtubeID,getSong(-1).title,getSongIndex);
  }
}

function nextSong(){
  setSong(getSong(1).youtubeID,getSong(1).title,getSongIndex);
}

var getSongIndex;

function getSong(cond){
  if(albumToPlay.track[currentTrack+cond]){
    getSongIndex = currentTrack+cond;
    return albumToPlay.track[currentTrack+cond];
  }else if(currentTrack+cond < 0){
    getSongIndex = albumToPlay.track.length-1;
    return albumToPlay.track[albumToPlay.track.length-1];
  }else{
    getSongIndex = 0;
    return albumToPlay.track[0];
  }
}

var timeSlider = document.getElementById("time-slider");

function updateTimeSlider(){
  var currentTime = Math.floor((player.getCurrentTime()/player.getDuration())*timeSlider.max);
  if(!isNaN(currentTime)){
    timeSlider.value = currentTime.toString();
  }
}