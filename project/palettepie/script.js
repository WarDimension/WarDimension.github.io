const worker = new Worker("worker.js");

const upload = document.getElementById("upload");

let colorStats = {
    colorCounts: {},
    totalCount: 0
};

function sortColors() {
    worker.postMessage({task: "SortColors", colorStats: colorStats});
}

const chartCanvas = document.getElementById("chart-canvas");
const offscreenCanvas = chartCanvas.transferControlToOffscreen();

worker.postMessage({task: "InitCanvas", offscreenCanvas: offscreenCanvas}, [offscreenCanvas]);

function drawPieChart() {

    worker.postMessage({task: "DrawPieChart", colorStats: colorStats});
}

const loading = document.getElementById("loading");

upload.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;

    loading.style.opacity = 1;

    colorStats.colorCounts = {};
    colorStats.totalCount = 0;

    const img = new Image();
    img.onload = function () {
        const canvas = document.getElementById("img-canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const pixels = imageData.data;

        worker.postMessage({task: "ProcessImage", colorStats: colorStats, pixels: pixels});
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
            break;
    }
}