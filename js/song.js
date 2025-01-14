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

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function titleToId(title){
  return title.replaceAll(".", "").replaceAll("/", "-");
}

var degree = 0;
var degreeTemp = 0;
const rotationSpeed = 18; //360deg/20s
const seekSpeed = 0.3;

function resetDiskRotation(disk){
  if(disk) disk.style = `transform: rotate(0deg);`;

  degree = 0;
  degreeTemp = 0;
}

function diskSeekRotation(disk){
  let currentTime = (timeSlider.value/timeSlider.max)*player.getDuration();
  if(disk) disk.style = `transform: rotate(${currentTime * rotationSpeed}deg);`;
}

var diskTemp;

function updateDiskSpin(seek = false){
  if(!seek) degreeTemp = degree;
  degree = player.getCurrentTime() * rotationSpeed;

  if(currentTrack.albumData){
    let title = currentTrack.albumData.title;
    let alt = currentTrack.albumData.alt;
    let disk = document.querySelector(`#${alt ? titleToId(alt) : titleToId(title)}`);

    if(seek){
      diskSeekRotation(disk);
    }
    else if(disk != null && (diskTemp && diskTemp.id == disk.id)){
      disk.style = `transform: rotate(${degree}deg);`;
    }
    else{
      resetDiskRotation(diskTemp);
    }

    diskTemp = disk;
  }
}

function onPlayerReady(){
  if(url()["id"]){
    currentTrack.youtubeID = url()["id"];
    player.loadVideoById(url()["id"]);
    setSong(url()["id"]);
    var found = false;
    for(i = 0; i < songsData.length; i++){
      for(j = 0; j < songsData[i].track.length; j++){
        if(songsData[i].track[j].youtubeID == url()["id"]){
          currentTrack.index = j;
          currentTrack.albumData = songsData[i];
          currentTrack.albumIndex = i;
          currentTrack.type = "original";
          songName.innerHTML = songsData[i].track[j].title;
          found = true;
          break;
        }
      }
    }
    if(!found){
      for(i = 0; i < coversData.length; i++){
        for(j = 0; j < coversData[i].track.length; j++){
          if(coversData[i].track[j].youtubeID == url()["id"]){
            currentTrack.index = j;
            currentTrack.albumData = coversData[i];
            currentTrack.albumIndex = i;
            currentTrack.type = "cover";
            songName.innerHTML = coversData[i].track[j].title;
            found = true;
            break;
          }
        }
      }
    }
    if(!found){
      shuffle = false;
      setShuffle();
    }
  }
  trackHighlight();
}

var musicPlayer = document.getElementById("music-player");

var songName = document.getElementById("player-song-name");

var playButton = document.getElementById("play-button");

var prevButton = document.getElementById("prev-button");

var nextButton = document.getElementById("next-button");

var currentTimeText = document.getElementById("current-time-text");

var durationText = document.getElementById("duration-text");

var shuffleButton = document.getElementById("shuffle-button");

var repeatButton = document.getElementById("repeat-button");

var closePlayerButton = document.getElementById("close-player-button");

var openInNewButton = document.getElementById("open-in-new-button");

var playerState;

var playButtonState;

function setPlayButton(state){
  if(state == "PLAYING"){
    playButton.innerHTML = "<span class='player-button-content' tabindex='-1'><i class='material-icons'>pause</i></span>";
    playButton.style.animation = "";
    playButtonState = "PLAYING";
  }
  else if(state == "PAUSED"){
    playButton.innerHTML = "<span class='player-button-content' tabindex='-1'><i class='material-icons'>play_arrow</i></span>";
    playButton.style.animation = "";
    playButtonState = "PAUSED";
  }
  else if(state == "BUFFERING"){
    playButton.innerHTML = "<span class='player-button-content' tabindex='-1'><i class='material-icons'>pause</i></span>";
    playButton.style.animation = "buffering 1.4s cubic-bezier(.4,0,.4,1) infinite";
    playButtonState = "BUFFERING";
  }
  else if(state == "ERROR"){
    playButton.innerHTML = "<span class='player-button-content' tabindex='-1'><i class='material-icons'>error</i></span>";
  }
}

