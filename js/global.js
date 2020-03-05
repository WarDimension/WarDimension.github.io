function removeHash(){
    const url = new URL(window.location);
    url.hash = "";
    history.replaceState(null, document.title, url);
}
window.onhashchange = removeHash;

window.onload = function() {
    if (screen.width < 480) {
        var mvp = document.getElementById('vp');
        mvp.setAttribute("content","width=480, user-scalable=no");
    }
}

window.addEventListener("keydown", (e) => {
    if(e.key == "Escape") {
      document.activeElement.blur();
      window.scrollTo(0, 0);
    }
    else if (e.keyCode == "37"){
      prevFocus(document.activeElement).focus();
    }
    else if (e.keyCode == "39"){
      nextFocus(document.activeElement).focus();
    }
});

function nextFocus(e) {
    return getFocus(e,1);
}

function prevFocus(e) {
    return getFocus(e,-1);
}

function getFocus(e,cond){
    var universe = document.querySelectorAll("input, button, select, textarea, a[href], .content, .track-name");
    var list = Array.prototype.filter.call(universe, function(item) {return item.tabIndex >= "0"});
    var index = list.indexOf(e);
    if(index + cond < 0){
      index = list.length;
    }
    return list[index + cond] || list[0];
}