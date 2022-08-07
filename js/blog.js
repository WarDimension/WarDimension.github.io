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

//TEST
const url1= new URL(window.location); url1.href =url1.href.replace(/\?b=|&p=/g,"/"); history.replaceState(null, document.title, url1);