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