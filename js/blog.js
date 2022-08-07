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
    cleanURL();
}

window.addEventListener("message", function(e) {
    if (["https://wardimension-experimental.blogspot.com","https://wardimension-chart.blogspot.com","https://wardimension-tab.blogspot.com"].indexOf(e.origin) >= 0){

        const url = new URL("https://wardimension.github.io/blog/");

        url.href += "/" + e.data[0];
        url.href += e.data[1] != undefined ? "/" + e.data[1] : "";
        replaceHistory(url);
        
        document.getElementsByClassName("blog")[0].style.height = e.data[2] + 200;
    }
});

function getBlog(regex,url){
    url = url.toString();
    var result = {};
    url.replace(regex, function(match,subBlog,post){
        result.subBlog = subBlog;
        result.post = post;
    });
    return result;
}

function cleanURL(){
    const url= new URL(window.location);
    url.href = url.href.replace(/\?|&/g, "").replace(/b=|p=/g,"/");
    replaceHistory(url);
}

function replaceHistory(newURL){
    history.replaceState(null, document.title, newURL);
}