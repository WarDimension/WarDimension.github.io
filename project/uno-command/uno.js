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

var ai_names = ["WarDimension", "AI-chan", "I'm a human, I swear", "I'm fine", "AI FTW", "._.)", "UNO_BOT", "Markdivider", "Javascript AI", "_anon", "_blank", "1010011010", "666", "EEE", "SLAP LIKE NOW", "アニメ", "weebs69", "Davie404", "<span style='color: green'>Green</span>"];
var players = ["player_1"];
var players_cards = [];

var current_card = "";

var max_player = 4;
var turn = 0;
var turn_before = 0;
var turn_skip = 0;

var reverse = false;
var plusCard = true;
var first_play = true;

var winner = "";

if(localStorage.getItem("player_name") != null){
    changeName(localStorage.getItem("player_name"));
}

function updateTurn(){
    if(players_cards[turn].length == 0){
        state = "win";
        cl_dsp.innerHTML += "<br/><br/>|WINNER| " + players[turn] + " |WINNER|<br/><br/>[play] play again [esc] exit";
        if(winner == ""){
            winner = players[turn];
        }
    }

    turn_before = turn;
    if(!reverse){
        turn++;
        if(current_card.includes("skip")){
            turn_skip = turn;
            turn++;
        }
    }
    else{
        turn--;
        if(current_card.includes("skip")){
            turn_skip = turn;
            turn--;
        }
    }

    if(turn > max_player-1){
        turn -= max_player;
    }
    else if(turn < 0){
        turn += max_player;
    }
}

