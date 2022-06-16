if(localStorage.getItem("ascend") != "true" && localStorage.getItem("ascend1") != "true"){
    //window.open("https://wardimension.github.io/access-denied","_top");
}
else{
    localStorage.setItem("ascend", "false");
    localStorage.setItem("ascend1", "false");
}