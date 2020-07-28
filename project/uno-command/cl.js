var cl = document.getElementById("cl");
var cl_dsp = document.getElementById("cl-dsp");
var cl_in = document.getElementById("cl-in");
var player = document.getElementById("player");

var state = "menu";

var commandHistory = [];
var commandHistoryIndex = 0;
var commandTemp = "";

function addHistory(command){
    if(command != commandHistory[commandHistory.length-1]){
        commandHistory.push(command);
    }
    commandHistoryIndex = commandHistory.length;
    commandTemp = "";
}

cl_dsp_head = `
    UNO_command [version 1.0]<br/>
    by WarDimension
`;

cl_dsp_menu = `
    <br/><br/>
    [1] play
    [2] rules
    [3] settings
    [4] home_page
`;

cl_dsp_rules = `
    <br/><br/>
    commands:
    <br/><br/>
    [anytime]<br/>
    <ul class="rules">
        <li>cls: clear screen.</li>
        <li>esc_key: exit to main menu.</li>
    </ul>
    <br/><br/>
    [play mode]<br/>
    <ul class="rules">
        <li>command format: [card_number] [color] uno.</li>
        <li>[card_number]: play card number [card_number] from your hand.</li>
        <li>[card_number1] + [card_number2] + ... : play 2 or more identical cards from your hand (combo).</li>
        <li>[color]: add the color for wild card. if not included, the game will ask you to choose color.</li>
        <li>uno: say uno.</li>
        <li>draw: draw card until you find playable card.</li>
        <li>auto: autoplay.</li>
        <li>esc/esc_key: exit to main menu.</li>
    </ul>
    <br/><br/>
    rules:<br/>
    <ul class="rules">
        <li>general: play the card with the same value/color with previous card.</li>
        <li>skip: skip the next player.</li>
        <li>reverse: reverses the direction of play.</li>
        <li>+2 card: the next player must draw 2 cards and lose a turn, or stack it.</li>
        <li>+4 card: change the color, the next player must draw 4 cards and lose a turn, or stack it.</li>
        <li>wild: change the color.</li>
        <li>challenge: if the player who played +4 card have the matching color with the previous card, this player must draw 4 cards, otherwise you will draw 2 more cards.</li>
        <li>stack: stack +2 with +2 and +4 with +4, player that can't add to the stack must draw the total. playing a combo will reset the total.</li>
        <li>7 card: swap hands with another player.</li>
        <li>0 card: everyone rotates hands in the direction of play.</li>
        <li>uno: say uno before playing your next to last card. if not, you must draw 2 cards</li>
    </ul>
`;

var cl_in_reset = false;
function clInReset(){
    if(cl_in_reset){
        cl_in.value = "";
        cl_in.style.height = "24px";
    }
}

var first_in = true;

function changeName(p_name){
    players[0] = p_name;
    player.innerHTML = players[0] + ">";
    cl_in.style.textIndent = player.scrollWidth + 10;
}

var ascendTemp;

var ascend = 0;

var ascendTimer;
function ascendTime(){
    cl_dsp.innerHTML = cl_dsp_head + "<br/><br/>ascending.";

    if(ascend == 0){
        cl_dsp.innerHTML += ".";
        ascend = 1;
    }
    else if(ascend == 1){
        cl_dsp.innerHTML += "..";
        ascend = 2;
    }
    else if(ascend == 2){
        ascend = 0;
    }
}

cl_in.addEventListener("input", (e) => {
    if(e.inputType != "insertLineBreak"){
        commandTemp = cl_in.value;
    }

    cl_in.style.height = "24px";
    cl_in.style.height = cl_in.scrollHeight;

    if(state == "pre_play" && e.data != null){
        if(first_in){
            players[0] = "";
            first_in = false;
        }
        players[0] += e.data;
        changeName(players[0]);
        cl_in.value = "";
    }
});

