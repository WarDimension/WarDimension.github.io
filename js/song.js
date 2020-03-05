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

var original = true;
var sortNewest = true;
var content = document.getElementById("content-container");
var originalButton = document.getElementById("original");
var coverButton = document.getElementById("cover");
var sortButton = document.getElementById("cover-button");
songDisplay();

function removeHash(){
  const url = new URL(window.location);
  url.hash = "";
  history.replaceState(null, document.title, url);
}
window.onhashchange = removeHash;

function setParams(search){
  const url = new URL(window.location);
  url.search = search;
  history.replaceState(null, document.title, url);
}

function songDisplay(){
  if(original){
    if(sortNewest){
      content.innerHTML = `${songsData.slice(0).reverse().map(songTemplate).join("")}`;
    }
    else{
      content.innerHTML = `${songsData.map(songTemplate).join("")}`;
    }
  }
  else{
    if(sortNewest){
      content.innerHTML = `${coversData.slice(0).reverse().map(songTemplate).join("")}`;
    }
    else{
      content.innerHTML = `${coversData.map(songTemplate).join("")}`;
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

function url(){
  var vars = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value){
      vars[key] = value;
  });
  return vars;
}

function trackListTemplate(track, index){
  return `
    <tr class="track-list">
      <td class="track-number">${index+1}</td>
      <td class="track-name" tabIndex="0">
        <div class="track-name-text">${track.title}</div>
        ${track.romanized != undefined ? `<div class="track-tooltip">${track.romanized}</div>` : ``}
      </td>
      <td class="track-length">${track.length}</td>
    </tr>
  `;
}

function trackTemplate(song){
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
  while(target.className && target.className != "platform-url" && target.className != "content" && target.className != "skip-content"){
    target = target.parentElement;
  }
  if(!url()["album"] && target.className != "platform-url" && target.className == "content" && target.className != "skip-content"){
    var song;
    if(original == true){
      if(sortNewest == true){
        song = songsData[(songsData.length - 1) - target.id];
      }
      else{
        song = songsData[target.id];
      }
    }
    else{
      if(sortNewest == true){
        song = coversData[(coversData.length - 1) - target.id];
      }
      else{
        song = coversData[target.id];
      }
    }
    content.innerHTML = songTemplate(song,"0");
    content.innerHTML += trackTemplate(song);
    setParams(`?album=${(song.alt ? song.alt : song.title).toLowerCase()}`);
  }
  else if(target.className != "platform-url" && target.id != "track-container"){
    songDisplay();
    setParams("");
    index = indexDefault;
  }
}

const indexDefault = -1;

var index = indexDefault;

window.addEventListener("keydown", (e) => {
  var album = document.getElementsByClassName("content");
  var html = document.querySelector("html");
  if(e.keyCode == "38"){
    e.preventDefault();
    if(url()["album"]){
      index = album.length - 1;
      html.style.scrollBehavior="smooth";
    }
    else if(index == 0){
      index = album.length;
      html.style.scrollBehavior="auto";
    }
    index--;
    album[index].focus();
    document.activeElement.scrollIntoViewCenter();
    html.style.scrollBehavior="smooth";
  }
  else if(e.keyCode == "40"){
    e.preventDefault();
    if(url()["album"]){
      index = -1;
      html.style.scrollBehavior="smooth";
    }
    else if(index == album.length - 1){
      index = -1;
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
    e.preventDefault();
    target = document.activeElement;
    while(target.className && target.className != "content"){
      target = target.parentElement;
    }
    console.log(target.className);
    if(target.className == "content"){
      index = target.id;
    }
    if (e.shiftKey && e.keyCode == "9"){
      prevFocus(document.activeElement).focus();
    }
    else if (e.keyCode == "9"){
      nextFocus(document.activeElement).focus();
    }
  }
});

Element.prototype.documentOffsetTop = function () {
  return this.offsetTop + ( this.offsetParent ? this.offsetParent.documentOffsetTop() : 0 );
};

Element.prototype.scrollIntoViewCenter = function () {
  window.scrollTo( 0, this.documentOffsetTop() - (window.innerHeight / 2 ) );
};