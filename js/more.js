const blurEl = document.querySelector('.blur');

let tabableTemp;

function openMore(){
    blurEl.style.display = 'block';
    tabableTemp = tabable;
    tabable = ".more-content > a, .close-more";
    setMoreTabIndex("1");
    event.stopPropagation();
}

function closeMore(){
    blurEl.style.display = 'none';
    tabable = tabableTemp;
    setMoreTabIndex("-1");
}

window.addEventListener("keydown", (e) => {
    if(e.key == "Escape") {
        closeMore();
    }
});

function setMoreTabIndex(value){
    let elms = blurEl.querySelectorAll("a, .close-more");
    elms.forEach(el => {
        el.tabIndex = value;
    });
}

setMoreTabIndex("-1");