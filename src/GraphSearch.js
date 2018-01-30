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
    this.p = option.p || +(this.frequency);
    this.canvas = option.canvas;
    this.ctx = option.canvas.getContext('2d');
    this.searchBtn = option.searchBtn;
    this.resetBtn = option.resetBtn;
    this.gridSize = option.gridSize;
    this.frequency = option.frequency;
    this.defaultColor = option.defaultColor;

    this.init = this.init.bind(this);
    this.search = this.search.bind(this);
    this.prevPath = null;

    this.init();
    this.bindEventListener();
  }

  init() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.resetDimensions();
    this.start = null;
    this.end = null;
    this.prevPath = null;
    this.matrix = this.constructor.generateMatrix(this.row, this.p);
    this.graph = new Graph(this.matrix, {diagonal: this.diagonal});
    this.draw();
  }

  drawByIndex(x, y, color) {

    let width = this.width;
    let w = this.w;
    let r = this.r;
    let ctx = this.ctx;
    let lineWidth = this.lineWith;

    this.constructor.drawRect(ctx, x * width + lineWidth, y * width + lineWidth, w, w, r, color);
  }

  bindEventListener() {
    this.canvas.addEventListener('click', (event) => {
      // do, check new start and goal, check
      const rect = canvas.getBoundingClientRect();
      let x = ~~ ((event.clientX - rect.left) / this.width);
      let y = ~~ ((event.clientY - rect.top) / this.width);
      this.updateDes([x, y]);
    }, false);

    this.searchBtn.addEventListener('click', (event) => {
      let path = this.search();
      if (path.length) {
        for (let i = 0; i < path.length - 1; i++ ) {
          let node = path[i];
          this.drawByIndex(node.x, node.y, "#ed904e")
        }
      }
    }, false);

    this.resetBtn.addEventListener('click', (event) => {
      console.log("reset");
      this.init();
    }, false);
  }

  resetDimensions() {
    this.p = +(this.frequency.value) || this.p;
    this.row = +(this.gridSize.value) || this.row;
    this.width = 640 / this.row;
    this.w = this.width - this.lineWith * 2;
    this.r = ~~((this.width - this.lineWith * 2) / 3);
  }

  reset() {
    this.init();
  }

  clearPrevPath() {
    for (let i = 0; i < this.prevPath.length - 1; i++) {
      let node = this.prevPath[i];
      this.drawByIndex(node.x, node.y, "#e3e3e3");
    }
    this.prevPath = [];
  }


  updateDes(point) {
    let width = this.width;
    let lineWith = this.lineWith;
    let r = this.r;
    let w = this.w;
    const node = this.graph.getNode(point);
    if (!node.isObstacle()) {
      if (this.end) {
        let temp = this.start;
        this.start = this.end;
        this.end = node;
        this.drawByIndex(this.start.x, this.start.y, "#42f4c8");
        this.drawByIndex(this.end.x, this.end.y, "#ed4d95");
        this.drawByIndex(temp.x, temp.y, "#e3e3e3");
      } else if(this.start) {
        this.end = node;
        this.drawByIndex(point[0], point[1], "#ed4d95")
      } else  {
        this.start = node;
        this.drawByIndex(point[0], point[1], "#42f4c8");
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
          this.constructor.drawRect(this.ctx, i * width + lineWith, j * width + lineWith, w , w, r, "#333333");
        }
      }
    }
  }

  search() {
    // clear previous result
    if (this.start && this.end) {
      if (this.prevPath) {
        // this.graph.reset();
        this.graph = new Graph(this.matrix);
        this.start = this.graph.grid[this.start.x][this.start.y];
        this.end = this.graph.grid[this.end.x][this.end.y];
        // clear prevPath
        this.clearPrevPath();
      }

      this.prevPath = Astar.search(this.graph, this.start, this.end);
      return this.prevPath;
    }

    return [];
  }

}


export default GraphSearch;