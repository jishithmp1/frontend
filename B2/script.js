const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const colorPreview = document.getElementById("colorPreview");
const copBtn = document.getElementById("copyToClipboard");

let img = null;

canvas.addEventListener("dragover", (e)=> {
    e.preventDefault();
    canvas.style.border = "2px dashed skyblue";
})

canvas.addEventListener("dragleave", (e)=> {
    e.preventDefault();
    canvas.style.border = "";
})

canvas.addEventListener("drop", (e)=> {
    e.preventDefault();
   const file = e.dataTransfer.files[0];
   if (!file) return;

   const reader = new FileReader();
   reader.onload = (event) => {
    img = new Image();
    img.src = event.target.result;

    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
   }
   reader.readAsDataURL(file);
})

canvas.addEventListener("mousedown", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left).toFixed(0);
    const y = (e.clientY - rect.top).toFixed(0);
    const imgData = ctx.getImageData(x, y, 1, 1);
    const r = imgData.data[0];
    const g = imgData.data[1];
    const b = imgData.data[2];
    const hex = convertToHex(r, g, b);
    colorPreview.textContent = hex;
})

function convertToHex(r, g, b) {
    console.log(typeof r, g, b);
    
    return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
}

copBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(colorPreview.textContent)
    .then(console.log("copied to clipboard"))
    .catch(e => console.error("failed to copy to clipboard", e));
})