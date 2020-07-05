var cl_dsp = document.getElementById("cl-dsp");
var cl_in = document.getElementById("cl-in");
var player = document.getElementById("player");

var state = "menu";

cl_dsp_head = `
    UNO_command [version 1.0]<br/>
    by WarDimension
    <br/><br/>
`;

cl_dsp_menu = `
    [1] play
    [2] rules
    [3] home_page
`;

cl_dsp_rules = `
    rules.
    <br/><br/>
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
    player_name = p_name;
    player.innerHTML = player_name + ">";
    cl_in.style.textIndent = player.scrollWidth + 10;
}

cl_in.addEventListener("input", (e) => {
    cl_in.style.height = "24px";
    cl_in.style.height = cl_in.scrollHeight;
    if(state == "pre_play" && e.data != null){
        if(first_in){
            player_name = "";
            first_in = false;
        }
        player_name += e.data;
        changeName(player_name);
        cl_in.value = "";
    }
});

cl_in.addEventListener("keydown", (e) => {
    if(e.key == "Enter" && (cl_in.value != "" || state == "pre_play")){
        cl_dsp.innerHTML += `<br/><br/>${player_name}&gt; ` + cl_in.value;
        if(state == "menu"){
            if(cl_in.value == "1"){
                cl_dsp.innerHTML = cl_dsp_head + "your name?";
                state = "pre_play";
            }
            else if(cl_in.value == "2"){
                cl_dsp.innerHTML = cl_dsp_head + cl_dsp_rules + cl_dsp_menu;
            }
            else if(cl_in.value == "3"){
                window.open("https://wardimension.github.io","_blank");
                cl_dsp.innerHTML = cl_dsp_head + cl_dsp_menu;
                cl_in_reset = true;
            }
            else if(cl_in.value == "cls"){
                cl_dsp.innerHTML = cl_dsp_head + cl_dsp_menu;
            }
            else{
                cl_dsp.innerHTML += "<br/>command not found.";
            }
        }
        else if(state == "pre_play"){
            UNO_PRE();
        }
        else if(state == "play"){
            UNO();
        }
        cl_in.value = "";
    }
    else if(e.key == "Backspace" && state == "pre_play"){
        player_name = player_name.slice(0, -1);
        changeName(player_name);
        first_in = false;
    }
});

cl_in.addEventListener("keyup", (e) => {
    if(e.key == "Enter"){
        cl_in.value = "";
        cl_in.style.height = "24px";
    }
});