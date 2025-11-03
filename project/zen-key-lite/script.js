const typingTarget = document.querySelector(".typing-target");
const text = typingTarget.innerText;

function update(input, e){
    for (let i = 0; i < text.length; i++){
        switch(input[i]){
            case text[i]:
                typingTarget.children[i].className = "correct";
                break;
            case undefined:
                typingTarget.children[i].className = "";
                break;
            default:
                typingTarget.children[i].className = "incorrect";
                break;
        }
    }
}