function cardChecker(card){
    var card_val_r = /((\+?\d+)|skip|reverse|wild)/g;
    var color_r = /(green|red|yellow|blue)/g;

    var c_card_val = current_card.match(card_val_r)[0];
    var c_color = current_card.match(color_r)[0];

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
    else if(command == "esc"){
        players = [players[0]];
        players_cards = [];
        turn = 0;
        reverse = false;
        plusCard = true;
        first_play = true;
        cl_dsp.innerHTML = cl_dsp_head + cl_dsp_menu;
        state = "menu";
    }
    else if(command == "cls"){
        cl_dsp.innerHTML = cl_dsp_head + "<br/><br/>|choose color| [1] green [2] red [3] yellow [4] blue<br/><br/>[esc] exit";
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

function applyPlusCard(){
    if(plusCard && (current_card.includes("+2") || current_card.includes("+4"))){
        if(first_play){
            cl_dsp.innerHTML += `<br/><br/>UNO -> ${players[turn]} +`;
        }
        else{
            cl_dsp.innerHTML += `<br/><br/>${players[turn_before]} -> ${players[turn]} +`;
        }

        if(current_card.includes("+2")){
            cl_dsp.innerHTML += "2";
            for(var i = 0; i < 2; i++){
                draw = randomCard();
                players_cards[turn].push(draw);
            }
        }
        else if(current_card.includes("+4")){
            cl_dsp.innerHTML += "4";
            for(var i = 0; i < 4; i++){
                draw = randomCard();
                players_cards[turn].push(draw);
            }
        }

        updateTurn();

        plusCard = false;
    }
}

function updateDSP(){
    if(state == "win"){
        return;
    }

    applyPlusCard();

    if(current_card.includes("skip") && turn_skip > -1){
        if(first_play){
            cl_dsp.innerHTML += `<br/><br/>UNO -> ${players[turn_skip]} skip`;
            turn_skip = -1;
        }
        else{
            cl_dsp.innerHTML += `<br/><br/>${players[turn_before]} -> ${players[turn_skip]} skip`;
            turn_skip = -1;
        }
    }
    
    cl_dsp.innerHTML += "<br/><br/>current_card: " + current_card + "<br/><br/>|" + players_cards[turn].length + " cards| ";

    if(turn == 0){
        for(var i = 0; i < players_cards[turn].length; i++){
            cl_dsp.innerHTML += `[${i+1}] ${players_cards[turn][i]} `;
        }
        cl_dsp.innerHTML += "<br/><br/>[esc] exit";
    }
    else{
        cl_dsp.innerHTML += "[" + players[turn] + "'s cards]";
        cl_dsp.innerHTML += "<br/><br/>" + players[turn]+ "> ";
    }

    first_play = false;
}

function UNO_PRE(){
    localStorage.setItem("player_name", players[0]);
    first_in = true;

    randomAI();

    current_card = randomCard();

    if(current_card == "+4" || current_card == "wild"){
        var color_index = Math.floor(Math.random() * colors.length);
        current_card += " -> " + colors[color_index];
    }

    randomPlayersCards();

    turn = Math.floor(Math.random() * players.length);

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
            if(i > 0 && players_cards[0][card_index[i]] != players_cards[0][card_index[0]]){
                cl_dsp.innerHTML += "<br/>invalid combo.";
                return;
            }
        }

        if(cardChecker(players_cards[0][card_index[0]])){
            card_index.sort();
            current_card = players_cards[0][card_index[0]];

            for(var i = card_index.length-1; i >= 0; i--){
                players_cards[0].splice(card_index[i], 1);
            }

            if(current_card == "wild" || current_card == "+4"){
                if(current_card == "+4"){
                    plusCard = true;
                }

                var color_r = /(green|red|yellow|blue)/g;

                if(color_r.test(command)){
                    current_card += " -> " + command.match(color_r);
                }
                else{
                    cl_dsp.innerHTML += "<br/><br/>|choose color| [1] green [2] red [3] yellow [4] blue<br/><br/>[esc] exit";
                    state = "color_choose";
                    return;
                }
            }
            else if(current_card.includes("+2")){
                plusCard = true;
            }
            else if(current_card.includes("reverse")){
                reverse = true;
            }

            updateTurn();
            updateDSP();
        }
        else{
            cl_dsp.innerHTML += "<br/>you can't play that card.";
        }
    }
    else if(command == "auto"){
        for(var i = 0; i < players_cards[0].length; i++){
            console.log(players_cards[0][i]);
            if(players_cards[0][i] == "+4" || players_cards[0][i] == "wild"){
                if(players_cards[0][i] == "+4"){
                    plusCard = true;
                }

                var color_index = Math.floor(Math.random() * colors.length);

                current_card = players_cards[0][i];

                current_card += " -> " + colors[color_index];

                players_cards[0].splice(i, 1);
                
                updateTurn();
                updateDSP();
                return;
            }
            else if(cardChecker(players_cards[0][i])){
                console.log(players_cards[0][i]);
                if(players_cards[0][i].includes("+2")){
                    plusCard = true;
                }

                current_card = players_cards[0][i];

                players_cards[0].splice(i, 1);
                
                updateTurn();
                updateDSP();
                return;
            }
        }

        drawCard();
    }
    else if(command == "draw"){
        drawCard();
    }
    else if(command == "cls"){
        cl_dsp.innerHTML = cl_dsp_head;
        updateDSP();
    }
    else if(command == "esc"){
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
    while(turn != 0){
        if(state == "win"){
            return;
        }

        var hasCard = false;
        var hasNum = false;

        for(var i = 0; i < players_cards[turn].length; i++){
            if(players_cards[turn][i] == "+4" || players_cards[turn][i] == "wild"){
                hasCard = true;
            }
            else if(cardChecker(players_cards[turn][i])){
                hasCard = true;
                hasNum = true;
            }
        }

        if(hasCard){
            var play = Math.floor(Math.random() * players_cards[turn].length);

            
            if(players_cards[turn][play] == "+4" || players_cards[turn][play] == "wild"){
                if(players_cards[turn][play] == "+4"){
                    plusCard = true;
                }

                var color_index = Math.floor(Math.random() * colors.length);

                cl_dsp.innerHTML += play + " " + colors[color_index];
                current_card = players_cards[turn][play];

                current_card += " -> " + colors[color_index];

                players_cards[turn].splice(play, 1);
            }
            else if(hasNum){
                while(!cardChecker(players_cards[turn][play]) || players_cards[turn][play] == "+4" || players_cards[turn][play] == "wild"){
                    play = Math.floor(Math.random() * players_cards[turn].length);
                }

                if(players_cards[turn][play].includes("+2")){
                    plusCard = true;
                }

                current_card = players_cards[turn][play];
                var card_index = [];

                for(var i = players_cards[turn].length - 1; i >= 0; i--){
                    if(players_cards[turn][i] == current_card){
                        players_cards[turn].splice(i, 1);
                        card_index.push(i+1);
                    }
                }

                card_index = card_index.sort();
                cl_dsp.innerHTML += card_index.join(" + ");
            }
            else{
                while(!cardChecker(players_cards[turn][play])){
                    play = Math.floor(Math.random() * players_cards[turn].length);
                }

                if(players_cards[turn][play] == "+4"){
                    plusCard = true;
                }

                var color_index = Math.floor(Math.random() * colors.length);

                cl_dsp.innerHTML += play + " " + colors[color_index];
                current_card = players_cards[turn][play];

                current_card += " -> " + colors[color_index];

                players_cards[turn].splice(play, 1);
            }

            if(current_card.includes("reverse")){
                reverse = true;
            }

            updateTurn();
            updateDSP();
        }
        else{
            cl_dsp.innerHTML += "draw";
            drawCard();
        }

        cl.scrollTo(0,cl.scrollHeight);
    }
}