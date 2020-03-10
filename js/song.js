//Music Player
var selectedAlbum = {
  "data": undefined,
  "index": undefined,
  "type": undefined
};

var currentTrack = {
  "youtubeID": undefined,
  "index": undefined,
  "albumData": undefined,
  "albumIndex": undefined,
  "type": undefined
};

var shuffleHistory = [];

events = {
  'onReady': onPlayerReady,
  'onStateChange': onPlayerStateChange
};

function onPlayerReady(){
  if(url()["id"]){
    currentTrack.youtubeID = url()["id"];
    player.loadVideoById(url()["id"]);
    setSong(url()["id"]);
    shuffle = false;
    setShuffle();
  }
}

var playButton =  document.getElementById("play-button");

var prevButton =  document.getElementById("prev-button");

var nextButton =  document.getElementById("next-button");

var currentTimeText =  document.getElementById("current-time-text");

var durationText =  document.getElementById("duration-text");

var shuffleButton =  document.getElementById("shuffle-button");

var repeatButton =  document.getElementById("repeat-button");

var closePlayerButton = document.getElementById("close-player-button");

var playerState;

var error = 0;

function onPlayerStateChange(event){
  if(event.data == YT.PlayerState.ENDED){
    clearInterval(time);
    timeSlider.value = "0";
    if(repeat == "repeat all"){
      nextSong();
    }
    else if(repeat == "repeat one"){
      player.playVideo();
    }
    playButton.innerHTML = "<span class='player-button-content' tabindex='-1'><i class='material-icons'>play_arrow</i></span>";
    playButton.style.animation = "";
    playerState = "ENDED";
  }
  else if(event.data == YT.PlayerState.PLAYING){
    time = setInterval(updateTimeSlider,100);
    if(songName.innerHTML == ""){
      var author = "「" + player.getVideoData().author + "」";
      if(author == "「WarDimension - Topic」" || author == "「WarDimension」") author = "";
      songName.innerHTML = author + player.getVideoData().title;
    }
    playButton.innerHTML = "<span class='player-button-content' tabindex='-1'><i class='material-icons'>pause</i></span>";
    playButton.style.animation = "";
    durationText.innerHTML = player.getDuration().toString().toHHMMSS();
    playerState = "PLAYING";
  }
  else if(event.data == YT.PlayerState.BUFFERING){
    clearInterval(time);
    playButton.innerHTML = "<span class='player-button-content' tabindex='-1'><i class='material-icons'>pause</i></span>";
    playButton.style.animation = "buffering 1.4s cubic-bezier(.4,0,.4,1) infinite";
    playerState = "BUFFERING";
  }
  else if(event.data == YT.PlayerState.PAUSED){
    clearInterval(time);
    playButton.innerHTML = "<span class='player-button-content' tabindex='-1'><i class='material-icons'>play_arrow</i></span>";
    playButton.style.animation = "";
    playerState = "PAUSED";
  }
  else if(event.data == YT.PlayerState.UNSTARTED){
    clearInterval(time);
    timeSlider.value = "0";
    error++;
    playButton.innerHTML = "<span class='player-button-content' tabindex='-1'><i class='material-icons'>play_arrow</i></span>";
    playButton.style.animation = "";
    if(error == 3){
      playButton.innerHTML = "<span class='player-button-content' tabindex='-1'><i class='material-icons'>error</i></span>";
    }
    playerState = "UNSTARTED";
  }
  else if(event.data == YT.PlayerState.CUED){
    clearInterval(time);
    playButton.innerHTML = "<span class='player-button-content' tabindex='-1'><i class='material-icons'>play_arrow</i></span>";
    playButton.style.animation = "";
    playerState = "CUED";
  }
}

var time;

var musicPlayer = document.getElementById("music-player");

var songName = document.getElementById("player-song-name");

