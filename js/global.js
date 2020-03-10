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

if (screen.width < 360) {
  var mvp = document.getElementById('vp');
  mvp.setAttribute("content","width=360, user-scalable=no");
}

window.addEventListener("keypress", (e) => {
  if (e.key == "Enter" && e.target.className != "track-name"){
    document.activeElement.blur();
  }
});

window.addEventListener("keydown", (e) => {
  if(e.key == "Escape") {
    document.activeElement.blur();
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

function nextFocus(e) {
  return getFocus(e,1);
}

function prevFocus(e) {
  return getFocus(e,-1);
}

function getFocus(e,cond){
  var universe = document.querySelectorAll("input, button, select, textarea, a[href], .content, .track-name, #main, iframe, .sixsixsix");
  var list = Array.prototype.filter.call(universe, function(item) {return item.tabIndex >= "0"});
  var index = list.indexOf(e);
  if(index + cond < 0){
    index = list.length;
  }
  return list[index + cond] || list[0];
}

//YouTube API
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

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