// src/Astar.js
import MinHeap from './MinHeap';
import Graph from './Graph';


class Astar {
  constructor() {

  }

  static search(graph, start, end, options = {}) {
    const heuristic = options.heuristic || Astar.manhattan;
    let openList = new MinHeap(function(node1, node2){
      return node1.f - node2.f;
    });
    let closeList = {}; // a set
    start.g = 0;
    openList.offer(start);
    graph.markDirty(start);

    while (openList.size() > 0) {
      let curr = openList.poll();
      if (curr === end) {
        // success
        console.log("found goal", start, end)
        return this.getPath(end);
      }
      curr.colsed = true;

      // expanding
      let neighbors = graph.getNeighbors(curr);
      console.log();
      console.log(curr.x, curr.y)
      console.log("----------");
      for (let i = 0; i < neighbors.length; i++) {

        let neighbor = neighbors[i];
        if (neighbor.colsed || neighbor.isObstacle()) {
          // skip, do nothing
          continue;
        }

        let newG = curr.g + neighbor.getCost(curr);
        let visited = neighbor.visited;
        if (!visited || newG < neighbor.g) {
          neighbor.visited = true;
          neighbor.g = newG;
          neighbor.parent = curr;
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          graph.markDirty(neighbor);
          // if neighbor not in openList, add it

          if (!visited) {
            // expand this neighbor
            openList.offer(neighbor);
          } else {
            // decrease the key of neighbor
            openList.decreaseKey(neighbor)
          }
        }
        console.log(neighbor.x, neighbor.y, neighbor.g, neighbor.h, neighbor.f);
      }
    }

    return [];

  }

  static manhattan(p1, p2) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
  }

  static diagonal(p1, p2) {
    let D = 1;
    let D2 = Math.sqrt(2);
    let d1 = Math.abs(pos1.x - pos0.x);
    let d2 = Math.abs(pos1.y - pos0.y);
    return (D * (d1 + d2)) + ((D2 - (2 * D)) * Math.min(d1, d2));
  }

  static cleanNode(node) {

    node.g = 100000;
    node.h = 0;
    node.f = this.g + this.h;
    node.visited = false;
    node.closed = false;
    node.parant = null;
  }

  static getPath(node) {
    let curr = node;
    let path = [];
    while (curr.parent) {
      path.unshift(curr);
      curr = curr.parent;
    }
    return path;
  }

}


export default Astar;