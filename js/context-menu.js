document.querySelector(".context-menu").innerHTML = `
    <style>
        .cm{
            background: white;
            color: black;
            border: lightgray solid 1px;
            padding: 3px;
            box-shadow: 3px 3px 3px grey;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            display: none;
            transition: none;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
        }
        .cm-list{
            padding: 5px 5px;
            cursor: pointer;
            font-size: 12px;
            display:inline-block;
        }
        .cm-div{
            background: lightgrey;
            height: 1px;
            margin-top: 3px;
            margin-bottom: 3px;
        }
        .cm-list:hover{
            background: lightgray;
        }
    </style>
    <div class="cm">
        <div class="cm-list" id="0">0</div>
        <div class="cm-list" id="1">0</div>
        <div class="cm-list" id="2">0</div>
        <div class="cm-list" id="3">0</div>
        <div class="cm-list" id="4">0</div>
        <div class="cm-list" id="5">0</div>
        <div class="cm-list" id="6">0</div>
        <div class="cm-list" id="7">0</div>
        <div class="cm-list" id="8">0</div>
        <div class="cm-list" id="9">0</div>
    </div>
`;

const cm = document.querySelector(".cm");

function showContextMenu(show = true){
    cm.style.display = show ? "block" : "none";
}

window.addEventListener("contextmenu", (e) => {
    var target = e.target;
    var className = target.className;
    if(className == "wd-logo"){
        e.preventDefault();
        showContextMenu();
        cm.style.top = e.y + cm.offsetHeight > window.innerHeight ? window.innerHeight - cm.offsetHeight : e.y;
        cm.style.left = e.x + cm.offsetWidth > window.innerWidth ? window.innerWidth - cm.offsetWidth : e.x;
    }
    else if(className == "cm"){
        e.preventDefault();
        cmAction(e);
    }
    else{
        showContextMenu(false);
    }
});

function isEqual(a,b){
    if(a.length!=b.length){
        return false;
    }
    else{
        for(var i=0;i<a.length;i++){
            if(a[i]!=b[i]){
                return false;
            }
        }
        return true;
    } 
}

var ascend = ["0","0","0","0","0","0","0","0","0","0"];

window.addEventListener("click", (e) => {
    cmAction(e);
});

function cmAction(e){
    var target = e.target;
    var className = target.className;
    if(className != "cm" && className != "cm-list"){
        showContextMenu(false);
    }
    else if(className == "cm-list"){
        const cmList = document.getElementsByClassName("cm-list");
        cmList[target.id].innerHTML == "0" ? cmList[target.id].innerHTML = "1" : cmList[target.id].innerHTML = "0";
        ascend[target.id] = cmList[target.id].innerHTML;
        
        //hey... you found the code, it's cheating tho, but good job... here's a very secret video for you: https://youtube.com/clip/UgkxcBtAVHSNYBsZXEd7eKj9WL9lImAzK_Ji
        if(isEqual(ascend,["1","0","1","0","0","1","1","0","1","0"])){
            localStorage.setItem("ascend", "true");
            window.open("https://wardimension.github.io/666","_top");
        }
    }
}