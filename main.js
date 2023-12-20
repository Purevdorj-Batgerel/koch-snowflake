import { flakeHeight, flakeWidth, smallFlakeHeight } from "./global";
import { computePoints } from "./kochSnowflake";
import "./style.css";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", { alpha: false });
canvas.width = 800;
canvas.height = 800;

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

  bigFlakes.forEach((flakeLayer) => {
    flakeLayer.forEach((flake) => {
      renderKochSnowflake(1, flake.x, flake.y);
    });
  });
  // smallFlakes.forEach((flake) => {
  //   renderKochSnowflake(1 / Math.sqrt(3), flake.x, flake.y, 30);
  // });
}

function init() {
  const cntHorizontal = canvas.width / flakeWidth;
  const cntVertical = Math.ceil(
    (canvas.height - flakeHeight * 0.5) / flakeHeight
  );

  let startY = flakeHeight * cntVertical;

  for (let i = 0; i < 5; i++) {
    bigFlakes[i] = [];
    let testY = startY - flakeHeight * i;
    let testX = 0;
    while (true) {
      if (testY > canvas.height + flakeHeight / 2) {
        break;
      }
      if (testY > -flakeHeight / 2) {
        bigFlakes[i].push({ x: testX, y: testY });
      }

      testX += flakeWidth;
      testY += flakeHeight * 1.5;
    }
  }

  // for (let j = 0; j < cntVertical; j++) {
  //   for (let i = 0; i < cntHorizontal; i++) {
  //     bigFlakes.push({
  //       x: flakeWidth * i,
  //       y: ((2 * j + (i % 2)) * flakeHeight) / 2,
  //     });
  //     // smallFlakes.push({
  //     //   x: flakeWidth * i - smallFlakeHeight / 2,
  //     //   y: ((2 * j + (1 - (i % 2))) * flakeHeight) / 2,
  //     // });
  //     // smallFlakes.push({
  //     //   x: flakeWidth * i + smallFlakeHeight / 2,
  //     //   y: ((2 * j + (1 - (i % 2))) * flakeHeight) / 2,
  //     // });
  //   }
  // }
}

init();

render();
