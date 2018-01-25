// src/Graph.js
import GridNode from './GridNode';

class Graph {
  constructor(matrix, options = {}) {
    this.nodes = [];
    this.diagonal = !!options.diagonal;
    this.grid = [];

    // generate grid from matrix
    for (let x = 0; x < matrix.length; x++) {
      this.grid[x] = [];
      for (let y = 0, row = matrix[x]; y < row.length; y++) {
        let node = new GridNode(x, y, row[y]);
        this.grid[x][y] = node;
        this.nodes.push(node);
      }
    }

    this.init();
  }

  valid(node) {
    if (node.visited || node.closed || node.g !== 100000 || node.f !== node.g || node.h !== 0) {
      console.log("wrong");
    }
  }

  init() {
    this.dirtyNodes = [];
    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].reset();
    }
  }

  reset() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid.length; j++) {
        let prevW = this.grid[i][j].weight;
        this.grid[i][j].reset();
        console.log(this.grid[i][j].weight, prevW);
      }
    }
  }


  cleanDirty() {
    for (let i = 0; i < this.dirtyNodes.length; i++) {
      this.dirtyNodes[i].reset();
    }
    this.dirtyNodes = [];
  }

  markDirty(node) {
    this.dirtyNodes.push(node);
  }

  getNeighbors(node) {
    let grid = this.grid;
    let result = [];
    let x = node.x;
    let y = node.y;
    if (this.grid[x - 1] && this.grid[x - 1][y]) {
      result.push(grid[x - 1][y]);
    }

    // East
    if (this.grid[x + 1] && this.grid[x + 1][y]) {
      result.push(grid[x + 1][y]);
    }

    // South
    if (this.grid[x] && this.grid[x][y - 1]) {
      result.push(this.grid[x][y - 1]);
    }

    // North
    if (this.grid[x] && this.grid[x][y + 1]) {
      result.push(this.grid[x][y + 1]);
    }

    if (this.diagonal) {
      // Southwest
      if (this.grid[x - 1] && this.grid[x - 1][y - 1]) {
        result.push(this.grid[x - 1][y - 1]);
      }

      // Southeast
      if (this.grid[x + 1] && this.grid[x + 1][y - 1]) {
        result.push(this.grid[x + 1][y - 1]);
      }

      // Northwest
      if (this.grid[x - 1] && this.grid[x - 1][y + 1]) {
        result.push(this.grid[x - 1][y + 1]);
      }

      // Northeast

      if (this.grid[x + 1] && this.grid[x + 1][y + 1]) {

        result.push(this.grid[x + 1][y + 1]);
      }
    }
    return result;
  }

  getNode(point) {
    return this.grid[point[0]][point[1]];
  }

  toString() {
    let graphString = [];
    const nodes = this.grid;
    for (let x = 0; x < nodes.length; x++) {
      let rowDebug = [];
      let row = nodes[x];
      for (let y = 0; y < row.length; y++) {
        rowDebug.push(row[y].weight);
      }
      graphString.push(rowDebug.join(" "));
    }
    return graphString.join("\n");
  }
}


export default Graph;