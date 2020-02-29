if(localStorage.getItem("ascend") != "true"){
    window.open("https://wardimension.github.io/access-denied","_top");
}
else{
    localStorage.setItem("ascend", "false");
}