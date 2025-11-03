const textElement = document.querySelector(".text");

function rubyConverter(text){
    return text.replaceAll(
        /(\n|| )([^\[\]\n ]+)\[([^\[\]]+)\]/g,
        (match, prefix, base, ruby) =>
        (prefix === '\n' ? '<br>' : '') + `<ruby>${base}<rt>${ruby}</rt></ruby>`
    );
}

const dropzone = document.querySelector(".dropzone");
const fileInput = document.querySelector(".fileInput");

dropzone.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    handleFile(fileInput.files[0]);
  }
});

// DRAG & DROP
dropzone.addEventListener("dragover", e => {
  e.preventDefault();
  dropzone.classList.add("dragover");
});

dropzone.addEventListener("dragleave", () => {
  dropzone.classList.remove("dragover");
});

dropzone.addEventListener("drop", e => {
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