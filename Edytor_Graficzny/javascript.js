const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = new Image();
let fileName = "";


const downloadBtn = document.getElementById("download-btn");
const uploadFile = document.getElementById("upload-file");
const revertBtn = document.getElementById("revert-btn");

// Filtry tutaj
document.addEventListener("click", e => {
  if (e.target.classList.contains("filter-btn")) {
    if (e.target.classList.contains("brightness-add")) {
      Caman("#canvas", img, function() {
        this.brightness(5).render();
      });
    } else if (e.target.classList.contains("brightness-remove")) {
      Caman("#canvas", img, function() {
        this.brightness(-5).render();
      });
    } else if (e.target.classList.contains("contrast-add")) {
      Caman("#canvas", img, function() {
        this.contrast(5).render();
      });
    } else if (e.target.classList.contains("contrast-remove")) {
      Caman("#canvas", img, function() {
        this.contrast(-5).render();
      });
    } else if (e.target.classList.contains("saturation-add")) {
      Caman("#canvas", img, function() {
        this.saturation(5).render();
      });
    } else if (e.target.classList.contains("saturation-remove")) {
      Caman("#canvas", img, function() {
        this.saturation(-5).render();
      });
    } else if (e.target.classList.contains("vibrance-add")) {
      Caman("#canvas", img, function() {
        this.vibrance(5).render();
      });
    } else if (e.target.classList.contains("vibrance-remove")) {
      Caman("#canvas", img, function() {
        this.vibrance(-5).render();
      });
    }
  }
});


// Wysyłanie pliku
uploadFile.addEventListener("change", () => {
  const file = document.getElementById("upload-file").files[0];
  const reader = new FileReader();

  if (file) {
    fileName = file.name;
    reader.readAsDataURL(file);
  }

// Cofanie Wszystkich zmian
revertBtn.addEventListener("click", e => {
  Caman("#canvas", img, function() {
    this.revert();
  });
});


  // Canvas, dodanie do niego zdj
  reader.addEventListener(
    "load",
    () => {
      img = new Image();
      img.src = reader.result;
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        canvas.removeAttribute("data-caman-id");
      };
    },
    false
  );
});

// Pobieranie Stanu
downloadBtn.addEventListener("click", () => {
  const fileExtension = fileName.slice(-4);
  let newFilename;

  if (fileExtension === ".jpg" || fileExtension === ".png") {

    newFilename = fileName.substring(0, fileName.length - 4) + "-edited.jpg";
  }
  download(canvas, newFilename);
});

// Pobranie obrazka
function download(canvas, filename) {
  let e;
  const link = document.createElement("a");

  link.download = filename;
  link.href = canvas.toDataURL("image/jpeg", 0.8);
  e = new MouseEvent("click");
  link.dispatchEvent(e);
}

//Rysowanie po obrazku
let isDrawing;
let lastPoint;

canvas.onmousedown = function(e) {
  isDrawing = true;
  lastPoint = getMousePos(canvas,e);
};
let strokeSize = 1;
let strokeColor = "black";
canvas.onmousemove = function(e) {
  let pos = getMousePos(canvas,e);
  console.log(pos)
  if (!isDrawing) return;

  ctx.beginPath();

  ctx.lineWidth = strokeSize;
  ctx.strokeStyle = strokeColor;
  
  ctx.moveTo(lastPoint.x, lastPoint.y);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
    
  lastPoint = pos;
};

canvas.onmouseup = function() {
  isDrawing = false;
};

function  getMousePos(canvas, evt) {
  let rect = canvas.getBoundingClientRect(),
      scaleX = canvas.width / rect.width,    
      scaleY = canvas.height / rect.height;  

  return {
    x: (evt.clientX - rect.left) * scaleX,   
    y: (evt.clientY - rect.top) * scaleY    
  }
}
document.getElementById("paintSize").addEventListener("change",function(e){
  strokeSize = e.target.value;
})
document.getElementById("paintColor").addEventListener("change",function(e){
  strokeColor = e.target.value;
})