function setSong(videoId,title = "",trackIndex,setCurrentTrack = false){
  player.loadVideoById(videoId);
  currentTrack.index = trackIndex;
  currentTrack.youtubeID = videoId;
  songName.innerHTML = title.replace("&apos","'");
  musicPlayer.style.bottom = "20px";
  musicPlayer.style.opacity = "1";
  playButton.tabIndex = "0";
  prevButton.tabIndex = "0";
  nextButton.tabIndex = "0";
  shuffleButton.tabIndex = "0";
  repeatButton.tabIndex = "0";
  closePlayerButton.tabIndex = "0";
  if(url()["album"]){
    setParams(`album=${url()["album"]}&id=${videoId}`);
  }else{
    setParams(`id=${videoId}`);
  }
  if(setCurrentTrack){
    currentTrack.albumData = selectedAlbum.data;
    currentTrack.albumIndex = selectedAlbum.index;
    currentTrack.type = selectedAlbum.type;
    shuffleHistory = [];
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
  shuffleButton.tabIndex = "-1";
  repeatButton.tabIndex = "-1";
  closePlayerButton.tabIndex = "-1";
  shuffleHistory = [];
  if(url()["album"]){
    setParams(`album=${url()["album"]}`);
  }else{
  setParams("");
  }
}

var shuffle = false;
shuffleButton.style.color = "#666";
if(localStorage.getItem("shuffle") != null){
  shuffle = (localStorage.getItem("shuffle") != "true");
  setShuffle();
}
function setShuffle(){
  if(shuffle){
    shuffle = false;
    localStorage.setItem("shuffle", false);
    shuffleButton.style.color = "#666";
  }
  else{
    shuffle = true;
    localStorage.setItem("shuffle", true);
    shuffleButton.style.color = "#eee";
  }
}

function shuffleSong(push = true){
  if(push){
    shuffleHistory.push({
      "youtubeID": currentTrack.youtubeID,
      "index": currentTrack.index,
      "albumData": currentTrack.albumData,
      "albumIndex": currentTrack.albumIndex,
      "type": currentTrack.type
    });
  }

  var videoId;
  var title;
  var trackIndex;

  switch(Math.floor(Math.random() * 2)){
    case 0:
      var randomAlbum = Math.floor(Math.random() * songsData.length);
      var randomTrack = Math.floor(Math.random() * songsData[randomAlbum].track.length);

      if(currentTrack.youtubeID == songsData[randomAlbum].track[randomTrack].youtubeID){
        shuffleSong(false);
        return;
      }
      
      currentTrack.albumData = songsData[randomAlbum];
      currentTrack.albumIndex = randomAlbum;
      currentTrack.type = "original";
      videoId = songsData[randomAlbum].track[randomTrack].youtubeID;
      title = songsData[randomAlbum].track[randomTrack].title;
      trackIndex = randomTrack;
      break;
    case 1:
      var randomAlbum = Math.floor(Math.random() * coversData.length);
      var randomTrack = Math.floor(Math.random() * coversData[randomAlbum].track.length);

      if(currentTrack.youtubeID == coversData[randomAlbum].track[randomTrack].youtubeID){
        shuffleSong(false);
        return;
      }

      currentTrack.albumData = coversData[randomAlbum];
      currentTrack.albumIndex = randomAlbum;
      currentTrack.type = "cover";
      videoId = coversData[randomAlbum].track[randomTrack].youtubeID;
      title = coversData[randomAlbum].track[randomTrack].title;
      trackIndex = randomTrack;
      break;
  }

  currentTrack.youtubeID = videoId;
  currentTrack.index = trackIndex;

  setSong(videoId,title,trackIndex);
}

function prevShuffle(){
  var prevShuffle = shuffleHistory[shuffleHistory.length-1];
  if(prevShuffle == undefined){
    shuffleSong(false);
    return;
  }
  else if(prevShuffle.index == undefined){
    currentTrack.youtubeID = prevShuffle.youtubeID;
    currentTrack.index = prevShuffle.index;
    currentTrack.albumData = prevShuffle.albumData;
    currentTrack.albumIndex = prevShuffle.albumIndex;
    currentTrack.type = prevShuffle.type;
    setSong(prevShuffle.youtubeID);
    shuffleHistory.pop();
    return;
  }
  var title = prevShuffle.albumData.track[prevShuffle.index].title;
  currentTrack.youtubeID = prevShuffle.youtubeID;
  currentTrack.index = prevShuffle.index;
  currentTrack.albumData = prevShuffle.albumData;
  currentTrack.albumIndex = prevShuffle.albumIndex;
  currentTrack.type = prevShuffle.type;
  setSong(prevShuffle.youtubeID,title,prevShuffle.index);
  shuffleHistory.pop();
}

var repeat = "repeat all";
if(localStorage.getItem("repeat") != null){
  repeat = localStorage.getItem("repeat");
  setRepeat();setRepeat();setRepeat();
}
function setRepeat(){
  if(repeat == "no repeat"){
    repeat = "repeat all";
    localStorage.setItem("repeat", "repeat all");
    repeatButton.style.color = "#eee";
  }
  else if(repeat == "repeat all"){
    repeat = "repeat one";
    localStorage.setItem("repeat", "repeat one");
    repeatButton.innerHTML = "<span class='player-button-content' tabindex='-1'><i class='material-icons'>repeat_one</i></span>";
  }
  else{
    repeat = "no repeat";
    localStorage.setItem("repeat", "no repeat");
    repeatButton.innerHTML = "<span class='player-button-content' tabindex='-1'><i class='material-icons'>repeat</i></span>";
    repeatButton.style.color = "#666";
  }
}

function playSong(){
  if(playerState == "UNSTARTED" || playerState == "PAUSED" || playerState == "ENDED"){
    player.playVideo();
  }else if(playerState == "PLAYING" || playerState == "BUFFERING"){
    player.pauseVideo();
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
  else if(shuffle || currentTrack.index == undefined){
    prevShuffle();
  }
  else{
    var title = getPrevSong();
    setSong(currentTrack.youtubeID,title,currentTrack.index);
  }
}

function getPrevSong(){
  var trackIndex = currentTrack.index;
  var albumData = currentTrack.albumData;
  var albumIndex = currentTrack.albumIndex;
  var trackType = currentTrack.type;

  if(albumData.track[trackIndex-1]){
    currentTrack.youtubeID = albumData.track[trackIndex-1].youtubeID;
    currentTrack.index = trackIndex-1;
  }
  else if(trackType == "original"){
    if(songsData[albumIndex-1]){
      var i = songsData[albumIndex-1];
      currentTrack.youtubeID = i.track[i.track.length-1].youtubeID;
      currentTrack.index = i.track.length-1;
      currentTrack.albumData = i;
      currentTrack.albumIndex = albumIndex-1;
    }
    else{
      var i = coversData[coversData.length-1];
      currentTrack.youtubeID = i.track[i.track.length-1].youtubeID;
      currentTrack.index = i.track.length-1;
      currentTrack.albumData = i;
      currentTrack.albumIndex = coversData.length-1;
      currentTrack.type = "cover";
    }
  }
  else{
    if(coversData[albumIndex-1]){
      var i = coversData[albumIndex-1];
      currentTrack.youtubeID = i.track[i.track.length-1].youtubeID;
      currentTrack.index = i.track.length-1;
      currentTrack.albumData = i;
      currentTrack.albumIndex = albumIndex-1;
    }
    else{
      var i = songsData[songsData.length-1];
      currentTrack.youtubeID = i.track[i.track.length-1].youtubeID;
      currentTrack.index = i.track.length-1;
      currentTrack.albumData = i;
      currentTrack.albumIndex = songsData.length-1;
      currentTrack.type = "cover";
    }
  }
  return currentTrack.albumData.track[currentTrack.index].title;
}

function nextSong(){
  if(shuffle || currentTrack.index == undefined){
    shuffleSong();
  }
  else{
    var title = getNextSong();
    setSong(currentTrack.youtubeID,title,currentTrack.index);
  }
}

function getNextSong(){
  var trackIndex = currentTrack.index;
  var albumData = currentTrack.albumData;
  var albumIndex = currentTrack.albumIndex;
  var trackType = currentTrack.type;

  if(albumData.track[trackIndex+1]){
    currentTrack.youtubeID = albumData.track[trackIndex+1].youtubeID;
    currentTrack.index = trackIndex+1;
  }
  else if(trackType == "original"){
    if(songsData[albumIndex+1]){
      currentTrack.youtubeID = songsData[albumIndex+1].track[0].youtubeID;
      currentTrack.index = 0;
      currentTrack.albumData = songsData[albumIndex+1];
      currentTrack.albumIndex = albumIndex+1;
    }
    else{
      currentTrack.youtubeID = coversData[0].track[0].youtubeID;
      currentTrack.index = 0;
      currentTrack.albumData = coversData[0];
      currentTrack.albumIndex = 0;
      currentTrack.type = "cover";
    }
  }
  else{
    if(coversData[albumIndex+1]){
      currentTrack.youtubeID = coversData[albumIndex+1].track[0].youtubeID;
      currentTrack.index = 0;
      currentTrack.albumData = coversData[albumIndex+1];
      currentTrack.albumIndex = albumIndex+1;
    }
    else{
      currentTrack.youtubeID = songsData[0].track[0].youtubeID;
      currentTrack.index = 0;
      currentTrack.albumData = songsData[0];
      currentTrack.albumIndex = 0;
      currentTrack.type = "original";
    }
  }
  return currentTrack.albumData.track[currentTrack.index].title;
}

var timeSlider = document.getElementById("time-slider");

function updateTimeSlider(){
  var currentTime = Math.floor((player.getCurrentTime()/player.getDuration())*timeSlider.max);
  if(!isNaN(currentTime)){
    timeSlider.value = currentTime.toString();
    currentTimeText.innerHTML = player.getCurrentTime().toString().toHHMMSS();
  }
}
//END of Music Player

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
  selectedAlbum.data = song;
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
      selectedAlbum.index = i;
      selectedAlbum.type = "original";
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
        selectedAlbum.index = i;
        selectedAlbum.type = "cover";
        break;
      }
    }
  }
  params = `?album=${url()["album"]}`;
  if(url()["id"]) params += `&id=${url()["id"]}`;
  setParams(params);
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
  if(!url()["album"] && getParentClass(target, "content") == "content" && e.target.className != "platform-url"){
    var song;
    var i;
    if(original == true){
      if(sortNewest == true){
        i = (songsData.length - 1) - getParentIdByElement(target);
        song = songsData[i];
      }
      else{
        i = getParentIdByElement(target);
        song = songsData[i];
      }
      selectedAlbum.type = "original";
    }
    else{
      if(sortNewest == true){
        i = (coversData.length - 1) - getParentIdByElement(target);
        song = coversData[i];
      }
      else{
        i = getParentIdByElement(target);
        song = coversData[i];
      }
      selectedAlbum.type = "cover";
    }
    selectedAlbum.index = i;
    content.innerHTML = songTemplate(song,"0");
    content.innerHTML += trackTemplate(song);
    params = `?album=${(song.alt ? song.alt : song.title).toLowerCase()}`;
    if(url()["id"]) params += `&id=${url()["id"]}`;
    setParams(params);
    index = indexDefault;
  }
  else if(target.className != "platform-url" && getParentId(target, "track-container") != "track-container" && getParentId(target, "music-player") != "music-player" && target.className != "skip" && target.className != "skip-content" && target.className != "material-icons"){
    songDisplay();
    if(url()["id"]){
      setParams(`id=${url()["id"]}`);
    }
    else{
      setParams("");
    }
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