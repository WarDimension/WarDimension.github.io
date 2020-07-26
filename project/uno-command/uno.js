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
    for(var i = 1; i < max_players; i++){
        var ai_name = ai_names[Math.floor(Math.random() * ai_names.length)];
        while(players.includes(ai_name)){
            ai_name = ai_names[Math.floor(Math.random() * ai_names.length)];
        }
        players.push(ai_name);
    }
}

function randomPlayersCards(){
    for(var i = 0; i < max_players; i++){
        players_cards.push(random7Cards());
    }
}

var players = ["player_1"];
var players_cards = [];

if(localStorage.getItem("player_name") != null){
    changeName(localStorage.getItem("player_name"));
}

var ai_names = ["WarDimension", "プラン", players[0] + "'s Clone", "C:\\User\\" + players[0], "AI-chan", "I'm a human, I swear", "I'm fine", "AI FTW", "._.)", "UNO_BOT", "Markivider", "Javascript AI", "_anon", "_blank", "1010011010", "666", "EEE", "SLAP LIKE NOW", "アニメ", "weebs69", "Davie404", "Barbara", "UNO_Master", "Baby Yoda", "NO U", "I have +4", "Anonymous"];

var current_card = "";

var challengeCardTemp = "";

var turn = 0;
var turn_before = 0;
var turn_skip = 0;

var reverse = false;
var plusCard = false;
var resetPlus = false;
var first_play = true;

// SETTINGS
var max_players = 4;
var rotates_hands = true;
var swap_hands = true;
var challenge_set = true;
var stacking = true;
var background = "default";

if(localStorage.getItem("max_players") != null){
    max_players = localStorage.getItem("max_players");
}
if(localStorage.getItem("rotates_hands") != null){
    rotates_hands = localStorage.getItem("rotates_hands");
}
if(localStorage.getItem("swap_hands") != null){
    swap_hands = localStorage.getItem("swap_hands");
}
if(localStorage.getItem("challenge_set") != null){
    challenge_set = localStorage.getItem("challenge_set");
}
if(localStorage.getItem("stacking") != null){
    stacking = localStorage.getItem("stacking");
}
if(localStorage.getItem("background") != null){
    background = localStorage.getItem("background");
    document.body.style.background = background;
}

function setLocalSetting(){
    localStorage.setItem("max_players", max_players);
    localStorage.setItem("rotates_hands", rotates_hands);
    localStorage.setItem("swap_hands", swap_hands);
    localStorage.setItem("challenge_set", challenge_set);
    localStorage.setItem("stacking", stacking);
    localStorage.setItem("background", background);
}

var cl_dsp_settings = `
    <br/><br/>
    settings:<br/>
    [1] max_players = ${max_players} [2-${ai_names.length}]<br/>
    [2] rotates_hands = ${rotates_hands} [true, false]<br/>
    [3] swap_hands = ${swap_hands} [true, false]<br/>
    [4] challenge = ${challenge_set} [true, false]<br/>
    [5] stacking = ${stacking} [true, false]<br/>
    [6] background = ${background} [color, #color_code]
    <br/><br/>
    commands: [1-6] [value], [1-6] default, [var] = [value], [var] = default
    <br/><br/>
    [default] default settings [esc] exit
`;

