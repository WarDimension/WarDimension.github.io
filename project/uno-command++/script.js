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

const playerInput = document.querySelector(".player-input");

function playerInputDown(e){
    if(e.key == 'Enter'){
        playerInput.style.height = '44px';
        playerInput.value = '';
    }
}

function playerInputUp(e){
    if(e.key == 'Enter'){
        playerInput.style.height = '24px';
        playerInput.value = '';
    }
}

window.addEventListener("keydown", (e) => {
    if(e.key == "Tab"){
        e.preventDefault();
    }
});