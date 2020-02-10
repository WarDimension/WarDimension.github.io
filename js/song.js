function platform(url, img, name){
  return `
    ${url != undefined ?
      `<a class="platform-url" href="${url}"  target="aboutblank">
        <img class="platform-img" src="./images/${img}"/>${name}
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

function songTemplate(song){
  return `
    <div class="content">
      <div class="album-container">
        <img class="song-img" src="${song.img}" alt="${song.title} Album Art" ${song.img1 != undefined ? `onmouseover="src='${song.img1}'" onmouseout="src='${song.img}'"` : ``}/><!--
        --><b class="song-title-disk"><p class="song-title">${song.title}</p></b>
      </div>
      <div class="platform-container">
        <h3>Available on</h3>
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
  url.hash = '';
  history.replaceState(null, document.title, url);
}
window.onhashchange = removeHash;

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