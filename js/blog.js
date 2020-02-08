function url(parameter){
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(parameter,key,value) {
        vars[key] = value;
    });
    return vars;
}

if(["experimental", "chart", "tab"].indexOf(url("b")["b"]) >= 0){
    var blog = document.getElementsByClassName("blog");
    blog[0].src = `https://wardimension-${url("b")["b"]}.blogspot.com/`;
    if(url("p")["p"]!=undefined&&url("p")["p"]!=""){
        blog[0].src += `${url("p")["p"]}.html`;
    }
}