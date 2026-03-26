const canvas = document.getElementById("canvas");
const downloadBtn = document.getElementById("downloadBtn");
const ctx = canvas.getContext("2d");

let img = null;
let cropX = 0, cropY = 0, cropWidth = 300, cropHeight = 300;

canvas.addEventListener("dragover", (e) => {
    e.preventDefault();
    
    canvas.style.border = "2px dashed skyblue";
});

canvas.addEventListener("dragleave", (e) => {
    e.preventDefault();
   canvas.style.border = "";
});

canvas.addEventListener("drop", (e) => {
    e.preventDefault();
   const file = e.dataTransfer.files[0];
   if (!file) return;

   const reader = new FileReader();
   reader.onload = (event) => {
    img = new Image();
    img.src = event.target.result;
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        drawCrop();
    }
   }
   reader.readAsDataURL(file);
});

function drawCrop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.fillRect(cropX, cropY, cropWidth, cropHeight);

}

function moveCrop() {

}

let isDragging = false;
canvas.addEventListener("mousedown", (e) => {
   isDragging = true;
});

canvas.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const rect = canvas.getBoundingClientRect();
    cropX = e.clientX - rect.left;
    cropY = e.clientY - rect.top;
    drawCrop();
});

canvas.addEventListener("mouseup", (e) => {
   isDragging = false;
});

function downloadImage() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 300;
    canvas.height = 300;
    const scaleX = img.width / canvas.width;
    const scaleY = img.height / canvas.height;
    ctx.drawImage(img, cropX * scaleX, cropY * scaleY, cropWidth * scaleX, cropHeight * scaleY, 0, 0, cropWidth, cropHeight);

    const link = document.createElement("a");
    link.download = "cropped image";
    link.href = canvas.toDataURL();
    link.click();
}

downloadBtn.onclick = () => {
    console.log("clicked");
    downloadImage();
}