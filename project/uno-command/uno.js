var cards = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "skip", "reverse", "+2", "wild", "+4"];
var colors = ["green", "red", "yellow", "blue"];

function randomCard(){
    var card_index = Math.floor(Math.random() * 15);

    var special = Math.floor(Math.random() * 2);

    if(card_index >= 12 && special != 0){
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
        while(players.includes(ai_name)){
            ai_name = ai_names[Math.floor(Math.random() * ai_names.length)];
        }
        players.push(ai_name);
    }
}

function randomPlayersCards(){
    for(var i = 0; i < max_player; i++){
        players_cards.push(random7Cards());
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

function cardChecker(card){
    var card_val_r = /((\+?\d+)|skip|reverse|wild)/g;
    var color_r = /(green|red|yellow|blue)/g;

    var c_card_val = current_card.match(card_val_r)[0];
    var c_color = current_card.match(color_r);

    if(c_color != null){
        c_color = c_color[0]; //this part only for testing, later c_color will be allways available, add [0] back to the match above
    }

    var card_val = card.match(card_val_r);
    var color = card.match(color_r);

    if(card_val == c_card_val || color == c_color || card_val == "wild" || card_val == "+4"){
        return true;
    }
    return false;
}

function hasDuplicates(arr) {
    var counts = [];

    for (var i = 0; i <= arr.length; i++) {
        if (counts[arr[i]] === undefined) {
            counts[arr[i]] = 1;
        } else {
            return true;
        }
    }
    return false;
}

function colorChoose(){
    var command = cl_in.value.toLowerCase();
    if(command >= 1 && command <= 4){
        current_card += " -> " + colors[command-1];
        updateTurn();
        updateDSP();
        state = "play";
    }
    else if(command == "orange"){
        cl_dsp.innerHTML += "<br/>we are not playing guitar hero!";
    }
    else{
        cl_dsp.innerHTML += "<br/>invalid command.";
    }
}

function drawCard(){
    var draw = "";
    while(!cardChecker(draw)){
        draw = randomCard();
        players_cards[turn].push(draw);
    }
    updateDSP();
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
    var command = cl_in.value.toLowerCase();

    var filter = /^( ?\+? ?(\d+))+ ?(green|red|yellow|blue)? ?(uno)?$/g;

    if(filter.test(command)){
        var card_index_r = /\d+/g;
        var card_index = command.match(card_index_r);

        if(hasDuplicates(card_index)){
            cl_dsp.innerHTML += "<br/>invalid combo.";
            return;
        }
        
        for(var i = 0; i < card_index.length; i++){
            card_index[i] = card_index[i] - 1;
            if(card_index[i] < 0 || card_index[i] >= players_cards[0].length){
                cl_dsp.innerHTML += "<br/>you only have "+players_cards[0].length+" cards, stoopid!";
                return;
            }
            if(i > 0){
                if(players_cards[0][card_index[i]] != players_cards[0][card_index[0]]){
                    cl_dsp.innerHTML += "<br/>invalid combo.";
                    return;
                }
            }
        }

        if(cardChecker(players_cards[0][card_index[0]])){
            card_index.sort();
            current_card = players_cards[0][card_index[0]];

            for(var i = card_index.length-1; i >= 0; i--){
                players_cards[0].splice(card_index[i], 1);
            }

            if(current_card == "wild" || current_card == "+4"){
                var color_r = /(green|red|yellow|blue)/g;
                if(color_r.test(command)){
                    current_card += " -> " + command.match(color_r);
                }
                else{
                    cl_dsp.innerHTML += "<br/><br/>|choose color| [1] green [2] red [3] yellow [4] blue";
                    state = "color_choose";
                    return;
                }
            }
            updateTurn();
            updateDSP();
        }
        else{
            cl_dsp.innerHTML += "<br/>you can't play that card.";
        }
    }
    else if(command == "draw"){
        drawCard();
    }
    else if(command == "cls"){
        cl_dsp.innerHTML = cl_dsp_head;
        updateDSP();
    }
    else if(command == "ex"){
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