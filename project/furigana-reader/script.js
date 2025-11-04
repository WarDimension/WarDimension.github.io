function screenScale() {
    const mvp = document.querySelector("meta[name='viewport']");
    const container = document.querySelector(".container");

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    let screenWidth = screen.width;
    let screenHeight = screen.height;
    const offset = 40;

    let newvpWidth = screenWidth;

    if (newvpWidth > 1920) {
        const scale = 1920 / screenWidth;
        newvpWidth = 1920;
        screenWidth *= scale;
        screenHeight *= scale;
    }

    newvpWidth = Math.max(newvpWidth, (containerHeight / screenHeight) * screenWidth);

    newvpWidth = Math.max(newvpWidth, containerWidth);

    if (screenWidth - containerWidth < 50) newvpWidth += offset;
    if (screenHeight - containerHeight < 50) newvpWidth += (containerHeight / screenHeight) * offset;

    mvp.setAttribute("content", `width=${newvpWidth}, user-scalable=no`);
}
screenScale();

window.addEventListener("resize", screenScale);

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
        screenScale();
    };
    reader.readAsText(file);
}

let targetScroll = 0;
let currentScroll = 0;
let isTicking = false;

function animateScroll() {
    const ease = 0.25; // adjust 0.1–0.3 for smoothness vs. speed
    currentScroll += (targetScroll - currentScroll) * ease;
    textElement.scrollTop = currentScroll;
    if (Math.abs(targetScroll - currentScroll) > 0.1) {
        requestAnimationFrame(animateScroll);
    } else {
        isTicking = false;
    }
}

window.addEventListener('wheel', (e) => {
    e.preventDefault();
    targetScroll += e.deltaY;
    targetScroll = Math.max(0, Math.min(
        targetScroll,
        textElement.scrollHeight - textElement.clientHeight
    ));
    if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(animateScroll);
    }
}, { passive: false });

let velocity = 0;

let touchStartY = 0;
let lastMoveTime = 0;
let isTouching = false;

function animateScroll() {
    currentScroll += (targetScroll - currentScroll) * 0.16;
    textElement.scrollTop = currentScroll;

    if (Math.abs(targetScroll - currentScroll) > 0.25 || Math.abs(velocity) > 0.02) {
        requestAnimationFrame(animateScroll);
    } else {
        isTicking = false;
    }
}

window.addEventListener('touchstart', (e) => {
    if (!e.touches[0]) return;
    isTouching = true;
    touchStartY = e.touches[0].clientY;
    lastMoveTime = performance.now();
    velocity = 0;
}, { passive: true });

window.addEventListener('touchmove', (e) => {
    if (!e.touches[0]) return;
    e.preventDefault();

    const currentY = e.touches[0].clientY;
    const now = performance.now();
    const deltaY = touchStartY - currentY;
    const dt = Math.max(now - lastMoveTime, 1);

    velocity = deltaY / dt;
    targetScroll += deltaY;
    targetScroll = Math.max(0, Math.min(targetScroll, textElement.scrollHeight - textElement.clientHeight));

    touchStartY = currentY;
    lastMoveTime = now;

    if (!isTicking) requestAnimationFrame(animateScroll);
}, { passive: false });

window.addEventListener('touchend', () => {
    isTouching = false;

    function momentum() {
        targetScroll += velocity * 16;
        targetScroll = Math.max(0, Math.min(targetScroll, textElement.scrollHeight - textElement.clientHeight));
        velocity *= 0.94; // friction

        if (Math.abs(velocity) > 0.02) {
            if (!isTicking) requestAnimationFrame(animateScroll);
            requestAnimationFrame(momentum);
        }
    }

    requestAnimationFrame(momentum);
}, { passive: true });