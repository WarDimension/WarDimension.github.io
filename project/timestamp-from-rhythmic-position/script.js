const template = document.querySelector("template");

let index = 0;
let targetBarID = "target-bar-0";

function addList(){
    const list = template.content.cloneNode(true);

    const targetBarRadio = list.querySelectorAll(".target-bar");

    targetBarRadio.forEach(element => {
        element.id = element.id + index;
    });

    index++;

    document.querySelector(".list-container").append(list);

    if(document.querySelectorAll(".list-wrapper").length == 1){
        document.querySelector(".remove-list").setAttribute("hidden", "");
    }
    else{
        document.querySelector(".remove-list").removeAttribute("hidden");
    }
}

addList();

document.querySelector("#target-bar-0").checked = true;

function removeList(removeButton){
    removeButton.parentElement.remove();

    if(targetBarID == removeButton.parentElement.querySelector(".target-bar").id){
        let newTargetBar = document.querySelector(".target-bar");
        newTargetBar.checked = true;
        targetBarID = newTargetBar.id;
    }

    if(document.querySelectorAll(".list-wrapper").length == 1){
        document.querySelector(".remove-list").setAttribute("hidden", "");
    }
}

function copyResult(){
    navigator.clipboard.writeText(result.value);
    result.blur();
}

const result = document.querySelector(".result");
const name = document.querySelector(".name");
const tags = document.querySelector(".tags");

function getTotalDuration(listWrapper){
    let totalDuration = 0;
    listWrapper.forEach(bar =>{
        const BPM = bar.querySelector(".BPM").value;
        const timeSignatureTOP = bar.querySelector(".time-signature-top").value;
        const timeSignatureBOTTOM = bar.querySelector(".time-signature-bottom").value;
        const numberOfBars = bar.querySelector(".number-of-bars").value;

        totalDuration += (60/BPM) * (4/timeSignatureBOTTOM) * timeSignatureTOP * numberOfBars;
    });

    return totalDuration;
}

function getRemainDuration(){
    let bar = document.querySelector("#" + targetBarID).parentElement.parentElement;

    const BPM = bar.querySelector(".BPM").value;
    const timeSignatureTOP = bar.querySelector(".time-signature-top").value;
    const timeSignatureBOTTOM = bar.querySelector(".time-signature-bottom").value;
    const noteValueBOTTOM = document.querySelector(".note-value-bottom").value;
    const noteNumber = document.querySelector(".note-number").value;

    return ((60/BPM) * (4/timeSignatureBOTTOM) * timeSignatureTOP) - ((60/BPM) * (4/noteValueBOTTOM) * (noteNumber - 1));
}

String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 1) {hours   = ""} else {hours = hours+":"}
  if (minutes < 1) {minutes = "0"}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+minutes+':'+seconds;
}

function updateResult(){
    const listWrapper = document.querySelectorAll(".list-wrapper");

    let totalDuration = getTotalDuration(listWrapper);
    let remainDuration = getRemainDuration();
    
    result.value = (totalDuration - remainDuration).toString().toHHMMSS();
}

updateResult();