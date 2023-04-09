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

// UPDATE DISPLAY

const playerCardsContainer = document.querySelector(".player-cards-container");
function displayPlayerCards(playerIndex, isHidden = false){
    let cards = players[playerIndex].cards;
    let cardsHTML = "";

    if(isHidden){
        for(let i = 0; i < cards.length; i++){
            cardsHTML += `<p class="card" style="--num: '${i + 1}';">[?]</p>`;
        }
        return cardsHTML;
    }

    for(let i = 0; i < cards.length; i++){
        cardsHTML += `<p class="card color-${cards[i].color}" style="--num: '${i + 1}';">[${cards[i].name}]</p>`;
    }
    return cardsHTML;
}

const playerNameHTML = document.querySelector(".player-name");
function updateNameDisplay(playerIndex){
    playerNameHTML.innerHTML = players[playerIndex].name + ">";
    playerInput.style.textIndent = playerNameHTML.scrollWidth + 10 + "px";
}

function updatePlayerDisplay(playerIndex, showCards){
    playerCardsContainer.innerHTML = `<p class="inline">cards [${players[playerIndex].cards.length}]:</p>`;
    switch(showCards){
        case "hidden":
            playerCardsContainer.innerHTML += displayPlayerCards(playerIndex, true);
            break;
        case "none":
            playerCardsContainer.style = "none";
            break;
        default:
            playerCardsContainer.innerHTML += displayPlayerCards(playerIndex);
            playerCardsContainer.style = "block";
            break;
    }

    updateNameDisplay(playerIndex);
}

function updateDisplay(playerIndex = 0, showCards){
    updatePlayerDisplay(playerIndex, showCards);
}

// UPDATE DISPLAY END

// CARDS

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

// CARDS END

// PLAYERS

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
    AINames[2] = players[0].name + "'s Clone";
    AINames[3] = "C:\\User\\" + players[0].name;

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

// PLAYERS END

// PRE PLAY

function PRE_PLAY(){
    resetPlayers();
    randomAI();
    randomPlayersCards();
    updateDisplay();
}

// PRE PLAY END