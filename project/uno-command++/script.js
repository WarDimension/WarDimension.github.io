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

// SETTINGS

let maxPlayers = 4;
let rotatesHands = true;
let swapHands = true;
let challengeSet = true;
let stacking = true;
let background = "default";

// SETTINGS END

const cards = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "skip", "reverse", "+2", "wild", "+4"];
const colors = ["green", "red", "yellow", "blue"];

function randomCard(){
    let cardIndex = Math.floor(Math.random() * 15);

    let isSpecial = Math.floor(Math.random() * 2);

    if(cardIndex >= 12 && isSpecial){
        cardIndex = Math.floor(Math.random() * 12);
    }

    let card = {
        "name": "",
        "color": ""
    };

    card.name = cards[cardIndex];

    if(cardIndex < 13) {
        let colorIndex = Math.floor(Math.random() * 4);
        card.color = colors[colorIndex];
    }
    else{
        card.color = "wild";
    }

    return card;
}

function randomCards(amount = 7){
    var sevCards = [];
    for(var i = 0; i < amount; i++){
        sevCards.push(randomCard());
    }

    return sevCards;
}

function randomPlayersCards(){
    for(let i = 0; i < maxPlayers; i++){
        players[i].cards = randomCards();
    }
}

let players = [{
    "name": "player_1",
    "cards": []
}];

function resetPlayers(){
    players = [{
        "name": "player_1",
        "cards": []
    }];
}

let AINames = ["WarDimension", "プラン", players[0].name + "'s Clone", "C:\\User\\" + players[0].name, "AI-chan", "I'm a human, I swear", "I'm fine", "AI FTW", "._.)", "UNO_BOT", "Markivider", "Javascript AI", "_anon", "_blank", "1010011010", "666", "EEE", "SLAP LIKE NOW", "アニメ", "weebs69", "Davie404", "Barbara", "UNO_Master", "Baby Yoda", "NO U", "I have +4, LOL", "Anonymous"];

function randomAI(){
    for(let i = 1; i < maxPlayers; i++){
        let AIName = AINames[Math.floor(Math.random() * AINames.length)];

        while(JSON.stringify(players).includes(AIName)){
            AIName = AINames[Math.floor(Math.random() * AINames.length)];
        }

        players.push({
            "name": AIName
        });
    }
}

// PRE PLAY

function PRE_PLAY(){
    resetPlayers();
    randomAI();
    randomPlayersCards();

    console.log(players);
}

// PRE PLAY END