function setSettings(command){
    if(/^(\w+ ?= ?#?\w+)|(\d+ #?\w+)$/.test(command) || command == "default"){
        var max_players_temp = max_players;
        var rotates_hands_temp = rotates_hands;
        var swap_hands_temp = swap_hands;
        var challenge_temp = challenge_set;
        var stacking_temp = stacking;
        var background_temp = background;

        if(command.includes("background") || /^6/.test(command)){
            document.body.style.background = command.match(/#?\w+$/);
            if(command.includes("default")){
                document.body.style.background = "#dddddd";
            }
            background = command.match(/#?\w+$/);
            cl_dsp.innerHTML += "<br/>set background to " + command.match(/#?\w+$/) + ".";
        }
        else if(!command.includes("background") && command.includes("#")){
            cl_dsp.innerHTML += "<br/>invalid command.";
        }
        else if((command.includes("max_players") || /^1/.test(command)) && command.match(/\b\d+$/) >= 2  && command.match(/\b\d+$/) <= ai_names.length){
            max_players = parseInt(command.match(/\b\d+$/));
            cl_dsp.innerHTML += "<br/>set max_players to " + max_players + ".";
        }
        else if((command.includes("rotates_hands") || /^2/.test(command)) && command.match(/(true|false)/)){
            rotates_hands = command.match(/(true|false)/)[0] == "true";
            cl_dsp.innerHTML += "<br/>set rotates_hands to " + rotates_hands + ".";
        }
        else if((command.includes("swap_hands") || /^3/.test(command)) && command.match(/(true|false)/)){
            swap_hands = command.match(/(true|false)/)[0] == "true";
            cl_dsp.innerHTML += "<br/>set swap_hands to " + swap_hands + ".";
        }
        else if((command.includes("challenge") || /^4/.test(command)) && command.match(/(true|false)/)){
            challenge_set = command.match(/(true|false)/)[0] == "true";
            cl_dsp.innerHTML += "<br/>set challenge to " + challenge_set + ".";
        }
        else if((command.includes("stacking") || /^5/.test(command)) && command.match(/(true|false)/)){
            stacking = command.match(/(true|false)/)[0] == "true";
            cl_dsp.innerHTML += "<br/>set stacking to " + stacking + ".";
        }
        else if(command.includes("default")){
            if(command == "default"){
                defaultSettings();
                cl_dsp.innerHTML += "<br/>set settings to default.";
            }
            else if(command.includes("max_players") || /^1/.test(command)){
                max_players = max_players_def;
                cl_dsp.innerHTML += "<br/>set max_players to default.";
            }
            else if(command.includes("rotates_hands") || /^2/.test(command)){
                rotates_hands = rotates_hands_def;
                cl_dsp.innerHTML += "<br/>set rotates_hands to default.";
            }
            else if(command.includes("swap_hands") || /^3/.test(command)){
                swap_hands = swap_hands_def;
                cl_dsp.innerHTML += "<br/>set swap_hands to default.";
            }
            else if(command.includes("challenge") || /^4/.test(command)){
                challenge_set = challenge_def;
                cl_dsp.innerHTML += "<br/>set challenge to default.";
            }
            else if(command.includes("stacking") || /^5/.test(command)){
                stacking = stacking_def;
                cl_dsp.innerHTML += "<br/>set stacking to default.";
            }
        }
        else{
            cl_dsp.innerHTML += "<br/>invalid command.";
        }

        cl_dsp_settings = `
            <br/><br/>
            settings:<br/>
            [1] max_players = ${max_players} [2-${ai_names.length}]<br/>
            [2] rotates_hands = ${rotates_hands} [true, false]<br/>
            [3] swap_hands = ${swap_hands} [true, false]<br/>
            [4] challenge = ${challenge_set} [true, false]<br/>
            [5] stacking = ${stacking} [true, false]<br/>
            [6] background = ${background} [color, #color_code]
            <br/><br/>
            commands: [1-6] [value], [1-6] default, [var] = [value], [var] = default
            <br/><br/>
            [default] default settings [esc] exit
        `;

        cl_dsp.innerHTML = cl_dsp.innerHTML.replace(`max_players = ${max_players_temp}`, `max_players = ${max_players}`);
        cl_dsp.innerHTML = cl_dsp.innerHTML.replace(`rotates_hands = ${rotates_hands_temp}`, `rotates_hands = ${rotates_hands}`);
        cl_dsp.innerHTML = cl_dsp.innerHTML.replace(`swap_hands = ${swap_hands_temp}`, `swap_hands = ${swap_hands}`);
        cl_dsp.innerHTML = cl_dsp.innerHTML.replace(`challenge = ${challenge_temp}`, `challenge = ${challenge_set}`);
        cl_dsp.innerHTML = cl_dsp.innerHTML.replace(`stacking = ${stacking_temp}`, `stacking = ${stacking}`);
        cl_dsp.innerHTML = cl_dsp.innerHTML.replace(`background = ${background_temp}`, `background = ${background}`);

        setLocalSetting();
    }
    else if(command == "esc"){
        exit();
    }
    else if(command == "cls"){
        cl_dsp.innerHTML = cl_dsp_head + cl_dsp_settings;
    }
    else{
        cl_dsp.innerHTML += "<br/>invalid command.";
    }
}

// DEFAULT
var max_players_def = 4;
var rotates_hands_def = true;
var swap_hands_def = true;
var challenge_def = true;
var stacking_def = true;

function defaultSettings(){
    max_players = max_players_def;
    rotates_hands = rotates_hands_def;
    swap_hands = swap_hands_def;
    challenge_set = challenge_def;
    stacking = stacking_def;
    background = "default";
    document.body.style.background = "#dddddd";
}
// SETTINGS

var winner = "";

function resetPlusCard(){
    plusCard = false;
    resetPlus = true;
}

function win(){
    state = "win";
    cl_dsp.innerHTML += "<br/><br/>|WINNER| " + players[turn] + " |WINNER|<br/><br/>[play] play again [esc] exit";
    if(winner == ""){
        winner = players[turn];
    }
    players = [players[0]];
    players_cards = [];
    turn = 0;
    reverse = false;
    plusCard = false;
    resetPlus = false;
    first_play = true;
}

function exit(){
    players = [players[0]];
    players_cards = [];
    turn = 0;
    reverse = false;
    plusCard = false;
    resetPlus = false;
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

            if(turn_skip > max_players-1){
                turn_skip -= max_players;
            }
            else if(turn_skip < 0){
                turn_skip += max_players;
            }
            
            turn++;
        }
    }
    else{
        turn--;
        if(current_card.includes("skip")){
            turn_skip = turn;

            if(turn_skip > max_players-1){
                turn_skip -= max_players;
            }
            else if(turn_skip < 0){
                turn_skip += max_players;
            }

            turn--;
        }
    }

    if(turn > max_players-1){
        turn -= max_players;
    }
    else if(turn < 0){
        turn += max_players;
    }
}

function cardChecker(card){
    var card_val_r = /((\+?\d+)|skip|reverse|wild)/g;
    var color_r = /(green|red|yellow|blue)/g;

    var c_card_val = current_card.match(card_val_r)[0];
    var c_color = current_card.match(color_r)[0];

    var card_val = card.match(card_val_r);
    var color = card.match(color_r);

    if(plusCard && card_val != c_card_val){
        return false;
    }
    else if(card_val == c_card_val || color == c_color || card_val == "wild" || card_val == "+4"){
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

function colorChoose(command){
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
        cl_dsp.innerHTML = cl_dsp_head + "<br/><br/>|choose color| [1] green [2] red [3] yellow [4] blue<br/><br/>[esc] exit";
    }
    else{
        cl_dsp.innerHTML += "<br/>invalid command.";
    }
}

function challengeDSP(){
    var hasCard = false;

    for(var i = 0; i < players_cards[turn].length; i++){
        if(players_cards[turn][i].includes("+4")){
            hasCard = true;
        }
    }

    cl_dsp.innerHTML += "<br/><br/>current_card: " + current_card + "<br/><br/>|challenge +4| [1] challenge [2] decline";

    if(hasCard && stacking){
        cl_dsp.innerHTML += " [3] play +4";
    }
    
    cl_dsp.innerHTML += "<br/><br/>[auto] autoplay [esc] exit";
}

function challenge(command){
    if(command == 1){
        var hasColor = false;
        var color_r = /(green|red|yellow|blue)/g;
        for(var i = 0; i < players_cards[turn_before].length; i++){
            if(players_cards[turn_before][i].match(color_r)[0] == challengeCardTemp.match(color_r)){
                hasColor = true;
            }
        }

        var mult = 1;
        if(/x\d+/g.test(current_card)){
            mult = current_card.match(/x\d+/g)[0];
            mult = mult.match(/\d+$/);
        }

        if(hasColor){
            cl_dsp.innerHTML += `<br/><br/>${players[0]} -> ${players[turn_before]} +4 win challenge`;

            for(var i = 0; i < 4; i++){
                draw = randomCard();
                players_cards[turn_before].push(draw);
            }
        }
        else{
            cl_dsp.innerHTML += `<br/><br/>${players[turn_before]} -> ${players[0]} +${4 * mult + 2} lose challenge`;

            for(var i = 0; i < 4 * mult + 2; i++){
                draw = randomCard();
                players_cards[0].push(draw);
            }
            updateTurn();
        }

        resetPlusCard();
        state = "play";
        updateDSP();
    }
    else if(command == 2){
        var mult = 1;
        if(/x\d+/g.test(current_card)){
            mult = current_card.match(/x\d+/g)[0];
            mult = mult.match(/\d+$/);
        }

        cl_dsp.innerHTML += `<br/><br/>${players[turn_before]} -> ${players[0]} +${4 * mult}`;

        for(var i = 0; i < 4 * mult; i++){
            draw = randomCard();
            players_cards[0].push(draw);
        }

        resetPlusCard();
        state = "play";
        updateTurn();
        updateDSP();
    }
    else if(command == 3){
        var hasCard = false;
    
        for(var i = 0; i < players_cards[0].length; i++){
            if(players_cards[0][i].includes("+4")){
                hasCard = true;
            }
        }

        if(hasCard && stacking){
            state = "play";
            resetPlusCard();
            updateDSP();
        }
    }
    else if(command == "auto"){
        var mult = 1;
        if(/x\d+/g.test(current_card)){
            mult = current_card.match(/x\d+/g)[0];
            mult = mult.match(/\d+$/);
        }

        autoChallenge(mult);
        state = "play";
        updateTurn();
        updateDSP();
    }
    else if(command == "esc"){
        exit();
    }
    else if(command == "cls"){
        cl_dsp.innerHTML = cl_dsp_head;
        challengeDSP();
    }
    else{
        cl_dsp.innerHTML += "<br/>invalid command.";
    }
}

function autoChallenge(mult){
    var challenge = Math.floor(Math.random() * 2);

    if(challenge == 1){
        challenge = Math.floor(Math.random() * 2);
    }

    if(turn == 0){
        cl_dsp.innerHTML += " -> " + (parseInt(challenge) + 1);
    }

    if(!challenge_set){
        cl_dsp.innerHTML += `<br/><br/>${players[turn_before]} -> ${players[turn]} +${4 * mult}`;

        for(var i = 0; i < 4 * mult; i++){
            draw = randomCard();
            players_cards[turn].push(draw);
        }
        updateTurn();
    }
    else{
        if(challenge == 1){
            cl_dsp.innerHTML += `<br/><br/>${players[turn_before]} -> ${players[turn]} +${4 * mult}`;
    
            for(var i = 0; i < 4 * mult; i++){
                draw = randomCard();
                players_cards[turn].push(draw);
            }
            updateTurn();
        }
        else{
            var hasColor = false;
            var color_r = /(green|red|yellow|blue)/g;
            for(var i = 0; i < players_cards[turn_before].length; i++){
                if(players_cards[turn_before][i] != "+4" && players_cards[turn_before][i] != "wild"){
                    if(players_cards[turn_before][i].match(color_r)[0] == challengeCardTemp.match(color_r)){
                        hasColor = true;
                    }
                }
            }
    
            if(hasColor){
                cl_dsp.innerHTML += `<br/><br/>${players[turn]} -> ${players[turn_before]} +4 win challenge`;
    
                for(var i = 0; i < 4; i++){
                    draw = randomCard();
                    players_cards[turn_before].push(draw);
                }
            }
            else{
                cl_dsp.innerHTML += `<br/><br/>${players[turn_before]} -> ${players[turn]} +${4 * mult + 2} lose challenge`;
    
                for(var i = 0; i < 4 * mult + 2; i++){
                    draw = randomCard();
                    players_cards[turn].push(draw);
                }
                updateTurn();
            }
        }
    }

    resetPlusCard();
}

function swapHandsDSP(){
    cl_dsp.innerHTML += "<br/><br/>|swap hands|";
    for(var i = 1; i < max_players; i++){
        cl_dsp.innerHTML += ` [${i}] ${players[i]} |${players_cards[i].length} card`;
        if(players_cards[i].length > 1){
            cl_dsp.innerHTML += "s";
        }
        cl_dsp.innerHTML += "|";
    }
    cl_dsp.innerHTML += "<br/><br/>[esc] exit";
}

function swapHands(command){
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

function plusMult(){
    if(challengeCardTemp.includes("+") && !resetPlus){
        var mult = 1;
        if(/x\d+/g.test(challengeCardTemp)){
            mult = challengeCardTemp.match(/x\d+/g)[0];
            mult = mult.match(/\d+$/)[0];
            current_card += " x" + (parseInt(mult) + 1);
        }
        else{
            current_card += " x2";
        }
    }
    else{
        resetPlus = false;
    }
}

function applyPlusCard(){
    if(plusCard && (current_card.includes("+2") || current_card.includes("+4"))){
        if(current_card.includes("+2")){
            var hasCard = false;

            for(var i = 0; i < players_cards[turn].length; i++){
                if(players_cards[turn][i].includes("+2")){
                    hasCard = true;
                }
            }

            if(!stacking){
                hasCard = false;
                resetPlusCard();
            }

            if(!hasCard){
                var mult = 1;
                if(/x\d+/g.test(current_card)){
                    mult = current_card.match(/x\d+/g)[0];
                    mult = mult.match(/\d+$/);
                }

                if(first_play){
                    cl_dsp.innerHTML += `<br/><br/>UNO -> ${players[turn]} +2`;
                }
                else{
                    cl_dsp.innerHTML += `<br/><br/>${players[turn_before]} -> ${players[turn]} +${2 * mult}`;
                }
    
                for(var i = 0; i < 2 * mult; i++){
                    draw = randomCard();
                    players_cards[turn].push(draw);
                }
                resetPlusCard();
                updateTurn();
            }
        }
        else if(current_card.includes("+4")){
            var hasCard = false;

            for(var i = 0; i < players_cards[turn].length; i++){
                if(players_cards[turn][i].includes("+4")){
                    hasCard = true;
                }
            }

            if(!stacking){
                hasCard = false;
                resetPlusCard();
            }
            
            var mult = 1;
            if(/x\d+/g.test(current_card)){
                mult = current_card.match(/x\d+/g)[0];
                mult = mult.match(/\d+$/);
            }

            if(first_play && !hasCard){
                cl_dsp.innerHTML += `<br/><br/>UNO -> ${players[turn]} +4`;

                for(var i = 0; i < 4; i++){
                    draw = randomCard();
                    players_cards[turn].push(draw);
                }
                resetPlusCard();
                updateTurn();
            }
            else if(turn == 0 && !first_play){
                if(challenge_set){
                    challengeDSP();
                    state = "challenge";
                    return;
                }
                else if(!hasCard){
                    cl_dsp.innerHTML += `<br/><br/>${players[turn_before]} -> ${players[0]} +${4 * mult}`;

                    for(var i = 0; i < 4 * mult; i++){
                        draw = randomCard();
                        players_cards[0].push(draw);
                    }
                    resetPlusCard();
                    updateTurn();
                }
            }
            else if(!hasCard){
                autoChallenge(mult);
            }
        }
    }
}

function apply0Card(){
    if(rotates_hands && current_card.includes("0") && state != "win"){
        if(first_play){
            cl_dsp.innerHTML += "<br/>";
        }

        cl_dsp.innerHTML += "<br/>everyone rotates hands.";
        
        if(reverse){
            var handsTemp = players_cards[0];

            for(var i = 1; i < max_players; i++){
                players_cards[i-1] = players_cards[i];
            }
            players_cards[max_players-1] = handsTemp;
        }
        else{
            var handsTemp = players_cards[max_players-1];
            
            for(var i = max_players-2; i >= 0; i--){
                players_cards[i+1] = players_cards[i];
            }
            players_cards[0] = handsTemp;
        }
    }
}

function applyUNO(){
    if(!current_card.includes("0")){
        cl_dsp.innerHTML += "<br/><br/>UNO -> " + players[turn] + " +2";
        for(var i = 0; i < 2; i++){
            draw = randomCard();
            players_cards[turn].push(draw);
        }
    }
}

function updateDSP(){
    if(state == "win"){
        return;
    }

    applyPlusCard();

    if(state == "challenge"){
        return;
    }

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
    
    cl_dsp.innerHTML += `<br/><br/>current_card: ${current_card}<br/><br/>|${players_cards[turn].length} card`;
    if(players_cards[turn].length > 1){
        cl_dsp.innerHTML += "s";
    }
    cl_dsp.innerHTML += "| ";

    if(turn == 0){
        for(var i = 0; i < players_cards[turn].length; i++){
            cl_dsp.innerHTML += `[${i+1}] ${players_cards[turn][i]} `;
        }
        cl_dsp.innerHTML += "<br/><br/>[auto] autoplay [draw] draw card(s) [esc] exit";
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

    ai_names[2] = players[0] + "'s Clone";
    ai_names[3] = "C:\\User\\" + players[0];

    randomAI();

    current_card = randomCard();

    if(current_card.includes("+")){
        plusCard = true;
    }

    if(current_card == "+4" || current_card == "wild"){
        var color_index = Math.floor(Math.random() * colors.length);
        current_card += " -> " + colors[color_index];
    }

    randomPlayersCards();

    turn = Math.floor(Math.random() * max_players);

    cl_dsp.innerHTML = cl_dsp_head;

    apply0Card();
    updateDSP();

    state = "play";
}

function UNO(command){
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
                cl_dsp.innerHTML += "<br/>you only have " + players_cards[0].length + " card";
                if(players_cards[0].length > 1){
                    cl_dsp.innerHTML += "s";
                }
                cl_dsp.innerHTML += ", stoopid!";
                return;
            }
            if(i > 0 && players_cards[0][card_index[i]] != players_cards[0][card_index[0]]){
                cl_dsp.innerHTML += "<br/>invalid combo.";
                return;
            }
        }

        if(cardChecker(players_cards[0][card_index[0]])){
            card_index.sort();

            challengeCardTemp = current_card;

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

                    if(card_index.length > 1){
                        resetPlusCard()
                    }

                    plusMult();
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
            else if(swap_hands && current_card.includes("7")){
                swapHandsDSP();
                state = "swap_hands";
                return;
            }
            else if(current_card.includes("+2")){
                plusCard = true;

                if(card_index.length > 1){
                    resetPlusCard()
                }

                plusMult();
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
        challengeCardTemp = current_card;

        for(var i = 0; i < players_cards[0].length; i++){
            if(players_cards[0][i] == "+4" || players_cards[0][i] == "wild"){
                cl_dsp.innerHTML += " -> " + (parseInt(i) + 1);

                if(players_cards[0].length == 1){
                    win();
                    return;
                }

                var color_index = Math.floor(Math.random() * colors.length);

                current_card = players_cards[0][i];

                if(players_cards[0][i] == "+4"){
                    plusCard = true;
                    plusMult();
                }

                current_card += " -> " + colors[color_index];

                cl_dsp.innerHTML += " " + colors[color_index];

                players_cards[0].splice(i, 1);
                
                updateTurn();
                updateDSP();
                return;
            }
            else if(cardChecker(players_cards[0][i])){
                cl_dsp.innerHTML += " -> " + (parseInt(i) + 1);

                current_card = players_cards[0][i];

                if(players_cards[0][i].includes("+2")){
                    plusCard = true;
                    plusMult();
                }

                players_cards[0].splice(i, 1);

                if(swap_hands && current_card.includes("7")){
                    if(players_cards[0].length == 0){
                        win();
                        return;
                    }
                    var target = Math.floor(Math.random() * max_players);
                    while(target == turn){
                        target = Math.floor(Math.random() * max_players);
                    }
                    var handsTemp = players_cards[turn];

                    players_cards[turn] = players_cards[target];
                    players_cards[target] = handsTemp;

                    cl_dsp.innerHTML += `<br/><br/>${players[turn]} <-> ${players[target]} swap hands`;
                }
                
                updateTurn();
                updateDSP();
                return;
            }
        }

        cl_dsp.innerHTML += " -> draw";
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
            for(var i = max_players-1; i > 0; i--){
                cl_dsp.innerHTML += "<br/><br/>" + players[i] + "> F";
            }
        }
        else{
            for(var i = 1; i < max_players; i++){
                cl_dsp.innerHTML += "<br/><br/>" + players[i] + "> F";
            }
        }
    }
    else if(command == "e"){
        cl_dsp.innerHTML +="<br/><br/><img class='E' src='E.jpg'/>";
    }
    else if(command == "anonymous" || command == "anon"){
        cl_dsp.innerHTML += `<br/><br/>Anonymous> <span class='darker'>&lt;</span><span class='key'>script</span><span class='darker'>&gt;</span><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<span class='var'>console</span>.<span class='mthd'>log</span>(<span class='str'>"We are Anonymous. We are Legion. We do not forgive. We do not forget. Expect us."</span>);<br/>
            <span class='darker'>&lt;/</span><span class='key'>script</span><span class='darker'>&gt;</span>
        `;
        console.log("We are Anonymous. We are Legion. We do not forgive. We do not forget. Expect us.");
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

        if(players[turn] == "Anonymous"){
            var hacks = ["Anonymous: We are Anonymous.", "Anonymous: We are Legion.", "Anonymous: We do not forgive.", "Anonymous: We do not forget.", "Anonymous: Expect us."];
            var hack = Math.floor(Math.random() * hacks.length);
            console.log(hacks[hack]);
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

            challengeCardTemp = current_card;
            
            if(!plusCard && (players_cards[turn][play] == "+4" || players_cards[turn][play] == "wild")){
                var color_index = Math.floor(Math.random() * colors.length);

                cl_dsp.innerHTML += play + 1 + " " + colors[color_index];

                current_card = players_cards[turn][play];

                if(players_cards[turn][play] == "+4"){
                    plusCard = true;
                    plusMult();
                }

                current_card += " -> " + colors[color_index];

                players_cards[turn].splice(play, 1);
            }
            else if(hasNum && !plusCard){
                while(!cardChecker(players_cards[turn][play]) || players_cards[turn][play] == "+4" || players_cards[turn][play] == "wild"){
                    play = Math.floor(Math.random() * players_cards[turn].length);
                }

                current_card = players_cards[turn][play];
                var card_index = [];

                if(players_cards[turn][play].includes("+2")){
                    plusCard = true;

                    if(card_index.length > 1){
                        resetPlusCard()
                    }
                
                    plusMult();
                }

                for(var i = players_cards[turn].length - 1; i >= 0; i--){
                    if(players_cards[turn][i] == current_card){
                        players_cards[turn].splice(i, 1);
                        card_index.push(i+1);
                    }
                }

                card_index = card_index.sort();
                cl_dsp.innerHTML += card_index.join(" + ");


                if(swap_hands && current_card.includes("7")){
                    if(players_cards[turn].length == 0){
                        win();
                        return;
                    }

                    var target = Math.floor(Math.random() * max_players);
                    while(target == turn){
                        target = Math.floor(Math.random() * max_players);
                    }
                    var handsTemp = players_cards[turn];

                    players_cards[turn] = players_cards[target];
                    players_cards[target] = handsTemp;

                    if(players_cards[turn].length == 1 && uno == 1){
                        cl_dsp.innerHTML += " uno";
                        cl_dsp.innerHTML += `<br/><br/>${players[turn]} <-> ${players[target]} swap hands`;
                    }
                    else if(players_cards[turn].length == 1){
                        cl_dsp.innerHTML += `<br/><br/>${players[turn]} <-> ${players[target]} swap hands`;
                        applyUNO();
                    }else{
                        cl_dsp.innerHTML += `<br/><br/>${players[turn]} <-> ${players[target]} swap hands`;
                    }
                }
            }
            else{
                while(!cardChecker(players_cards[turn][play])){
                    play = Math.floor(Math.random() * players_cards[turn].length);
                }

                var color_index = Math.floor(Math.random() * colors.length);

                cl_dsp.innerHTML += play + 1;

                if(players_cards[turn][play] == "+4" || players_cards[turn][play] == "wild"){
                    cl_dsp.innerHTML += " " + colors[color_index];
                }

                current_card = players_cards[turn][play];

                if(players_cards[turn][play] == "+4" || players_cards[turn][play].includes("+2")){
                    plusCard = true;
                    plusMult();
                }

                if(players_cards[turn][play] == "+4" || players_cards[turn][play] == "wild"){
                    current_card += " -> " + colors[color_index];
                }

                players_cards[turn].splice(play, 1);
            }

            if(current_card.includes("reverse")){
                reverse = true;
            }

            if(players_cards[turn].length == 1 && uno == 1 && !current_card.includes("7")){
                cl_dsp.innerHTML += " uno";
            }
            else if(players_cards[turn].length == 1 && !current_card.includes("7")){
                applyUNO();
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