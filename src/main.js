import domready from 'domready';

import Astar from './Astar';
import Graph from './Graph';

function drawRect(ctx, x, y, w, h, r, color) {
  console.log("drawing " + color);
  color = color || "#e3e3e3";
  ctx.beginPath();
  ctx.moveTo(x, y + r);
  ctx.lineTo(x, y + h - r);
  ctx.arcTo(x, y + h, x + r, y + h, r);
  ctx.lineTo(x + w - r, y + h);
  ctx.arcTo(x + w, y + h, x + w, y + h-r, r);
  ctx.lineTo(x + w, y + r);
  ctx.arcTo(x + w, y, x + w - r, y, r);
  ctx.lineTo(x + r, y);
  ctx.arcTo(x, y, x, y + r, r);
  ctx.fillStyle = color;
  ctx.fill();
}

domready(function() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');
  // drawRect(ctx, 1,1, 23, 23, 8);
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      let x = i * 25 + 1;
      let y = j * 25 + 1;
      drawRect(ctx, x, y, 23, 23, 8);
    }
  }

  canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    let index_x = ~~(x / 25);
    let index_y = ~~(y / 25);
    // go to the index and draw with another color
    drawRect(ctx, index_x * 25 + 1, index_y * 25 + 1, 23, 23, 8, "#42f4c8");
  }, false)



});