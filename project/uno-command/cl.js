var cl = document.getElementById("cl");
var cl_dsp = document.getElementById("cl-dsp");
var cl_in = document.getElementById("cl-in");
var player = document.getElementById("player");

var state = "menu";

cl_dsp_head = `
    UNO_command [version 1.0]<br/>
    by WarDimension
`;

cl_dsp_menu = `
    <br/><br/>
    [1] play
    [2] rules
    [3] home_page
`;

cl_dsp_rules = `
    <br/><br/>
    rules.
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

cl_in.addEventListener("input", (e) => {
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
        cl_dsp.innerHTML += `<br/><br/>${players[0]}> ` + cl_in.value;
        if(state == "menu"){
            if(command == "1"){
                cl_dsp.innerHTML = cl_dsp_head + "<br/><br/>your name?<br/><br/>[enter] skip/continue [esc] back";
                state = "pre_play";
            }
            else if(command == "2"){
                cl_dsp.innerHTML = cl_dsp_head + cl_dsp_rules + cl_dsp_menu;
            }
            else if(command == "3"){
                window.open("https://wardimension.github.io","_blank");
                cl_dsp.innerHTML = cl_dsp_head + cl_dsp_menu;
                cl_in_reset = true;
            }
            else if(command == "cls"){
                cl_dsp.innerHTML = cl_dsp_head + cl_dsp_menu;
            }
            else{
                cl_dsp.innerHTML += "<br/>invalid command.";
            }
        }
        else if(state == "pre_play"){
            UNO_PRE();
        }
        else if(state == "play"){
            UNO();
        }
        else if(state == "color_choose"){
            colorChoose();
        }
        else if(state == "win"){
            if(command == "esc"){
                players = [players[0]];
                players_cards = [];
                turn = 0;
                reverse = false;
                plusCard = true;
                first_play = true;
                cl_dsp.innerHTML = cl_dsp_head + cl_dsp_menu;
                state = "menu";
            }
            else if(command == "play"){
                players = [players[0]];
                players_cards = [];
                turn = 0;
                reverse = false;
                plusCard = true;
                first_play = true;
                state = "pre_play";
                UNO_PRE();
            }
            else if(command == "cls"){
                cl_dsp.innerHTML = cl_dsp_head + "<br/><br/>|WINNER| " + winner + " |WINNER|";
            }
            else{
                cl_dsp.innerHTML += "<br/>invalid command.";
            }
        }
        cl_in.value = "";
    }
    else if(e.key == "Backspace" && state == "pre_play"){
        players[0] = players[0].slice(0, -1);
        changeName(players[0]);
        first_in = false;
    }
    else if(e.key == "Escape" && state != "menu"){
        cl_dsp.innerHTML = cl_dsp_head + cl_dsp_menu;
        if(state == "play"){
            players = [players[0]];
            players_cards = [];
        }
        else if(state == "pre_play"){
            changeName(localStorage.getItem("player_name"));
        }
        state = "menu";
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
});