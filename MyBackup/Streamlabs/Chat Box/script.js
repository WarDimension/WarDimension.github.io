// Please use event listeners to run functions.
document.addEventListener('onLoad', function(obj) {
	// obj will be empty for chat widget
	// this will fire only once when the widget loads
});

document.addEventListener('onEventReceived', function(obj) {
  	// obj will contain information about the event
    let msg = document.querySelectorAll(".message");

    if(msg[msg.length-1].innerText.replaceAll(" ", "") == ""){
        let emotes = msg[msg.length-1].querySelectorAll(".emote");
        emotes.forEach(emote => {
            let img = emote.firstChild;

            emote.style.backgroundImage = emote.style.backgroundImage.replace("1.0", "3.0").replace("1x", "3x");
            emote.style.display = "inline-block";

            img.src = img.src.replace("1.0", "3.0").replace("1x", "3x");
            img.setAttribute("fetchpriority", "");
            img.style.height = 0;
            img.style.transition = "height 0.3s cubic-bezier(.25,.8,.25,1.1)";

            emote.style.opacity = 0;
            emote.style.transition = "opacity 0.3s cubic-bezier(.25,.8,.25,1.1)";

            let message = emote.parentElement;

            message.style.height = 0;
            message.style.padding = 0;
            message.style.transition = "height 0.3s cubic-bezier(.25,.8,.25,1.1)";
            message.style.marginBottom = "30px";

            img.onload = function(){
                switch(emotes.length){
                    case 1:
                        img.style.height = "6em";
                        break;
                    case 2:
                        img.style.height = "3em";
                        break;
                    default:
                        img.style.height = "2em";
                        break;
                }
                emote.style.opacity = 1;

                message.style.height = "auto";
                message.style.padding = "15px 40px";
                message.style.paddingTop = "35px";
                message.style.marginBottom = 0;
            }
        })
    }

    let badges = document.querySelectorAll(".badges");
    let badgeImg = badges[badges.length-1].firstChild;
    console.log(badgeImg);
});