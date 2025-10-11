var mvp = document.getElementById("vp");

function screenScale() {
    if (screen.width < 900) {
        mvp.setAttribute("content", "width=900, user-scalable=no");
    } else if (screen.width > 1920) {
        mvp.setAttribute("content", "width=1920, user-scalable=no");
    } else {
        mvp.setAttribute("content", "width=device-width, initial-scale=1.0, user-scalable=no");
    }
}
screenScale();

window.addEventListener("resize", (e) => {
    screenScale();
});

const worker = new Worker("worker.js");

const rgbToHex = (r, g, b) => "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");

const upload = document.getElementById("upload");

let colorStats = {
    colorCounts: {},
    totalCount: 0
};

function sortColors() {
    worker.postMessage({ task: "SortColors", colorStats });
}

const palette = document.getElementById("palette-container");

const chartCanvas = document.getElementById("chart-canvas");
const offscreenCanvas = chartCanvas.transferControlToOffscreen();

worker.postMessage({ task: "InitCanvas", offscreenCanvas }, [offscreenCanvas]);

function drawPieChart() {
    worker.postMessage({ task: "DrawPieChart", colorStats });
}

const loading = document.getElementById("loading");

function resetStuff() {
    loading.style.opacity = 1;
    loading.style.pointerEvents = "auto";

    colorStats.colorCounts = {};
    colorStats.totalCount = 0;

    setPalette("0, 0, 0, 0");
}

upload.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;

    resetStuff();

    const img = new Image();
    img.onload = function () {
        const canvas = document.getElementById("img-canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const pixels = imageData.data;

        worker.postMessage({ task: "ProcessImage", colorStats, pixels });

        canvas.addEventListener("mousemove", (e) => {
            const rect = canvas.getBoundingClientRect();

            const scale = Math.min(rect.width / canvas.width, rect.height / canvas.height);

            const offsetX = (rect.width - canvas.width * scale) / 2;
            const offsetY = (rect.height - canvas.height * scale) / 2;

            let xCanvas = (e.clientX - rect.left - offsetX) / scale;
            let yCanvas = (e.clientY - rect.top - offsetY) / scale;

            xCanvas = Math.floor(xCanvas);
            yCanvas = Math.floor(yCanvas);

            const pixel = ctx.getImageData(xCanvas, yCanvas, 1, 1).data;
            const rgba = `${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3] / 255}`;
            setPalette(rgba);
        });

        canvas.addEventListener("mouseleave", () => {
            setPalette("0, 0, 0, 0");
        });
    }
    img.src = URL.createObjectURL(file);
});

worker.onmessage = function (message) {
    switch (message.data.task) {
        case "ProcessImage":
            colorStats = message.data.colorStats;
            sortColors();
            break;
        case "SortColors":
            colorStats.colorCounts = message.data.sorted;
            drawPieChart();
            break;
        case "DrawPieChart":
            loading.style.opacity = 0;
            loading.style.pointerEvents = "";
            break;
        case "GetMouseHoverColor":
            setPalette(message.data.rgba);
            break;
    }
}

chartCanvas.addEventListener("mousemove", (e) => {
    requestAnimationFrame(() => {
        const rect = chartCanvas.getBoundingClientRect();

        worker.postMessage({
            task: "GetMouseHoverColor",
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    });
});

function setPalette(color) {
    const rgba = color.split(",");
    rgba[3] = (rgba[3] * 1).toFixed(2);
    rgba[3] = rgba[3] % 1 === 0 ? (rgba[3] * 1).toFixed(0) : rgba[3];

    const hexColor = rgbToHex(rgba[0] * 1, rgba[1] * 1, rgba[2] * 1);

    palette.innerHTML = `
        <div class="palette-frame" style="border: solid 1px #bbb">
            <div class="palette" style="background: rgba(${color})"></div>
            <p>
                ${hexColor} (opacity: ${rgba[3]})<br>
                rgba(${rgba.join(", ")})
            </p>
        </div>
    `;
}
setPalette("0, 0, 0, 0");

chartCanvas.addEventListener("mouseleave", () => {
    setPalette("0, 0, 0, 0");
});

window.addEventListener("mouseout", (e) => {
    if (!e.relatedTarget) {
        setPalette("0, 0, 0, 0");
    }
});

window.addEventListener("click", (e) => {
    setTimeout(() => {
        navigator.clipboard.writeText(palette.innerText)
            .then(() => console.log("Copied:", palette.innerText));
    }, 30);
});