function setVideoDataToPlayer(){
  if(songName.innerHTML == "" && !(player.getVideoData().title != undefined && player.getVideoData().title == "")){
    var author = `<span style="color: #666; display:block">${player.getVideoData().author}</span>`;
    songName.innerHTML = player.getVideoData().title + author;
  }
}

function onPlayerStateChange(event){
  if(event.data == YT.PlayerState.ENDED){
    clearInterval(time);
    timeSlider.value = "0";
    resetDiskRotation(diskTemp);
    if(repeat == "repeat all" || repeat == "repeat album"){
      nextSong();
    }
    else if(repeat == "repeat one"){
      player.playVideo();
    }
    setPlayButton("PAUSED");
    playerState = "ENDED";
  }
  else if(event.data == YT.PlayerState.PLAYING){
    time = setInterval(updateTimeSlider,10);
    setPlayButton("PLAYING");
    durationText.innerHTML = player.getVideoData().isLive ? "LIVE" : player.getDuration().toString().toHHMMSS();
    playerState = "PLAYING";
  }
  else if(event.data == YT.PlayerState.BUFFERING){
    clearInterval(time);
    setPlayButton("BUFFERING");
    playerState = "BUFFERING";
  }
  else if(event.data == YT.PlayerState.PAUSED){
    clearInterval(time);
    setPlayButton("PAUSED");
    playerState = "PAUSED";
  }
  else if(event.data == YT.PlayerState.UNSTARTED){
    clearInterval(time);
    timeSlider.value = "0";
    resetDiskRotation(diskTemp);
    setPlayButton("PAUSED");
    
    if(player.getVideoData().title != undefined && player.getVideoData().title == "") setPlayButton("ERROR");

    playerState = "UNSTARTED";
  }
  setVideoDataToPlayer();
}

var trackHighlightTemp;

function trackHighlight(){
  if(url()["album"] && currentTrack.albumData != undefined){
    if(url()["album"].toUpperCase() == currentTrack.albumData.title.toUpperCase() || (currentTrack.albumData.alt && url()["album"].toUpperCase() == currentTrack.albumData.alt.toUpperCase())){
      var trackHighlight = document.getElementById(currentTrack.index+2);
      trackHighlight.style.background = "#666";
      if(trackHighlightTemp != undefined && trackHighlightTemp != trackHighlight) trackHighlightTemp.style.background = "";
      trackHighlightTemp = trackHighlight;
    }
    else if(trackHighlightTemp != undefined){
      trackHighlightTemp.style.background = "";
    }
  }
}

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
  openInNewButton.tabIndex = "0";
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
  trackHighlight();
}

function getContentIndexFromAlbumIndex(type){
  switch(type){
    case "original":
      return (songsData.length - 1) - currentTrack.albumIndex;
      break;
    case "cover":
      return (coversData.length - 1) - currentTrack.albumIndex;
      break;
    default:
      return 0;
  }
}

function openInNew(){
  if((!url()["album"] || currentTrack.albumIndex != selectedAlbum.index || currentTrack.type != selectedAlbum.type) && currentTrack.type != undefined){
    let contentIndex = getContentIndexFromAlbumIndex(currentTrack.type);

    if(currentTrack.type == "cover" && originalButton.className.includes("active")){
      coverButton.click();
    }
    else if(currentTrack.type == "original" && coverButton.className.includes("active")){
      originalButton.click();
    }

    while(!url()["album"] || currentTrack.albumIndex != selectedAlbum.index){
      let contentIndex = sortNewest? getContentIndexFromAlbumIndex(currentTrack.type) : currentTrack.albumIndex;
      document.getElementById(contentIndex).click();
    }

    removeHash();
  }
  else if(currentTrack.type == undefined){
    window.open(`https://www.youtube.com/watch?v=${currentTrack.youtubeID}`,"_blank");

    if(playerState == "PLAYING" || playerState == "BUFFERING"){
      player.pauseVideo();
    }
  }
}

