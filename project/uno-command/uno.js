var cards = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "skip", "reverse", "+2", "wild", "+4"];
var colors = ["green", "red", "yellow", "blue"];

var play_menu = "<br/><br/>[auto] autoplay [esc] exit";

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

var players = ["player_1"];
var players_cards = [];

if(localStorage.getItem("player_name") != null){
    changeName(localStorage.getItem("player_name"));
}

var ai_names = ["WarDimension", "AI-chan", "I'm a human, I swear", "I'm fine", "AI FTW", "._.)", "UNO_BOT", "Markdivider", "Javascript AI", "_anon", "_blank", "1010011010", "666", "EEE", "SLAP LIKE NOW", "アニメ", "weebs69", "Davie404", "Barbara", "UNO_Master", players[0] + "'s Clone"];

var current_card = "";

var max_player = 4;
var turn = 0;
var turn_before = 0;
var turn_skip = 0;

var reverse = false;
var plusCard = true;
var first_play = true;

var winner = "";

function win(){
    state = "win";
    cl_dsp.innerHTML += "<br/><br/>|WINNER| " + players[turn] + " |WINNER|<br/><br/>[play] play again [esc] exit";
    if(winner == ""){
        winner = players[turn];
    }
}

function exit(){
    players = [players[0]];
    players_cards = [];
    turn = 0;
    reverse = false;
    plusCard = true;
    first_play = true;
    cl_dsp.innerHTML = cl_dsp_head + cl_dsp_menu;
    state = "menu";
}

