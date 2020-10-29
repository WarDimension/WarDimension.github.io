if(url()["rocksmith"]){
    var blog = document.getElementsByClassName("blog");
    blog[0].src = "https://wardimension-chart.blogspot.com/search/label/Artist%3A%20WarDimension+Rocksmith%202014";
}
else if(["experimental", "chart", "tab"].indexOf(url()["b"]) >= 0){
    var blog = document.getElementsByClassName("blog");
    blog[0].src = `https://wardimension-${url()["b"]}.blogspot.com/`;
    if(url()["p"]!=undefined&&url()["p"]!=""){
        blog[0].src += `${url()["p"]}.html`;
    }
}

window.addEventListener("message", function(e) {
    if (["https://wardimension-experimental.blogspot.com","https://wardimension-chart.blogspot.com","https://wardimension-tab.blogspot.com"].indexOf(e.origin) >= 0){
        var b = e.data[0];
        var p = "";
        if(e.data[1] != undefined){
            p = `&p=${e.data[1]}`;
        }
        document.getElementsByClassName("blog")[0].style.height = e.data[2] + 200;
        setParams(`?b=${b}${p}`);
    }
});