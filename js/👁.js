let glyphs = document.querySelector(".glyphs");

let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;

function centerLight(){
    centerX = window.innerWidth / 2;
    centerY = window.innerHeight / 2;

    glyphs.style.setProperty("--x", centerX + "px");
    glyphs.style.setProperty("--y", centerY + "px");

    setShadow(centerX, centerY);
}

centerLight();

function limit(a, b){
    if(a > b){
        return b;
    }
    else if(a < -b){
        return -b;
    }

    return a;
}

function setShadow(x, y){
    let offsetX = x - centerX;
    let offsetY = y - centerY;

    let maxOffset = glyphs.offsetHeight/2;

    offsetX = limit(offsetX, maxOffset);
    offsetY = limit(offsetY, maxOffset);

    let cr = 6 / maxOffset; //box-shadow spread / max offset

    offsetX *= cr;
    offsetY *= cr;

    if(maxOffset == 0) offsetX = offsetY = 0;

    glyphs.style.setProperty("--shadowX", -offsetX + "px");
    glyphs.style.setProperty("--shadowY", -offsetY + "px");
}

function setPosition(x, y){
    glyphs.style.setProperty("--x", x + "px");
    glyphs.style.setProperty("--y", y + "px");

    setShadow(x, y);
}

document.addEventListener("mousemove", (e) => {
    let x = e.pageX;
    let y = e.pageY;

    setPosition(x, y);
});

document.addEventListener("touchmove", (e) => {
    let touch = e.touches[0] || e.changedTouches[0];
    let x = touch.pageX;
    let y = touch.pageY;

    setPosition(x, y);
});

window.addEventListener('contextmenu', e => {
  e.preventDefault();
});

window.addEventListener("resize", (e) => {
    centerLight();
});