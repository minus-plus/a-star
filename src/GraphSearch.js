/**
 * Created by Yun on 1/24/2018.
 */
import Astar from './Astar';
import Graph from './Graph';


class GraphSearch {

  static generateMatrix(row, p = 0.2) {
    let result = [];
    for (let i = 0; i < row; i++) {
      result[i] = [];
      for (let j = 0; j < row; j++) {
        if (Math.random() < p) {
          result[i][j] = 0;
        } else {
          result[i][j] = 1;
        }
      }
    }
    return result;
  }
  static drawRect(ctx, x, y, w, h, r, color) {
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

  constructor(option = {}) {
    if (!option.canvas) {
      throw "No canvas found";
    }
    this.option = option;
    this.diagonal = !!option.diagonal;
    this.row = option.row;
    this.width = option.width;
    this.lineWith = option.lineWith;
    this.r = option.r;
    this.w = this.width - this.lineWith * 2;
    this.canvas = option.canvas;
    this.ctx = option.canvas.getContext('2d');
    this.searchBtn = option.searchBtn;

    this.init = this.init.bind(this);
    this.search = this.search.bind(this);

    this.init();
    this.bindEventListner();
  }

  init() {
    this.matrix = this.constructor.generateMatrix(this.row);
    this.graph = new Graph(this.matrix, {diagonal: this.diagonal});
    this.draw();
  }

  bindEventListner() {
    this.canvas.addEventListener('click', (event) => {
      // do, check new start and goal, check
      const rect = canvas.getBoundingClientRect();
      let x = ~~ ((event.clientX - rect.left) / this.width);
      let y = ~~ ((event.clientY - rect.top) / this.width);
      this.updateDes([x, y]);
    }, false);

    this.searchBtn.addEventListener('click', (event) => {
      let path = this.search();
      console.log(path);
    })

  }

  reset() {
    this.graph = this.init();
  }

  updateDes(point) {
    let width = this.width;
    let lineWith = this.lineWith;
    let r = this.r;
    let w = this.w;
    const node = this.graph.getNode(point);
    if (!node.isObstacle()) {
      this.constructor.drawRect(this.ctx, point[0] * width + lineWith, point[1] * width + lineWith, w, w, r, "#42f4c8");
      if (this.end) {
        let temp = this.start;
        this.start = this.end;
        this.end = node;
        this.constructor.drawRect(this.ctx, temp.x * width + lineWith, temp.y * width + lineWith, w, w, r, "#e3e3e3");
      } else if(this.start) {
        this.end = node;
      } else  {
        this.start = node;
      }
    }
  }

  draw() {
    let width = this.width;
    let lineWith = this.lineWith;
    let r = this.r;
    let w = this.w;
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.row; j++) {
        if (this.matrix[i][j] === 1) {
          this.constructor.drawRect(this.ctx, i * width + 1, j * width + 1, w , w, r);
        } else {
          this.constructor.drawRect(this.ctx, i * width + lineWith, j * width + lineWith, w , w, r, "#000000");
        }
      }
    }
  }

  search() {
    let path = Astar.search(this.graph, this.start, this.end);
    return path;
  }

}


export default GraphSearch;