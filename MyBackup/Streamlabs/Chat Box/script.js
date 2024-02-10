// Please use event listeners to run functions.
document.addEventListener('onLoad', function(obj) {
	// obj will be empty for chat widget
	// this will fire only once when the widget loads
});

document.addEventListener('onEventReceived', function(obj) {
  	// obj will contain information about the event
    let msg = document.querySelectorAll(".message");
        console.log(msg[msg.length-1].innerText);
    if(msg[msg.length-1].innerText.replaceAll(" ", "") == ""){
        let emotes = msg[msg.length-1].querySelectorAll(".emote");
        emotes.forEach(emote => {
            emote.style.backgroundImage = emote.style.backgroundImage.replace("1.0", "3.0").replace("1x", "3x");
            emote.style.display = "inline-block";

            let img = emote.firstChild;

            img.src = img.src.replace("1.0", "3.0").replace("1x", "3x");

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
        })
    }
});