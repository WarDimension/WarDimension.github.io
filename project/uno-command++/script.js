var mvp = document.getElementById("vp");
if(screen.width < 1024) {
  mvp.setAttribute("content","width=1024, user-scalable=no");
}

window.addEventListener("resize", (e) => {
  if(screen.width < 1024) {
    mvp.setAttribute("content","width=1024, user-scalable=no");
  }else{
    mvp.setAttribute("content","width=device-width, initial-scale=1.0, user-scalable=no");
  }
});