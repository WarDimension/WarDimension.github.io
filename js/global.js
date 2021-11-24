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
  else if (e.key == "ArrowLeft" || (e.shiftKey && e.key == "Tab")){
    e.target.tagName != "iframe" && e.preventDefault();
    prevFocus(document.activeElement).focus();
  }
  else if (e.key == "ArrowRight" || e.key == "Tab"){
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

console.clear();

console.group("FUN (.❛ ᴗ ❛.)");
  console.log("%c│𝄞 ⁴⁄₄ ᴅ♪ ᴇ♪ ғ♪ ɢ♪ ᴇ♩ ᴄ♪ ᴅ♪│‿𝅝║", "font-size: 16px; margin: 10px 0;");

  var consoleStyle = "padding: 1px 6px; color: #fbfbfb; background: #444;";

  console.groupCollapsed("%c[-GAMES-]", consoleStyle);
    console.log("%cUNO_command", consoleStyle, "https://wardimension.github.io/project/uno-command");
    console.log("%cGit-Hero", consoleStyle, "https://wardimension.github.io/project/git-hero");
  console.groupEnd();

  console.groupCollapsed("%c[-APPS-]", consoleStyle);
    console.log("%cRitsu.exe", consoleStyle, "https://wardimension.github.io/blog?b=experimental&p=2019/02/ritsu.exe");
    console.log("%cMio.exe", consoleStyle, "https://wardimension.github.io/blog?b=experimental&p=2019/02/mio.exe");
    console.log("%cWarDimension_VirtualDrums", consoleStyle, "https://wardimension.github.io/blog?b=experimental&p=2019/02/virtual-drums");
    console.log("%cGH!mania", consoleStyle, "https://wardimension.github.io/blog?b=experimental&p=2019/02/gh-mania");
    console.log("%cWarDimension Official Extension", consoleStyle, "https://wardimension.github.io/blog?b=experimental&p=2020/02/wardimension-official-extension");
    console.log("%cosu!play", consoleStyle, "https://wardimension.github.io/blog?b=experimental&p=2020/04/osu-play");
    console.log("%cKeyboard", consoleStyle, "https://wardimension.github.io/project/keyboard");
    console.log("%cList Sorter", consoleStyle, "https://wardimension.github.io/project/list-sorter");
    console.log("%cCharacter Counter", consoleStyle, "https://wardimension.github.io/project/character-counter");
  console.groupEnd();
console.groupEnd();

console.groupCollapsed("%cThe End of the World", "padding: 1px 8px; color: #fff; background: #e2363a; border-radius: 15px;");

