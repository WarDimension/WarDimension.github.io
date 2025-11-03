const textElement = document.querySelector(".text");

function rubyConverter(text) {
    text = text.replaceAll(
        /(\n|| )([^\[\]\n ]+)\[([^\[\]]+)\]/g,
        (match, prefix, base, ruby) =>
            (prefix === '\n' ? '<br>' : '') + `<ruby>${base}<rt>${ruby}</rt></ruby>`
    );

    return text.replaceAll("\n", "<br>");
}

const dropzone = document.querySelector(".dropzone");
const fileInput = document.querySelector(".fileInput");
const body = document.body;

function furiganaToggle() {
    body.className == "furigana-hidden" ? body.className = "" : body.className = "furigana-hidden";
}

dropzone.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
        handleFile(fileInput.files[0]);
        fileInput.value = "";
    }
});

// DRAG & DROP
window.addEventListener("dragover", e => {
    e.preventDefault();
    dropzone.classList.add("dragover");
});

window.addEventListener("dragleave", () => {
    dropzone.classList.remove("dragover");
});

window.addEventListener("drop", e => {
    e.preventDefault();
    dropzone.classList.remove("dragover");
    if (e.dataTransfer.files.length > 0) {
        handleFile(e.dataTransfer.files[0]);
    }
});

// FILE
function handleFile(file) {
    const reader = new FileReader();
    reader.onload = e => {
        textElement.innerHTML = rubyConverter(e.target.result);
    };
    reader.readAsText(file);
}