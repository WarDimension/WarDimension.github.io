var cards = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "skip", "reverse", "+2", "wild", "+4"];
var colors = ["red", "yellow", "green", "blue"];

function randomCard(){
    var card_index = Math.floor(Math.random() * 15);

    var special = Math.floor(Math.random() * 2);

    if(card_index >= 12 && card_index <= 14 && special != 0){
        card_index = Math.floor(Math.random() * 12);
    }

    var card = "";

    if(card_index != 13 && card_index != 14){
        var color_index = Math.floor(Math.random() * 4);
        card = colors[color_index] + " ";
    }

    return card + cards[card_index];
}

function random7Cards(){
    var sevCards = [];
    for(var i = 0; i < 7; i++){
        sevCards.push(randomCard());
    }

    return sevCards;
}

function randomAI(){
    for(var i = 1; i < max_player; i++){
        var ai_name = ai_names[Math.floor(Math.random() * ai_names.length)];
        while(players.indexOf(ai_name) >= 0){
            ai_name = ai_names[Math.floor(Math.random() * ai_names.length)];
        }
        players.push(ai_name);
    }
}

function randomPlayersCards(){
    for(var i = 0; i < max_player; i++){
        players_cards.push(random7Cards());
        console.log(players_cards);
    }
}

var ai_names = ["AI-chan", "I'm a human, I swear", "I'm fine", "AI FTW", "._.)", "UNO_BOT", "Markdivider", "Javascript AI", "WarDimension"];
var players = ["player_1"];
var players_cards = [];

var current_card = "";

var max_player = 4;
var turn = 0;

var reverse = false;

if(localStorage.getItem("player_name") != null){
    changeName(localStorage.getItem("player_name"));
}

function updateTurn(){
    if(!reverse){
        turn++;
        if(current_card.includes("skip")){
            turn++;
        }
    }
    else{
        turn--;
        if(current_card.includes("skip")){
            turn--;
        }
    }

    if(turn > max_player-1){
        turn -= max_player;
    }
    else if(turn < 0){
        turn += max_player-1;
    }
}

function updateDSP(){
    cl_dsp.innerHTML += "<br/><br/>current_card: " + current_card + "<br/><br/>|" + players_cards[turn].length + " cards| ";

    if(turn == 0){
        for(var i = 0; i < players_cards[turn].length; i++){
            cl_dsp.innerHTML += `[${i+1}] ${players_cards[turn][i]} `;
        }
        cl_dsp.innerHTML += "<br/><br/>[ex] exit";
    }
    else{
        cl_dsp.innerHTML += "<br/><br/>" + players[turn]+ "&gt; ";
    }
}

function UNO_PRE(){
    localStorage.setItem("player_name", players[0]);
    first_in = true;

    randomAI();

    current_card = randomCard();

    randomPlayersCards();

    cl_dsp.innerHTML = cl_dsp_head;

    updateDSP();

    state = "play";
}

function UNO(){
    if(cl_in.value >= 1 && cl_in.value <= players_cards[0].length){
        updateTurn();
        updateDSP();
    }
    else if(cl_in.value == "cls"){
        cl_dsp.innerHTML = cl_dsp_head + "current_card: " + current_card + "<br/><br/>";
        cardDSP(player_cards);
        cl_dsp.innerHTML += "<br/><br/>[ex] exit";
    }
    else if(cl_in.value == "ex"){
        players = [players[0]];
        players_cards = [];
        cl_dsp.innerHTML = cl_dsp_head + cl_dsp_menu;
        state = "menu";
    }
    else{
        cl_dsp.innerHTML += "<br/>invalid command.";
    }
}

function UNO_AI(){
    if(turn != 0){
        while(turn != 0){
            play = Math.floor(Math.random() * players_cards[turn].length);

            cl_dsp.innerHTML += play;

            current_card = players_cards[turn][play];
            
            updateTurn();
            updateDSP();

            cl.scrollTo(0,cl.scrollHeight);
        }
    }
}