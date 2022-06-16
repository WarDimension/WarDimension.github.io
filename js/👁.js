let glyphs = document.querySelector(".glyphs");

let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;

glyphs.style.setProperty("--x", centerX + "px");
glyphs.style.setProperty("--y", centerY + "px");

function setPosition(x, y){
    glyphs.style.setProperty("--x", x + "px");
    glyphs.style.setProperty("--y", y + "px");

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