var cl_dsp = document.getElementById("cl-dsp");
var cl_in = document.getElementById("cl-in");

var state = "menu";

cl_dsp_head = `
    UNO_command [version 1.0]<br/>
    by WarDimension<br/>
    <br/>
`;

cl_dsp_menu = `
    [1] play
    [2] rules
    [3] home_page
`;

cl_dsp_rules = `
    rules.
    <br/><br/>
    [1] back
`;

var cl_in_reset = false;
function clInReset(){
    if(cl_in_reset){
        cl_in.value = "";
        cl_in.style.height = "24px";
    }
}

cl_in.addEventListener("input", (e) => {
    console.log(cl.scrollWidth);
    cl_in.style.height = cl_in.scrollHeight;
});

cl_in.addEventListener("keypress", (e) => {
    if(e.key == "Enter"){
        cl_dsp.innerHTML += "<br/><br/>player_1&gt; " + cl_in.value;
        if(state == "menu"){
            if(cl_in.value == "1"){
                cl_dsp.innerHTML += "<br/>play.";
            }
            else if(cl_in.value == "2"){
                cl_dsp.innerHTML = cl_dsp_head + cl_dsp_rules;
                state = "rules";
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
        else if(state == "rules"){
            if(cl_in.value == "1"){
                cl_dsp.innerHTML = cl_dsp_head + cl_dsp_menu;
                state = "menu";
            }
            else if(cl_in.value == "cls"){
                cl_dsp.innerHTML = cl_dsp_head + cl_dsp_rules;
            }
            else{
                cl_dsp.innerHTML += "<br/>command not found.";
            }
        }
        cl_in.value = "";
    }
});

cl_in.addEventListener("keyup", (e) => {
    if(e.key == "Enter"){
        cl_in.value = "";
        cl_in.style.height = "24px";
    }
});