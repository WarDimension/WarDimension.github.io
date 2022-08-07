var blog = document.getElementsByClassName("blog");

if(url()["rocksmith"]){
    blog[0].src = "https://wardimension-chart.blogspot.com/search/label/%5BArtist%5D WarDimension+(Game) Rocksmith 2014";
}
else if(url()["album"]){
    blog[0].src = `https://wardimension-chart.blogspot.com/search/label/%5BArtist%5D WarDimension+%7BAlbum%7D ${url()["album"]}+(Game) Rocksmith 2014`;
}
else if(["experimental", "chart", "tab"].indexOf(url()["b"]) >= 0){
    blog[0].src = `https://wardimension-${url()["b"]}.blogspot.com/`;
    if(url()["p"]!=undefined&&url()["p"]!=""){
        blog[0].src += `${decodeURIComponent(url()["p"])}.html`;
    }

    replaceURL();
}

window.addEventListener("message", function(e) {
    if (["https://wardimension-experimental.blogspot.com","https://wardimension-chart.blogspot.com","https://wardimension-tab.blogspot.com"].indexOf(e.origin) >= 0){
        var b = !window.location.href.includes(e.data[0]) ? "?b=" + e.data[0]: "";
        var p = "";
        if(e.data[1] != undefined && !window.location.href.includes(e.data[1])){
            p = `&p=${e.data[1]}`;
        }//NOT CONSISTENT, LOL - JUST FOR TEST
        document.getElementsByClassName("blog")[0].style.height = e.data[2] + 200;
        setParams(`${b}${p}`);
    }
});

//TEST
(function replaceURL(){
    const url= new URL(window.location);
    url.href =url.href.replace(/\?b=|&p=/g,"/");
    history.replaceState(null, document.title, url);
}());