function platformTemplate(song){
  return `
    ${song.url[0].itunes != undefined ?
      `<a class="platform-url" href="${song.url[0].itunes}"  target="aboutblank">
        <img class="platform-img" src="./images/iTunes.png"/>iTunes/Apple Music
      </a>` : ``
    }
    ${song.url[0].deezer != undefined ?
      `<a class="platform-url" href="${song.url[0].deezer}"  target="aboutblank">
        <img class="platform-img" src="./images/Deezer.ico.png"/>Deezer
      </a>` : ``
    }
    ${song.url[0].googlePlay != undefined ?
      `<a class="platform-url" href="${song.url[0].googlePlay}"  target="aboutblank">
        <img class="platform-img" src="./images/Google Play.png"/>Google Play
      </a>` : ``
    }
    ${song.url[0].spotify != undefined ?
      `<a class="platform-url" href="${song.url[0].spotify}"  target="aboutblank">
        <img class="platform-img" src="./images/Spotify.png"/>Spotify
      </a>` : ``
    }
    ${song.url[0].youtube != undefined ?
      `<a class="platform-url" href="${song.url[0].youtube}"  target="aboutblank">
        <img class="platform-img" src="./images/YouTube.png"/>YouTube
      </a>` : ``
    }
    ${song.url[0].youtubeMusic != undefined ?
      `<a class="platform-url" href="${song.url[0].youtubeMusic}"  target="aboutblank">
        <img class="platform-img" src="./images/YouTube Music.png"/>YouTube Music
      </a>` : ``
    }
    ${song.url[0].amazon != undefined ?
      `<a class="platform-url" href="${song.url[0].amazon}"  target="aboutblank">
        <img class="platform-img" src="./images/Amazon.png"/>Amazon Music
      </a>` : ``
    }
    ${song.url[0].bandLab != undefined ?
      `<a class="platform-url" href="${song.url[0].bandLab}"  target="aboutblank">
        <img class="platform-img" src="./images/BandLab.png"/>BandLab
      </a>` : ``
    }
    ${song.url[0].rocksmith != undefined ?
      `<a class="platform-url" href="${song.url[0].rocksmith}"  target="aboutblank">
        <img class="platform-img" src="./images/Rocksmith.png"/>Rocksmith
      </a>` : ``
    }
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