function platform(url, img, name){
  return `
    ${url != undefined ?
      `<a class="platform-url" href="${url}"  target="aboutblank">
        <img class="platform-img" src="./images/${img}" alt="${name}"/>${name}
      </a>` : ``
    }
  `
}

function platformTemplate(song){
  return `
    ${platform(song.url[0].itunes, "iTunes.png", "iTunes/Apple Music")}
    ${platform(song.url[0].deezer, "Deezer.ico.png", "Deezer")}
    ${platform(song.url[0].googlePlay, "Google Play.png", "Google Play")}
    ${platform(song.url[0].spotify, "Spotify.png", "Spotify")}
    ${platform(song.url[0].youtube, "YouTube.png", "YouTube")}
    ${platform(song.url[0].youtubeMusic, "YouTube Music.png", "YouTube Music")}
    ${platform(song.url[0].amazon, "Amazon.png", "Amazon Music")}
    ${platform(song.url[0].bandLab, "BandLab.png", "BandLab")}
    ${platform(song.url[0].soundCloud, "icon-soundcloud.png", "SoundCloud")}
    ${platform(song.url[0].rocksmith, "Rocksmith.png", "Rocksmith")}
  `;
}

function songTemplate(song, index){
  return `
    <div class="content" id="${index}">
      <div class="album-container">
        <img class="song-img" src="${song.img}" alt="${song.title} Album Art" ${song.img1 != undefined ? `onmouseover="src='${song.img1}'" onmouseout="src='${song.img}'"` : ``}/><!--
        --><b class="song-title-disk"><p class="song-title">${song.title}</p></b>
      </div>
      <div class="platform-container">
        <h3 class="available-on">Available on</h3>
        ${platformTemplate(song)}
      </div>
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
      <td class="track-name">${track.title}</td>
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
    </div>
  `;
}

if(url()["album"]){
  var found = false;
  var song;
  for(i = 0; i< songsData.length; i++){
    if(songsData[i].title.toUpperCase() == url()["album"].toUpperCase()){
      content.innerHTML = songTemplate(songsData[i]);
      found = true;
    }
    else if(songsData[i].alt && songsData[i].alt.toUpperCase() == url()["album"].toUpperCase()){
      content.innerHTML = songTemplate(songsData[i]);
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
        content.innerHTML = songTemplate(coversData[i]);
        found = true;
      }
      else if(coversData[i].alt && coversData[i].alt.toUpperCase() == url()["album"].toUpperCase()){
        coverSong();
        content.innerHTML = songTemplate(coversData[i]);
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

window.addEventListener("click", (e) => {
  var target = e.target;
  while(target.className && target.className != "platform-url" && target.className != "content"){
    target = target.parentElement;
  }
  if(!url()["album"] && target.className != "platform-url" && target.className == "content"){
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
    content.innerHTML = songTemplate(song);
    content.innerHTML += trackTemplate(song);
    setParams(`?album=${(song.alt ? song.alt : song.title).toLowerCase()}`);
  }
  else if(target.className != "platform-url" && target.className != "content"){
    songDisplay();
    setParams("");
  }
});