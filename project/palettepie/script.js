const worker = new Worker("worker.js");

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

    colorStats.colorCounts = {};
    colorStats.totalCount = 0;

    palette.innerHTML = "";
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
            palette.innerHTML += message.data.paletteContent;
            loading.style.opacity = 0;
            break;
        case "UpdatePalette":
            palette.innerHTML += message.data.paletteContent;
            break;
    }
}