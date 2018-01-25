
class GridNode {
  constructor(x, y, weight) {
    this.x = x;
    this.y = y;
    this.weight = weight;


    this.g = 100000;
    this.h = 0;
    this.f = this.g + this.h;
    this.closed = false;
    this.visited = false;
    this.parent = null;
  }

  toString() {
    return '[' + this.x + ' ' + this.y + ']';
  }

  isObstacle() {
    return this.weight === 0;
  }

  reset() {

    this.g = 100000;
    this.h = 0;
    this.f = this.g + this.h;
    this.closed = false;
    this.visited = false;
    this.parent = null;
  }



  getCost(neighbor) {
    // if current node and its neighbor are in diagonal
    if (neighbor && this.x !== neighbor.x && this.y !== neighbor.y) {
      return this.weight * 1.414;
    } else {
      return this.weight;
    }
  }
}

export default GridNode;