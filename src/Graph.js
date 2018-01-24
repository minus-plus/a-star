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

  init() {
    this.dirtyNodes = [];
    for (let i = 0; i < this.nodes.length; i++) {
      astar.cleanNode(this.nodes[i]);
    }
  }

  cleanDirty() {
    for (let i = 0; i < this.dirtyNodes.length; i++) {
      this.dirtyNodes[i].reset();
    }
    this.dirtyNodes = [];
  }

  markDirty(node) {
    this.dirtyNode.push(node);
  }

  getNeighbors(node) {
    let result = [];
    let x = node.x;
    let y = node.y;
    if (this.grid[x - 1] && this.grid[x - 1][y]) {
      result.push(grid[x - 1][y]);
    }

    // East
    if (this.grid[x + 1] && grid[x + 1][y]) {
      result.push(grid[x + 1][y]);
    }

    // South
    if (this.grid[x] && grid[x][y - 1]) {
      result.push(grid[x][y - 1]);
    }

    // North
    if (this.grid[x] && grid[x][y + 1]) {
      result.push(grid[x][y + 1]);
    }

    if (this.diagonal) {
      // Southwest
      if (this.grid[x - 1] && grid[x - 1][y - 1]) {
        result.push(grid[x - 1][y - 1]);
      }

      // Southeast
      if (this.grid[x + 1] && grid[x + 1][y - 1]) {
        result.push(grid[x + 1][y - 1]);
      }

      // Northwest
      if (this.grid[x - 1] && grid[x - 1][y + 1]) {
        result.push(grid[x - 1][y + 1]);
      }

      // Northeast

      if (this.grid[x + 1] && grid[x + 1][y + 1]) {

        result.push(grid[x + 1][y + 1]);
      }
    }
    return result;
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