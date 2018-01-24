import domready from 'domready';

import Astar from './Astar';
import Graph from './Graph';

function generateMatrix(row) {
  let result = [];
  for (let i = 0; i < row; i++) {
    result[i] = [];
    for (let j = 0; j < row; j++) {
      if (Math.random() < p) {
        result[i][j] = 1;
      } else {
        result[i][j] = 0;
      }
    }
  }
  return result;
}

function drawRect(ctx, x, y, w, h, r, color) {
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


function generateRandomWall(row, p = 0.25) {
  let result = [];
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < row; j++) {
      if (Math.random() < p) {
        result.push([i, j]);
      }
    }
  }
  return result;
}

domready(function() {

  let row = 20;
  let width = 800 / row;
  let lineWith = 1;
  let w = width - lineWith * 2;
  let r = ~~((width - lineWith * 2) / 3);
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');
  const wall = generateRandomWall(row, 0.2);


  const selected = [];
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < row; j++) {
      let x = i * width + lineWith;
      let y = j * width + lineWith;
      drawRect(ctx, x, y, w , w, r);
    }
  }

  wall.map((p) => {
    console.log(p[0], p[1]);
    drawRect(ctx, p[0] * width + lineWith,  p[1] * width + lineWith, w, w, r, '#000000')
  });


  canvas.addEventListener('click', (event) => {
    // do, check new start and goal, check
    const rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    let index_x = ~~(x / width);
    let index_y = ~~(y / width);

    if (selected.length < 2) {
      selected.push([index_x, index_y]);
    } else {
      let p = selected.shift();
      console.log(p);
      drawRect(ctx, p[0] * width + 1, p[1] * width + 1, w, w, r, "#e3e3e3");
      selected.push([index_x, index_y]);
    }
    // go to the index and draw with another color
    drawRect(ctx, index_x * width + 1, index_y * width + 1, w, w, r, "#42f4c8");
  }, false)



});