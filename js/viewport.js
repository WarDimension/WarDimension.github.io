var mvp = document.getElementById("vp");

function screenScale(){
  if(screen.width < 500) {
    mvp.setAttribute("content","width=500, user-scalable=no");
  }else if(screen.width > 1920) {
    mvp.setAttribute("content","width=1920, user-scalable=no");
  }else{
    mvp.setAttribute("content","width=device-width, initial-scale=1.0, user-scalable=no");
  }
}
screenScale();

window.addEventListener("resize", (e) => {
  screenScale();
});