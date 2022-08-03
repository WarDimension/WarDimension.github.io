const removeHash = function(){
    function removeHash(){
        const url = new URL(window.location);
        url.hash = "";
        history.replaceState(null, document.title, url);
    }
    window.onhashchange = removeHash;
}();

function setParams(search){
    const url = new URL(window.location);
    url.search = search;
    history.replaceState(null, document.title, url);
}

function url(){
    let vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value){
        vars[key] = value;
    });
    return vars;
}

const blurOnEnter = function(condition){
    //!["track-name", "player-button"].includes(e.target.className)
    window.addEventListener("keypress", (e) => {
        if (e.key == "Enter" && condition){
            document.activeElement.blur();
        }
    });
}

const arrowNav = function(){
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
        let universe = document.querySelectorAll("input, button, select, textarea, a[href], .content, .track-name, #trailer, iframe, .sixsixsix");
        let list = Array.prototype.filter.call(universe, function(item) {return item.tabIndex >= "0"});
        let index = list.indexOf(element);
        if(index + cond < 0){
            index = list.length;
        }
        return list[index + cond] || list[0];
    }
}();

/*

+ Add this to the song.js

let unTab = "";
window.addEventListener("keydown", (e) => {
    if(unTab == "original"){
        originalButton.tabIndex = "-1";
    }
    else if(unTab == "cover"){
        coverButton.tabIndex = "-1";
    }
    unTab = "";
});

*/

const toHHMMSS = function(){
    String.prototype.toHHMMSS = function () {
        let sec_num = parseInt(this, 10); // don't forget the second param
        let hours   = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        let seconds = sec_num - (hours * 3600) - (minutes * 60);
    
        if (hours   < 1) {hours   = ""} else {hours = hours+":"}
        if (minutes < 1) {minutes = "0"}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours+minutes+':'+seconds;
    }
}();

//auto run: removeHash, arrowNav, toHHMMSS
export {removeHash, setParams, url, blurOnEnter, arrowNav, toHHMMSS};