cl_in.addEventListener("keydown", (e) => {
    var command = cl_in.value.toLowerCase();
    if(e.key == "Enter" && (command != "" || state == "pre_play")){
        addHistory(cl_in.value);

        if(state != "ascend"){
            cl_dsp.innerHTML += `<br/><br/>${players[0]}> ` + cl_in.value;
        }

        if(state == "menu"){
            if(command == "1"){
                cl_dsp.innerHTML = cl_dsp_head + "<br/><br/>your name?<br/><br/>[enter] skip/continue [backspace] erase [esc] back";
                state = "pre_play";
            }
            else if(command == "2"){
                cl_dsp.innerHTML = cl_dsp_head + cl_dsp_rules + cl_dsp_menu;
            }
            else if(command == "3"){
                cl_dsp.innerHTML = cl_dsp_head + cl_dsp_settings;
                state = "settings";
            }
            else if(command == "4"){
                window.open("https://wardimension.github.io","_blank");
                cl_dsp.innerHTML = cl_dsp_head + cl_dsp_menu;
                cl_in_reset = true;
            }
            else if(command == "cls"){
                cl_dsp.innerHTML = cl_dsp_head + cl_dsp_menu;
            }
            else if(command == "ascend"){
                cl_dsp.innerHTML = cl_dsp_head + "<br/><br/>ascending.";
                ascendTimer = setInterval(ascendTime, 1000);
                ascendTemp = players[0];
                changeName("666");
                state = "ascend";
            }
            else{
                cl_dsp.innerHTML += "<br/>invalid command.";
            }
        }
        else if(state == "settings"){
            setSettings(command);
        }
        else if(state == "pre_play"){
            UNO_PRE();
        }
        else if(state == "play"){
            UNO(command);
        }
        else if(state == "color_choose"){
            colorChoose(command);
        }
        else if(state == "challenge"){
            challenge(command);
        }
        else if(state == "swap_hands"){
            swapHands(command);
        }
        else if(state == "win"){
            if(command == "esc"){
                exit();
            }
            else if(command == "play"){
                state = "pre_play";
                UNO_PRE();
            }
            else if(command == "cls"){
                cl_dsp.innerHTML = cl_dsp_head + "<br/><br/>|WINNER| " + winner + " |WINNER|<br/><br/>[play] play again [esc] exit";
            }
            else{
                cl_dsp.innerHTML += "<br/>invalid command.";
            }
        }
        else if(state == "ascend" && command == "1010011010"){
            clearInterval(ascendTimer);
            changeName(ascendTemp);
            ascend = 0;
            localStorage.setItem("ascend", "true");
            window.open("https://wardimension.github.io/666","_blank");
            cl_dsp.innerHTML = cl_dsp_head + cl_dsp_menu;
            cl_in_reset = true;
            state = "menu";
        }
        cl_in.value = "";
    }
    else if(e.key == "Backspace" && state == "pre_play"){
        players[0] = players[0].slice(0, -1);
        changeName(players[0]);
        first_in = false;
    }
    else if(e.key == "Escape"){
        if(state == "pre_play"){
            changeName(localStorage.getItem("player_name"));
            first_in = true;
        }
        else if(state == "ascend"){
            clearInterval(ascendTimer);
            changeName(ascendTemp);
            ascend = 0;
        }
        exit();
    }
});

cl_in.addEventListener("keyup", (e) => {
    if(e.key == "Enter"){
        cl_in.value = "";
        cl_in.style.height = "24px";
        if(state == "play"){
            UNO_AI();
        }
    }
    cl.scrollTo(0,cl.scrollHeight);
});

window.addEventListener("click", (e) => {
    cl_in.focus();
});

window.addEventListener("keydown", (e) => {
    cl_in.focus();

    if(e.key == "ArrowUp" && commandHistoryIndex != 0){
        commandHistoryIndex--;
        cl_in.value = commandHistory[commandHistoryIndex];
    }
    else if(e.key == "ArrowDown" && commandHistoryIndex != commandHistory.length){
        commandHistoryIndex++;
        if(commandHistoryIndex != commandHistory.length){
            cl_in.value = commandHistory[commandHistoryIndex];
        }
        else{
            cl_in.value = commandTemp;
        }
    }
});