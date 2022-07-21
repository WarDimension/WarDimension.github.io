var blog = document.getElementsByClassName("blog");

if(url()["rocksmith"]){
    blog[0].src = "https://wardimension-chart.blogspot.com/search/label/%7BArtist%7D WarDimension+Rocksmith 2014";
}
else if(url()["album"]){
    blog[0].src = `https://wardimension-chart.blogspot.com/search/label/%7BArtist%7D WarDimension+Album: ${url()["album"]}+Rocksmith 2014`;
}
else if(["experimental", "chart", "tab"].indexOf(url()["b"]) >= 0){
    blog[0].src = `https://wardimension-${url()["b"]}.blogspot.com/`;
    if(url()["p"]!=undefined&&url()["p"]!=""){
        blog[0].src += `${decodeURIComponent(url()["p"])}.html`;
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