var blog = document.getElementsByClassName("blog");

document.querySelector("html").style.scrollBehavior="auto";

if(["experimental", "chart", "tab"].indexOf(url()["b"]) >= 0){
    blog[0].src = `https://wardimension-${url()["b"]}.blogspot.com/`;
    if(url()["p"]!=undefined&&url()["p"]!=""){
        blog[0].src += `${decodeURIComponent(url()["p"])}.html`;
    }

    if(url()["search"]){
        let search = JSON.parse(decodeURI(url()["search"].replaceAll("%27", '"')));

        blog[0].src = `https://wardimension-${url()["b"]}.blogspot.com/search/label/${search.join("+")}`;
    }
}

var paramsTemp = "";

window.addEventListener("message", function(e) {
    if (["https://wardimension-experimental.blogspot.com","https://wardimension-chart.blogspot.com","https://wardimension-tab.blogspot.com"].indexOf(e.origin) >= 0){
        var b = e.data[0];
        var p = "";
        if(e.data[1] != undefined){
            p = `&p=${e.data[1]}`;
        }
        document.getElementsByClassName("blog")[0].style.height = e.data[2] + 200;
        setParams(`?b=${b}${p}`);
        
        if(paramsTemp != `?b=${b}${p}`){
            window.scrollTo(0, 0);
            paramsTemp = `?b=${b}${p}`;
        }
    }
});