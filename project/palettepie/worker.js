let canvas;
let paletteContent = "";

onmessage = function (message) {
    const colorStats = message.data.colorStats;

    switch (message.data.task) {
        case "InitCanvas":
            canvas = message.data.offscreenCanvas;
            break;
        case "ProcessImage":
            const pixels = message.data.pixels;

            for (let i = 0; i < pixels.length; i += 4) {
                const r = pixels[i];
                const g = pixels[i + 1];
                const b = pixels[i + 2];
                const a = pixels[i + 3] / 255;

                if (colorStats.colorCounts[`${r}, ${g}, ${b}, ${a}`] == undefined) {
                    colorStats.colorCounts[`${r}, ${g}, ${b}, ${a}`] = 1;
                }
                else {
                    colorStats.colorCounts[`${r}, ${g}, ${b}, ${a}`]++;
                }

                colorStats.totalCount++;
            }
            postMessage({ task: "ProcessImage", colorStats });
            break;
        case "SortColors":
            const sorted = Object.fromEntries(
                Object.entries(colorStats.colorCounts).sort((a, b) => {
                    const [rA, gA, bA, aA] = a[0].split(',').map(Number);
                    const [rB, gB, bB, aB] = b[0].split(',').map(Number);
                    const avgA = (rA + gA + bA) / 3;
                    const avgB = (rB + gB + bB) / 3;

                    return aA - aB || avgB - avgA;
                })
            );
            postMessage({ task: "SortColors", sorted });
            break;
        case "DrawPieChart":
            let startAngle = -Math.PI / 2;

            const ctx = canvas.getContext("2d");

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            paletteContent = "";

            Object.keys(colorStats.colorCounts).forEach((color, index) => {
                const angle = (colorStats.colorCounts[color] / colorStats.totalCount) * Math.PI * 2;

                ctx.beginPath();
                ctx.moveTo(canvas.width / 2, canvas.height / 2);
                ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, startAngle, startAngle + angle);
                ctx.closePath();

                ctx.fillStyle = `rgba(${color})`;
                ctx.fill();

                ctx.strokeStyle = ctx.fillStyle;
                ctx.stroke();

                startAngle += angle;

                const rgba = color.split(",");
                rgba[3] = (rgba[3] * 1).toFixed(2);
                rgba[3] = rgba[3] % 1 === 0 ? (rgba[3] * 1).toFixed(0) : rgba[3];

                const hexColor = rgbToHex(rgba[0] * 1, rgba[1] * 1, rgba[2] * 1);

                paletteContent += `
                    <div class="palette-frame" style="border: solid 1px #bbb">
                        <div class="palette" style="background: rgba(${color})">
                        </div>
                        <p>
                            ${hexColor} (opacity: ${rgba[3]})<br>
                            rgba(${rgba.join(", ")})
                        </p>
                    </div>
                `;

                if(index % 100 == 0 && index != 0){
                    postMessage({ task: "UpdatePalette", paletteContent });
                    paletteContent = "";
                }
            });
            postMessage({ task: "DrawPieChart", paletteContent });
            break;
    }
}

const rgbToHex = (r, g, b) => "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");