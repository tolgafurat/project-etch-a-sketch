const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;
let currentColor = 'black';

function setCurrentMode(newMode) {
  activateBtn(newMode);
  currentMode = newMode;
}

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentSize(newSize) {
  currentSize = newSize;
}

const colorPicker = document.getElementById('colorPicker');
const colorBtn = document.getElementById('classicBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const sizeValue = document.getElementById('canvasSize');
const sizePicker = document.getElementById('sizePicker');
const container = document.getElementById('container');

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => reloadContainer();
sizePicker.onmousemove = (e) => updateSizeValue(e.target.value);
sizePicker.onchange = (e) => changeSize(e.target.value);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);


function changeSize(value) {
  setCurrentSize(value);
  updateSizeValue(value);
  reloadContainer();
}

function updateSizeValue(value) {
  sizeValue.innerHTML = `${value} x ${value}`;
}

function reloadContainer() {
  clearContainer();
  setupContainer(currentSize);
}

function clearContainer() {
  container.innerHTML = '';
}

function setupContainer(size) {
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const element = document.createElement('div');
    element.className = 'container-element';
    element.addEventListener('mouseover', changeColor);
    element.addEventListener('mousedown', changeColor);
    container.appendChild(element);
  }
}

function changeColor(color) {
  if (color.type === 'mouseover' && !mouseDown) return;
  if (currentMode === 'color') {
    color.target.style.backgroundColor = currentColor;
  } else if (currentMode === 'rainbow') {
    const R = Math.floor(Math.random() * 256);
    const G = Math.floor(Math.random() * 256);
    const B = Math.floor(Math.random() * 256);
    color.target.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
  } else if (currentMode === 'eraser') {
    color.target.style.backgroundColor = 'rgb(255, 255, 255)';
  }
}

function activateBtn(newMode) {
  if (currentMode === 'color') {
    colorBtn.classList.remove('active');
  } else if (currentMode === 'rainbow') {
    rainbowBtn.classList.remove('active');
  } else if (currentMode === 'eraser') {
    eraserBtn.classList.remove('active');
  }

  if (newMode === 'color') {
    colorBtn.classList.add('active');
  } else if (newMode === 'rainbow') {
    rainbowBtn.classList.add('active');
  } else if (newMode === 'eraser') {
    eraserBtn.classList.add('active');
  }
}

window.onload = () => {
  setupContainer(DEFAULT_SIZE);
  activateBtn(DEFAULT_MODE);
}