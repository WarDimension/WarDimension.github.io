var mvp = document.getElementById("vp");
if (screen.width < 1024){
    mvp.setAttribute("content", "width=1024, user-scalable=no");
}

window.addEventListener("resize", (e) => {
    if(screen.width < 1024){
        mvp.setAttribute("content", "width=1024, user-scalable=no");
    }
    else{
        mvp.setAttribute("content", "width=device-width, initial-scale=1.0, user-scalable=no");
    }
});

const playerInput = document.querySelector(".player-input");

function playerInputDown(e){
    if(e.key == "Enter"){
        playerInput.style.height = "44px";
        playerInput.value = "";
    }
}

function playerInputUp(e){
    if(e.key == "Enter"){
        playerInput.style.height = "24px";
        playerInput.value = "";
    }
}

window.addEventListener("keydown", (e) => {
    if(e.key == "Tab"){
        e.preventDefault();
    }
});

const cards = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "skip", "reverse", "+2", "wild", "+4"];
const colors = ["green", "red", "yellow", "blue"];

function randomCard(){
    let card_index = Math.floor(Math.random() * 15);

    let isSpecial = Math.floor(Math.random() * 2);

    if(card_index >= 12 && isSpecial){
        card_index = Math.floor(Math.random() * 12);
    }

    let card = {
        "name": "",
        "color": ""
    };

    card.name = cards[card_index];

    if(card_index < 13) {
        let color_index = Math.floor(Math.random() * 4);
        card.color = colors[color_index];
    }
    else{
        card.color = "wild";
    }

    return card;
}