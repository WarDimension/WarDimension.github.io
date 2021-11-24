var moreContainer = document.getElementsByClassName("more-container");
var moreButton = document.getElementsByClassName("more-button");
var moreMenu = document.getElementsByClassName("more-menu");
var moreList = document.getElementsByClassName("more-list");

var more_open = false;
function more(){
  if(!more_open){
    moreButton[0].innerHTML = "<i class='material-icons more_close'>clear</i>";
    moreMenu[0].style.opacity = "1";
    moreMenu[0].style.transition = "all 0.2s cubic-bezier(.25,.8,.25,1)";
    moreList[0].style.transition = "all 0.2s cubic-bezier(.25,.8,.25,1)";
  }
  else{
    moreButton[0].innerHTML = "<i class='material-icons'>add</i>\n<p class='more-text'>MORE</p>";
    moreMenu[0].style.opacity = "0";
    moreMenu[0].style.transition = "all 0s";
    moreList[0].style.transition = "all 0s";
  }
  more_open = !more_open;
  more_apps = false;
  more_games = false;
  displayMoreList();
}

var more_apps = false;
function moreApps(){
  more_apps = !more_apps;
  if(more_apps){
    apps_i[0].style.color = "cornflowerblue";
    games_i[0].style.color = "";
    more_games = false;
  }
  list_index = 0;
  displayMoreList();
}

var more_games = false;
function moreGames(){
  more_games = !more_games;
  if(more_games){
    games_i[0].style.color = "cornflowerblue";
    apps_i[0].style.color = "";
    more_apps = false;
  }
  list_index = 0;
  displayMoreList();
}

var list_nav_v2 = document.getElementsByClassName("list-nav-v2");
var more_apps_v2 = document.getElementsByClassName("more-apps-v2");
var more_games_v2 = document.getElementsByClassName("more-games-v2");
var moreLink = document.getElementsByClassName("more-link");
var apps_i = document.getElementsByClassName("apps-i");
var games_i = document.getElementsByClassName("games-i");
var prev_list = document.getElementsByClassName("prev-list");
var next_list = document.getElementsByClassName("next-list");

var apps_list = ["Ritsu.exe", "Mio.exe", "WarDimension_VirtualDrums", "GH!mania", "WarDimension Official Extension", "osu!play", "Keyboard", "List Sorter", "Character Counter"];
var apps_link = ["blog?b=experimental&p=2019/02/ritsu.exe", "blog?b=experimental&p=2019/02/mio.exe", "blog?b=experimental&p=2019/02/virtual-drums", "blog?b=experimental&p=2019/02/gh-mania", "blog?b=experimental&p=2020/02/wardimension-official-extension", "blog?b=experimental&p=2020/04/osu-play", "project/keyboard", "project/list-sorter", "project/character-counter"];

var games_list = ["UNO_command", "Git-Hero"];
var games_link = ["project/uno-command", "project/git-hero"];

list_index = 0;

function displayMoreList(){
  if((more_games || more_apps) && more_open){
    moreList[0].style.opacity = "1";
    list_nav_v2[0].style.opacity = "1";
    more_apps_v2[0].style.bottom = "95px";
    more_games_v2[0].style.bottom = "95px";
    prev_list[0].style.color = "";
    prev_list[1].style.color = "";
    next_list[0].style.color = "";
    next_list[1].style.color = "";

    if(list_index == 0){
      prev_list[0].style.color = "#ddd";
      prev_list[1].style.color = "#ddd";
    }

    if(more_apps){
      moreLink[0].innerHTML = apps_list[list_index];
      moreLink[0].href = "https://wardimension.github.io/" + apps_link[list_index];

      if(list_index == apps_list.length - 1){
        next_list[0].style.color = "#ddd";
        next_list[1].style.color = "#ddd";
      }
    }
    else if(more_games){
      moreLink[0].innerHTML = games_list[list_index];
      moreLink[0].href = "https://wardimension.github.io/" + games_link[list_index];

      if(list_index == games_list.length - 1){
        next_list[0].style.color = "#ddd";
        next_list[1].style.color = "#ddd";
      }
    }
  }
  else{
    moreList[0].style.opacity = "0";
    list_nav_v2[0].style.opacity = "0";
    more_apps_v2[0].style.bottom = "";
    more_games_v2[0].style.bottom = "";
    apps_i[0].style.color = "";
    games_i[0].style.color = "";
  }
}

function prevList(){
  if(list_index != 0){
    list_index--;
    displayMoreList();
  }
}

function nextList(){
  if(more_apps){
    if(list_index != apps_list.length - 1){
      list_index++;
      displayMoreList();
    }
  }
  else if(more_games){
    if(list_index != games_list.length - 1){
      list_index++;
      displayMoreList();
    }
  }
}

window.addEventListener("click", (e) => {
  var className = e.target.className;
  if(!(e.target.closest(".more-container") || ["more-text", "material-icons"].includes(className)) && more_open){
    more();
  }
});