function updateTurn(){
    if(players_cards[turn].length == 0){
        win();
    }

    apply0Card();

    turn_before = turn;
    if(!reverse){
        turn++;
        if(current_card.includes("skip")){
            turn_skip = turn;

            if(turn_skip > max_player-1){
                turn_skip -= max_player;
            }
            else if(turn_skip < 0){
                turn_skip += max_player;
            }
            
            turn++;
        }
    }
    else{
        turn--;
        if(current_card.includes("skip")){
            turn_skip = turn;

            if(turn_skip > max_player-1){
                turn_skip -= max_player;
            }
            else if(turn_skip < 0){
                turn_skip += max_player;
            }

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
        exit();
    }
    else if(command == "cls"){
        cl_dsp.innerHTML = cl_dsp_head + "<br/><br/>|choose color| [1] green [2] red [3] yellow [4] blue" + play_menu;
    }
    else{
        cl_dsp.innerHTML += "<br/>invalid command.";
    }
}

function swapHandsDSP(){
    cl_dsp.innerHTML += "<br/><br/>|swap hands|";
    for(var i = 1; i < max_player; i++){
        cl_dsp.innerHTML += ` [${i}] ${players[i]} |${players_cards[i].length} cards|`;
    }
    cl_dsp.innerHTML += play_menu;
}

function swapHands(){
    var command = cl_in.value.toLowerCase();

    var filter = /^\d+ ?(uno)?$/;

    if(filter.test(command)){
        var target = command.match(/\d+/);

        var handsTemp = players_cards[0];

        players_cards[0] = players_cards[target];
        players_cards[target] = handsTemp;

        cl_dsp.innerHTML += "<br/><br/>" + players[0] + " <-> " + players[target] + " swap hands";

        if(players_cards[0].length == 1 && !command.includes("uno")){
            applyUNO();
        }

        updateTurn();
        updateDSP();
        state = "play";
    }
    else if(command == "esc"){
        exit();
    }
    else if(command == "cls"){
        swapHandsDSP();
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

function apply0Card(){
    if(current_card.includes("0") && state != "win"){
        cl_dsp.innerHTML += "<br/>everyone rotates hands.";
        
        if(reverse){
            var handsTemp = players_cards[0];

            for(var i = 1; i < max_player; i++){
                players_cards[i-1] = players_cards[i];
            }
            players_cards[max_player-1] = handsTemp;
        }
        else{
            var handsTemp = players_cards[max_player-1];
            
            for(var i = max_player-2; i >= 0; i--){
                players_cards[i+1] = players_cards[i];
            }
            players_cards[0] = handsTemp;
        }
    }
}

function applyUNO(){
    cl_dsp.innerHTML += "<br/><br/>UNO -> " + players[turn] + " +2";
    for(var i = 0; i < 2; i++){
        draw = randomCard();
        players_cards[turn].push(draw);
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
        cl_dsp.innerHTML += play_menu;
    }
    else{
        cl_dsp.innerHTML += "[" + players[turn] + "'s cards]";
        cl_dsp.innerHTML += "<br/><br/>" + players[turn]+ "> ";
    }

    first_play = false;
}

function UNO_PRE(){
    if(players[0] == "UNO"){
        changeName("uno");
    }

    localStorage.setItem("player_name", players[0]);
    first_in = true;

    randomAI();

    current_card = randomCard();

    if(current_card == "+4" || current_card == "wild"){
        var color_index = Math.floor(Math.random() * colors.length);
        current_card += " -> " + colors[color_index];
    }

    randomPlayersCards();

    turn = Math.floor(Math.random() * max_player);

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

            if(players_cards[0].length == 0){
                win();
                return;
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
                    cl_dsp.innerHTML += "<br/><br/>|choose color| [1] green [2] red [3] yellow [4] blue" + play_menu;
                    state = "color_choose";
                    return;
                }
            }
            else if(current_card.includes("7")){
                swapHandsDSP();
                state = "swap_hands";
                return;
            }
            else if(current_card.includes("+2")){
                plusCard = true;
            }
            else if(current_card.includes("reverse")){
                reverse = true;
            }

            if(players_cards[0].length == 1 && !command.includes("uno")){
                applyUNO();
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
            if(players_cards[0][i] == "+4" || players_cards[0][i] == "wild"){
                if(players_cards[0].length == 1){
                    win();
                    return;
                }

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
                if(players_cards[0][i].includes("+2")){
                    plusCard = true;
                }

                current_card = players_cards[0][i];

                players_cards[0].splice(i, 1);

                if(current_card.includes("7")){
                    if(players_cards[0].length == 0){
                        win();
                        return;
                    }
                    var target = Math.floor(Math.random() * max_player);
                    while(target == turn){
                        target = Math.floor(Math.random() * max_player);
                    }
                    var handsTemp = players_cards[turn];

                    players_cards[turn] = players_cards[target];
                    players_cards[target] = handsTemp;

                    cl_dsp.innerHTML += "<br/><br/>" + players[turn] + " <-> " + players[target] + " swap hands";
                }
                
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
        exit();
    }
    else if(command == "f"){
        cl_dsp.innerHTML +="<br/>press \"F\" to pay respect.";
        if(reverse){
            for(var i = max_player-1; i > 0; i--){
                cl_dsp.innerHTML += "<br/><br/>" + players[i] + "> F";
            }
        }
        else{
            for(var i = 1; i < max_player; i++){
                cl_dsp.innerHTML += "<br/><br/>" + players[i] + "> F";
            }
        }
    }else if(command == "e"){
        cl_dsp.innerHTML +="<br/><br/><img class='E' src='E.jpg'/>";
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
            var uno = Math.floor(Math.random() * 2);

            if(uno == 0){
                uno = Math.floor(Math.random() * 2);
            }
            
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

                if(current_card.includes("7")){
                    var target = Math.floor(Math.random() * max_player);
                    while(target == turn){
                        target = Math.floor(Math.random() * max_player);
                    }
                    var handsTemp = players_cards[turn];

                    players_cards[turn] = players_cards[target];
                    players_cards[target] = handsTemp;

                    if(players_cards[turn].length == 1 && uno == 1){
                        cl_dsp.innerHTML += " uno";
                        cl_dsp.innerHTML += "<br/><br/>" + players[turn] + " <-> " + players[target] + " swap hands";
                    }
                    else if(players_cards[turn].length == 1){
                        cl_dsp.innerHTML += "<br/><br/>" + players[turn] + " <-> " + players[target] + " swap hands";
                        applyUNO();
                    }
                }
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

            if(players_cards[turn].length == 1 && uno == 1 && !current_card.includes("7")){
                cl_dsp.innerHTML += " uno";
            }
            else if(players_cards[turn].length == 1 && !current_card.includes("7")){
                cl_dsp.innerHTML += "<br/><br/>UNO -> " + players[turn] + " +2";
                for(var i = 0; i < 2; i++){
                    draw = randomCard();
                    players_cards[turn].push(draw);
                }
            }

            updateTurn();
            updateDSP();
        }
        else{
            cl_dsp.innerHTML += "draw";
            drawCard();
        }
    }
}