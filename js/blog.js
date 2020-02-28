function url(){
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
        console.log(key);
    });
    return vars;
}

if(["experimental", "chart", "tab"].indexOf(url()["b"]) >= 0){
    var blog = document.getElementsByClassName("blog");
    blog[0].src = `https://wardimension-${url()["b"]}.blogspot.com/`;
    if(url()["p"]!=undefined&&url()["p"]!=""){
        blog[0].src += `${url()["p"]}.html`;
    }
}

window.addEventListener("message", function(e) {
    if (["https://wardimension-experimental.blogspot.com","https://wardimension-chart.blogspot.com","https://wardimension-tab.blogspot.com"].indexOf(e.origin) >= 0){
        const url = new URL(window.location);
        var b = e.data[0];
        var p = "";
        if(e.data[1] != undefined){
            p = `&p=${e.data[1]}`;
        }
        url.search = `?b=${b}${p}`;
        console.log(url.search);
        history.replaceState(null, document.title, url);
    }
});