function replace(rex,str){
    var result;
    str.replace(rex, function(m,res){
        result = res;
    });
    return result;
}

function getPost(str){
    return replace(/\.com\/(.+)\./,str);
}

function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

if(!inIframe()){
    var p = "";
    if(getPost(url.toString())[1] != undefined){
        const url = new URL(window.location);
        p += `?p=getPost(url.toString())`;
    }
    window.location.replace(`https://wardimension.github.io/collections/waifu-list${p}`);
}