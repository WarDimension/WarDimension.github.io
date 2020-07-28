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

function url(){
  var vars = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value){
      vars[key] = value;
  });
  return vars;
}

function getParentClass(element, classname){
  if (element.className && element.className.split(' ').indexOf(classname)>=0){
    return element.className;
  }
  return element.parentNode && getParentClass(element.parentNode, classname);
}

function getParentId(element, id){
  if (element.id && element.id.indexOf(id)>=0){
    return element.id;
  }
  return element.parentNode && getParentId(element.parentNode, id);
}

function getParentIdByElement(element){
  if (element.id){
    return element.id;
  }
  return element.parentNode && getParentIdByElement(element.parentNode);
}

// MORE

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

var apps_list = ["Ritsu.exe", "Mio.exe", "WarDimension_VirtualDrums", "GH!mania", "WarDimension Official Extension", "osu!play"];
var apps_link = ["https://wardimension.github.io/blog?b=experimental&p=2019/02/ritsu.exe", "https://wardimension.github.io/blog?b=experimental&p=2019/02/mio.exe", "https://wardimension.github.io/blog?b=experimental&p=2019/02/virtual-drums", "https://wardimension.github.io/blog?b=experimental&p=2019/02/gh-mania", "https://wardimension.github.io/blog?b=experimental&p=2020/02/wardimension-official-extension", "https://wardimension.github.io/blog?b=experimental&p=2020/04/osu-play"];

var games_list = ["UNO_command"];
var games_link = ["https://wardimension.github.io/project/uno-command/"];

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
      moreLink[0].href = apps_link[list_index];

      if(list_index == apps_list.length - 1){
        next_list[0].style.color = "#ddd";
        next_list[1].style.color = "#ddd";
      }
    }
    else if(more_games){
      moreLink[0].innerHTML = games_list[list_index];
      moreLink[0].href = games_link[list_index];

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

// END MORE

var mvp = document.getElementById("vp");
if(screen.width < 360) {
  mvp.setAttribute("content","width=360, user-scalable=no");
}

window.addEventListener("resize", (e) => {
  if(screen.width < 360) {
    mvp.setAttribute("content","width=360, user-scalable=no");
  }else{
    mvp.setAttribute("content","width=device-width, initial-scale=1.0, user-scalable=no");
  }
});

window.addEventListener("click", (e) => {
  var className = e.target.className;
  if(!(getParentClass(e.target, "more-container") || className == "more-text" || className =="material-icons") && more_open){
    more();
  }
});

window.addEventListener("keypress", (e) => {
  if (e.key == "Enter" && e.target.className != "track-name"){
    document.activeElement.blur();
  }
});

window.addEventListener("keydown", (e) => {
  if(e.key == "Escape") {
    document.activeElement.blur();
    document.getElementsByTagName("html")[0].style.scrollBehavior = "smooth";
    window.scrollTo(0, 0);
  }
  else if (e.keyCode == "37" || (e.shiftKey && e.keyCode == "9")){
    e.target.tagName != "iframe" && e.preventDefault();
    prevFocus(document.activeElement).focus();
  }
  else if (e.keyCode == "39" || e.keyCode == "9"){
    e.target.tagName != "iframe" && e.preventDefault();
    nextFocus(document.activeElement).focus();
  }
});


window.addEventListener("keyup", (e) => {
  if (e.key == " " && e.target.className != "track-name"){
    e.target.blur();
  }
});

function nextFocus(element) {
  if(element.innerHTML == "return"){
    document.getElementsByTagName("html")[0].style.scrollBehavior = "auto";
  }
  else{
    document.getElementsByTagName("html")[0].style.scrollBehavior = "smooth";
  }
  return getFocus(element,1);
}

function prevFocus(element) {
  if(element.tagName == "BODY" || element.className == "skip"){
    document.getElementsByTagName("html")[0].style.scrollBehavior = "auto";
  }
  else{
    document.getElementsByTagName("html")[0].style.scrollBehavior = "smooth";
  }
  return getFocus(element,-1);
}

function getFocus(element,cond){
  var universe = document.querySelectorAll("input, button, select, textarea, a[href], .content, .track-name, #main, iframe, .sixsixsix");
  var list = Array.prototype.filter.call(universe, function(item) {return item.tabIndex >= "0"});
  var index = list.indexOf(element);
  if(index + cond < 0){
    index = list.length;
  }
  return list[index + cond] || list[0];
}

String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 1) {hours   = ""} else {hours = hours+":"}
  if (minutes < 1) {minutes = "0"}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+minutes+':'+seconds;
}