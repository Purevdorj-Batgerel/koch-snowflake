import { flakeHeight, flakeWidth, smallFlakeHeight } from "./global";
import { computePoints } from "./kochSnowflake";
import "./style.css";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", { alpha: false });

const bigFlakes = [];
const smallFlakes = [];

let STEP = 7;

export function renderKochSnowflake(scale, x = 0, y = 0, angle = 0, color) {
  const points = computePoints(STEP);
  const radian = (angle * Math.PI) / 180;
  ctx.save();

  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.rotate(radian);

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  points.forEach((point) => {
    ctx.lineTo(point.x, point.y);
  });

  ctx.fillStyle = color;
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function render() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.lineWidth = 0.7;
  ctx.fillStyle = "white";

  bigFlakes.forEach((flake) => {
    renderKochSnowflake(1, flake.x, flake.y);
  });
  smallFlakes.forEach((flake) => {
    renderKochSnowflake(1 / Math.sqrt(3), flake.x, flake.y, 30);
  });
}

function init() {
  const cntHorizontal = (window.innerWidth - flakeWidth / 2) / flakeWidth + 1;
  const cntVertical = (window.innerWidth - flakeHeight / 2) / flakeHeight + 1;
  for (let j = 0; j < cntVertical; j++) {
    for (let i = 0; i < cntHorizontal; i++) {
      bigFlakes.push({
        x: flakeWidth * i,
        y: ((2 * j + (i % 2)) * flakeHeight) / 2,
      });
      smallFlakes.push({
        x: flakeWidth * i - smallFlakeHeight / 2,
        y: ((2 * j + (1 - (i % 2))) * flakeHeight) / 2,
      });
      smallFlakes.push({
        x: flakeWidth * i + smallFlakeHeight / 2,
        y: ((2 * j + (1 - (i % 2))) * flakeHeight) / 2,
      });
    }
  }
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
}

init();

window.addEventListener("resize", resize);
const slider = document.getElementById("myRange");
const output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function () {
  output.innerHTML = this.value;
  STEP = this.value;

  render();
};

resize();