function closePlayer(){
  player.pauseVideo();
  clearInterval(time);
  resetDiskRotation(diskTemp);
  musicPlayer.style.bottom = "-200px";
  musicPlayer.style.opacity = "0";
  playButton.tabIndex = "-1";
  prevButton.tabIndex = "-1";
  nextButton.tabIndex = "-1";
  shuffleButton.tabIndex = "-1";
  repeatButton.tabIndex = "-1";
  closePlayerButton.tabIndex = "-1";
  openInNewButton.tabIndex = "-1";
  shuffleHistory = [];
  currentTrack = {
    "youtubeID": undefined,
    "index": undefined,
    "albumData": undefined,
    "albumIndex": undefined,
    "type": undefined
  };
  if(trackHighlightTemp != undefined){
    trackHighlightTemp.style.background = "";
  }
  if(url()["album"]){
    setParams(`album=${url()["album"]}`);
  }else{
    setParams("");
  }
}

var shuffle = true;
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

  var randomType = Math.floor(Math.random() * 100);

  var totalSongs = songsData.length + coversData.length;
  var coversPercentage = Math.round(coversData.length / totalSongs * 100);

  randomType < coversPercentage ? randomType = 1 : randomType = 0;

  if(repeat == "repeat album") currentTrack.type == "original" ? randomType = 0 : randomType = 1;

  switch(randomType){
    case 0:
      var randomAlbum = Math.floor(Math.random() * songsData.length);

      if(repeat == "repeat album") randomAlbum = currentTrack.albumIndex;

      var randomTrack = Math.floor(Math.random() * songsData[randomAlbum].track.length);

      if(currentTrack.youtubeID == songsData[randomAlbum].track[randomTrack].youtubeID && !(repeat == "repeat album" && songsData[randomAlbum].track.length == 1)){
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

      if(repeat == "repeat album") randomAlbum = currentTrack.albumIndex;

      var randomTrack = Math.floor(Math.random() * coversData[randomAlbum].track.length);

      if(currentTrack.youtubeID == coversData[randomAlbum].track[randomTrack].youtubeID && !(repeat == "repeat album" && coversData[randomAlbum].track.length == 1)){
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
  setRepeat();setRepeat();setRepeat();setRepeat();
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
  else if(repeat == "repeat one"){
    repeat = "repeat album";
    localStorage.setItem("repeat", "repeat album");
    repeatButton.innerHTML = "<span class='player-button-content' tabindex='-1'><p id='repeat-album'>A</p><i class='material-icons'>repeat</i></span>";
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
  }
  else if(playerState == "PLAYING" || playerState == "BUFFERING"){
    player.pauseVideo();
  }
  
  if(playerState == "UNSTARTED" && player.getVideoData().title != "" && url()["id"] != "") playButtonState == "PAUSED" ? setPlayButton("BUFFERING") : setPlayButton("PAUSED");
}

function seekTo(play = true){
  var newMaxLiveTime = maxLiveTime + (new Date().getTime()-startTime)/1000;
  var duration = player.getVideoData().isLive ? newMaxLiveTime : player.getDuration();
  var currentTime = (timeSlider.value/timeSlider.max)*duration;
  currentTimeText.innerHTML = (currentTime.toString().toHHMMSS());
  if(play) player.seekTo(currentTime);
}

function setSeek(){
  clearInterval(time);
  seekTo(false);
  updateDiskSpin(true);
}

function prevSong(){
  if(player.getCurrentTime() >= 3){
    clearInterval(time);
    player.seekTo(0);
    timeSlider.value = "0";
    resetDiskRotation(diskTemp);
  }
  else if(shuffle){
    prevShuffle();
  }
  else if(currentTrack.index == undefined){
    var i = coversData[coversData.length-1];
    currentTrack.youtubeID = i.track[i.track.length-1].youtubeID;
    currentTrack.index = i.track.length-1;
    currentTrack.albumData = i;
    currentTrack.albumIndex = coversData.length-1;
    currentTrack.type = "cover";
    setSong(currentTrack.youtubeID,i.track[i.track.length-1].title,currentTrack.index);
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
  else if(repeat == "repeat album"){
    currentTrack.youtubeID = albumData.track[albumData.track.length-1].youtubeID;
    currentTrack.index = albumData.track.length-1;
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
  if(shuffle){
    shuffleSong();
  }
  else if(currentTrack.index == undefined){
    currentTrack.youtubeID = songsData[0].track[0].youtubeID;
    currentTrack.index = 0;
    currentTrack.albumData = songsData[0];
    currentTrack.albumIndex = 0;
    currentTrack.type = "original";
    setSong(currentTrack.youtubeID,songsData[0].track[0].title,0);
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
  else if(repeat == "repeat album"){
    currentTrack.youtubeID = albumData.track[0].youtubeID;
    currentTrack.index = 0;
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

var time;
var maxLiveTime = 0;
var startTime = 0;
function updateTimeSlider(){
  player.setVolume(100);
  player.unMute();

  if(startTime == 0){
    startTime = new Date().getTime();
    maxLiveTime = player.getCurrentTime();
  }

  var newMaxLiveTime = maxLiveTime + (new Date().getTime()-startTime)/1000;

  var duration = player.getVideoData().isLive ? newMaxLiveTime : player.getDuration();
  var currentTime = Math.floor((player.getCurrentTime()/duration)*timeSlider.max);

  if(!isNaN(currentTime)){
    timeSlider.value = currentTime.toString();
    currentTimeText.innerHTML = player.getCurrentTime().toString().toHHMMSS();
  }
  updateDiskSpin();
}
//END of Music Player

function platform(url, sprite, name){
  if(name == "バカ！"){
    return `${sprite.url[1] ?
        `<a class="platform-url more-button" onclick="openMore(\`${sprite.title}\`);" onkeypress="openMore(\`${sprite.title}\`);" tabindex="1">
          <i class="platform-icon i-more"></i>More
        </a>` : ""
      }
    `
  }
  else if(name == "おっぱい"){
    return "";
  }

  return `
    ${url ?
      `<a class="platform-url" href="${url}"  target="_blank">
        <i class="platform-icon i-${sprite}"></i>${name}
      </a>` : ""
    }
  `
}

function platformTemplate(song, index = 0, ばか = "バカ！"){
  if(!song.url){
    return `
      <a class="platform-url coming-soon">
        <b style="font-size: 50px">COMING SOON</b>
      </a>
    `;
  }

  return `
    ${platform(song.url[index].itunes, "itunes", "iTunes/Apple Music")}
    ${platform(song.url[index].deezer, "deezer", "Deezer")}
    ${platform(song.url[index].spotify, "spotify", "Spotify")}
    ${platform(song.url[index].youtube, "youtube", "YouTube")}
    ${platform(song.url[index].youtubeMusic, "youtube-music", "YouTube Music")}
    ${platform(song.url[index].amazon, "amazon", "Amazon Music")}
    ${platform(song.url[index].bandcamp, "bandcamp", "Bandcamp")}
    ${platform(song.url[index].bandLab, "bandlab", "BandLab")}
    ${platform(song.url[index].soundCloud, "soundcloud", "SoundCloud")}
    ${platform(song.url[index].joox, "joox", "JOOX")}
    ${platform(song.url[index].flo, "flo", "FLO")}
    ${platform(song.url[index].vibe, "vibe", "NAVER VIBE")}
    ${platform(song.url[index].bugs, "bugs", "Bugs!")}
    ${platform(song.url[index].netease, "netease", "NetEase Music")}
    ${platform(song.url[index].kuwo, "kuwo", "Kuwo")}
    ${platform(song.url[index].boomplay, "boomplay", "Boomplay")}
    ${platform(song.url[index].zingmp3, "zingmp3", "Zing mp3")}
    ${platform(song.url[index].rocksmith, "rocksmith", "Rocksmith")}
    ${platform(song.url[index].osu, "osu", "osu!")}
    ${platform(song.url[index].cloneHero, "clone-hero", "Clone Hero")}
    ${platform(song.url[index], song, ばか)}
  `;
}

function songTemplate(song, index, songsData){
  let diskId;
  let diskTempId;

  song.alt ? diskId = titleToId(song.alt) : diskId = titleToId(song.title);
  diskTemp ? diskTempId = diskTemp.id : diskTempId = "";

  return `
    <div class="content" id="${index}" tabIndex="0">
      <div class="album-container">
        <img ${song.imgCur ? `style="cursor: url('../cursors/${song.imgCur}.cur'), auto"` : ""} class="song-img" src="${song.img}" alt="${song.title} Album Art" ${song.img1 ? `onmouseover="src='${song.img1}'" onmouseout="src='${song.img}'"` : ""}/><!--
        --><b class="song-title-disk"><span class="disk" id="${diskId}" ${diskId == diskTempId ? `style="transform: rotate(${degree}deg);"` : ""}></span><p class="song-title">${song.title}</p>${song.romanized ? `<span class="album-tooltip">${song.romanized}</span>` : ``}</b>
      </div>
      <div class="platform-container">
        <h3 class="available-on">Available on</h3>
        ${platformTemplate(song)}
      </div>
      ${
        songsData ? `${index == songsData.length-1 ? '<a class="skip-content" href="#top">return</a>' : ""}` : ""
      }
    </div>
  `;
}

function songDisplay(){
  if(original && sortNewest){
    contentContainer.innerHTML = `${songsData.slice(0).reverse().map(songTemplate).join("")}`;
  }
  else if(original && !sortNewest){
    contentContainer.innerHTML = `${songsData.map(songTemplate).join("")}`;
  }
  else if(!original && sortNewest){
    contentContainer.innerHTML = `${coversData.slice(0).reverse().map(songTemplate).join("")}`;
  }
  else{
    contentContainer.innerHTML = `${coversData.map(songTemplate).join("")}`;
  }
}

function setAlbumParameter(album){
  if(album){
    var params = `?album=${album}`;
    if(url()["id"]) params += `&id=${url()["id"]}`;
    setParams(params);
  }
  else{
    if(url()["id"]){
      setParams(`id=${url()["id"]}`);
    }
    else{
      setParams("");
    }
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
  setAlbumParameter();
  songDisplay();
}

function originalSong(){
  original = true;
  songDisplay();
  originalButton.className = "song-button active";
  coverButton.className = "song-button";
  coverButton.tabIndex = "0";
  unTab = "original";
  setAlbumParameter();
}

function coverSong(){
  original = false;
  songDisplay();
  originalButton.className = "song-button";
  coverButton.className = "song-button active";
  originalButton.tabIndex = "0";
  unTab = "cover";
  setAlbumParameter();
}

function trackListTemplate(track, index){
  return `
    <tr class="track-list">
      <td class="track-number">${index+1}</td>
      <td class="track-name" tabIndex="0" id="${index+2}" onclick="setSong('${track.youtubeID}','${track.title.replace("'","&apos")}',${index},true)" onkeypress="event.key == 'Enter' && setSong('${track.youtubeID}','${track.title.replace("'","&apos")}',${index},true)">
        <div class="track-name-text">${track.title}</div>
        ${track.romanized ? `<div class="track-tooltip">${track.romanized}</div>` : ``}
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
var contentContainer = document.getElementById("content-container");
var originalButton = document.getElementById("original");
var coverButton = document.getElementById("cover");
var sortButton = document.getElementById("sort-button");
songDisplay();

if(url()["album"]){
  var found = false;
  var params = url()["album"];
  for(i = 0; i < songsData.length; i++){
    if(songsData[i].title.toUpperCase() == url()["album"].toUpperCase()){
      contentContainer.innerHTML = songTemplate(songsData[i],"0");
      found = true;
    }
    else if(songsData[i].alt && songsData[i].alt.toUpperCase() == url()["album"].toUpperCase()){
      contentContainer.innerHTML = songTemplate(songsData[i],"0");
      found = true;
    }
    if(found){
      contentContainer.innerHTML += trackTemplate(songsData[i]);
      selectedAlbum.index = i;
      selectedAlbum.type = "original";
      break;
    }
  }
  if(!found){
    for(i = 0; i < coversData.length; i++){
      if(coversData[i].title.toUpperCase() == url()["album"].toUpperCase()){
        coverSong();
        contentContainer.innerHTML = songTemplate(coversData[i],"0");
        found = true;
      }
      else if(coversData[i].alt && coversData[i].alt.toUpperCase() == url()["album"].toUpperCase()){
        coverSong();
        contentContainer.innerHTML = songTemplate(coversData[i],"0");
        found = true;
      }
      if(found){
        contentContainer.innerHTML += trackTemplate(coversData[i]);
        selectedAlbum.index = i;
        selectedAlbum.type = "cover";
        break;
      }
    }
  }
  setAlbumParameter(params);
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
  var content = document.getElementsByClassName("content");
  var trackExist = document.querySelector("#track-container") != null;
  document.getElementsByTagName("html")[0].style.scrollBehavior = "auto";
  if(!trackExist && target.closest(".content") && !(["platform-url", "skip-content"].includes(target.className))){
    var song;
    var i;
    if(original){
      if(sortNewest){
        i = (songsData.length - 1) - target.closest(".content").id;
        song = songsData[i];
      }
      else{
        i = target.closest(".content").id * 1;
        song = songsData[i];
      }
      selectedAlbum.type = "original";
    }
    else{
      if(sortNewest){
        i = (coversData.length - 1) - target.closest(".content").id;
        song = coversData[i];
      }
      else{
        i = target.closest(".content").id * 1;
        song = coversData[i];
      }
      selectedAlbum.type = "cover";
    }
    selectedAlbum.index = i;
    contentContainer.innerHTML = songTemplate(song,"0");
    contentContainer.innerHTML += trackTemplate(song);
    content[0].focus();
    setAlbumParameter((song.alt ? song.alt : song.title).toLowerCase());
    trackHighlight();
    index = 0;
  }
  else if(trackExist && !target.closest("#track-container") && !target.closest("#music-player") && !(["platform-url", "skip", "skip-content", "material-icons", "blur"].includes(target.className))){
    songDisplay();
    if(target.className != "song-button"){
      if(sortNewest){
        if(url()["album"]) content[(content.length - 1) - selectedAlbum.index].scrollIntoViewCenter();
        if(target.closest(".content")){
          content[(content.length - 1) - selectedAlbum.index].focus();
          index = (content.length - 1) - selectedAlbum.index;
        }
        else{
          index = indexDefault;
        }
      }
      else{
        if(url()["album"]) content[selectedAlbum.index].scrollIntoViewCenter();
        if(target.closest(".content")){
          content[selectedAlbum.index].focus();
          index = selectedAlbum.index;
        }
        else{
          index = indexDefault;
        }
      }
    }
    else{
      index = indexDefault;
    }
    setAlbumParameter();
    if(index != indexDefault) document.getElementsByTagName("html")[0].style.scrollBehavior = "smooth";
  }
  else if(target.className == "skip"){
    index = 0;
  }
  else if(target.className == "track-name"){
    index = target.id;
  }
  else if(target.className == "track-name-text"){
    index = target.parentElement.id;
  }
  else if(target.className == "platform-url"){
    document.getElementsByTagName("html")[0].style.scrollBehavior = "smooth";
  }
  else{
    index = indexDefault;
  }
}

const indexDefault = -1;

var index = indexDefault;

window.addEventListener("keydown", (e) => {
  var className = ".content";
  var html = document.querySelector("html");
  if(url()["album"]){
    className += ", .track-name";
    html.style.scrollBehavior="auto";
  }
  var album = document.querySelectorAll(className);
  var active = document.activeElement;
  if(e.key == "ArrowUp"){
    e.preventDefault();
    if(url()["album"] && index == 2){
      index = 1;
    }
    else if(index <= 0 || index > album.length - 1){
      index = album.length;
      html.style.scrollBehavior="auto";
    }
    index--;
    album[index].focus();
    document.activeElement.scrollIntoViewCenter();
    html.style.scrollBehavior="smooth";
  }
  else if(e.key == "ArrowDown"){
    e.preventDefault();
    if(url()["album"] && index == 0){
      index = 1;
    }
    else if(index >= album.length - 1 || index < 0){
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
      if(e.target.className == "content"){
        track(e);
      }
      else{
        index = 0;
        document.getElementsByClassName("content")[0].focus();
      }
    }
    else{
      index = indexDefault;
    }
  }
  else if (e.key == "ArrowLeft" || ( e.shiftKey && e.key == "Tab") || e.key == "ArrowRight" || e.key == "Tab"){
    if(active.className == "skip-content"){
      index = indexDefault;
    }
    else if(active.className == "track-name"){
      index = active.id;
      active.scrollIntoViewCenter();
    }
    else if(active.closest(".content")){
      index = active.closest(".content").id;
      active.closest(".content").scrollIntoViewCenter();
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
  window.scrollTo( 0, this.documentOffsetTop() - (window.innerHeight / 2 ) + (this.offsetHeight / 2) );
};