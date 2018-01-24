/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _domready = __webpack_require__(4);

var _domready2 = _interopRequireDefault(_domready);

var _Astar = __webpack_require__(1);

var _Astar2 = _interopRequireDefault(_Astar);

var _Graph = __webpack_require__(2);

var _Graph2 = _interopRequireDefault(_Graph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _domready2.default)(function () {
  console.log('main');
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // src/Astar.js


var _MinHeap = __webpack_require__(6);

var _MinHeap2 = _interopRequireDefault(_MinHeap);

var _Graph = __webpack_require__(2);

var _Graph2 = _interopRequireDefault(_Graph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Astar = function () {
  function Astar() {
    _classCallCheck(this, Astar);
  }

  _createClass(Astar, null, [{
    key: 'search',
    value: function search(graph, start, end) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      var heuristic = options.heuristic;
      var openList = new Heap(function (node1, node2) {
        return node1.f - node2.f;
      });
      var closeList = {}; // a set

      openList.push(start);
      graph.markDirty(start);

      while (openList.size() > 0) {
        var curr = openList.pop();
        if (curr === end) {
          // success
          return this.getPath(end);
        }
        curr.colsed = true;

        // expanding
        var neighbors = graph.getNeighbors(curr);
        for (var i = 0; i < neighbors.length; i++) {
          var neighbor = neighbors[i];
          if (neighbor.colsed || neighbor.isObstacle()) {
            // skip, do nothing
            continue;
          }
          var newG = curr.g + neighbor.getCost(curr);
          var visited = neighbor.visited;
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
              openList.decreaseKey(neighbor);
            }
          }
        }
      }

      return [];
    }
  }, {
    key: 'manhattan',
    value: function manhattan(p1, p2) {
      return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
    }
  }, {
    key: 'diagonal',
    value: function diagonal(p1, p2) {
      var D = 1;
      var D2 = Math.sqrt(2);
      var d1 = Math.abs(pos1.x - pos0.x);
      var d2 = Math.abs(pos1.y - pos0.y);
      return D * (d1 + d2) + (D2 - 2 * D) * Math.min(d1, d2);
    }
  }, {
    key: 'cleanNode',
    value: function cleanNode(node) {
      node.f = 0;
      node.g = 0;
      node.h = 0;
      node.visited = false;
      node.closed = false;
      node.parant = null;
    }
  }, {
    key: 'getPath',
    value: function getPath(node) {
      var curr = node;
      var path = [];
      while (curr.parent) {
        path.unshift(node);
        curr = curr.parent;
      }
      return path;
    }
  }]);

  return Astar;
}();

exports.default = Astar;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // src/Graph.js


var _GridNode = __webpack_require__(3);

var _GridNode2 = _interopRequireDefault(_GridNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Graph = function () {
  function Graph(matrix) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Graph);

    this.nodes = [];
    this.diagonal = !!options.diagonal;
    this.grid = [];

    // generate grid from matrix
    for (var x = 0; x < matrix.length; x++) {
      this.grid[x] = [];
      for (var y = 0, row = matrix[x]; y < row.length; y++) {
        var node = new _GridNode2.default(x, y, row[y]);
        this.grid[x][y] = node;
        this.nodes.push(node);
      }
    }

    this.init();
  }

  _createClass(Graph, [{
    key: "init",
    value: function init() {
      this.dirtyNodes = [];
      for (var i = 0; i < this.nodes.length; i++) {
        astar.cleanNode(this.nodes[i]);
      }
    }
  }, {
    key: "cleanDirty",
    value: function cleanDirty() {
      for (var i = 0; i < this.dirtyNodes.length; i++) {
        this.dirtyNodes[i].reset();
      }
      this.dirtyNodes = [];
    }
  }, {
    key: "markDirty",
    value: function markDirty(node) {
      this.dirtyNode.push(node);
    }
  }, {
    key: "getNeighbors",
    value: function getNeighbors(node) {
      var result = [];
      var x = node.x;
      var y = node.y;
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
  }, {
    key: "toString",
    value: function toString() {
      var graphString = [];
      var nodes = this.grid;
      for (var x = 0; x < nodes.length; x++) {
        var rowDebug = [];
        var row = nodes[x];
        for (var y = 0; y < row.length; y++) {
          rowDebug.push(row[y].weight);
        }
        graphString.push(rowDebug.join(" "));
      }
      return graphString.join("\n");
    }
  }]);

  return Graph;
}();

exports.default = Graph;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GridNode = function () {
  function GridNode(x, y, weight) {
    _classCallCheck(this, GridNode);

    this.x = x;
    this.y = y;
    this.weight = weight;

    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.closed = false;
    this.visited = false;
    this.parent = null;
  }

  _createClass(GridNode, [{
    key: 'toString',
    value: function toString() {
      return '[' + this.x + ' ' + this.y + ']';
    }
  }, {
    key: 'isObstable',
    value: function isObstable() {
      return this.weight === 1;
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.f = 0;
      this.g = 0;
      this.h = 0;
      this.closed = false;
      this.visited = false;
      this.parent = null;
    }
  }, {
    key: 'getCost',
    value: function getCost(neighbor) {
      // if current node and its neighbor are in diagonal
      if (neighbor && this.x !== neighbor.x && this.y !== neighbor.y) {
        return this.weight * 1.414;
      } else {
        return this.weight;
      }
    }
  }]);

  return GridNode;
}();

exports.default = GridNode;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {

  if (true) module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()

}('domready', function () {

  var fns = [], listener
    , doc = document
    , hack = doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


  if (!loaded)
  doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener)
    loaded = 1
    while (listener = fns.shift()) listener()
  })

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn)
  }

});


/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// src/MinHeap.js


var MinHeap = function () {
  function MinHeap(comparefunction) {
    _classCallCheck(this, MinHeap);

    this.cmp = comparefunction;
    this.list = [];
  }

  _createClass(MinHeap, [{
    key: "offer",
    value: function offer(element) {
      this.list.push(element);
      // percolate up
      this.bubbleUp(this.list.length - 1);
    }
  }, {
    key: "poll",
    value: function poll() {
      var first = this.list[0];
      var last = this.list.pop();

      if (this.list.length > 0) {
        this.list[0] = last;
        this.percolateDown(0);
      }
      return first;
    }
  }, {
    key: "peek",
    value: function peek() {
      return this.list[0];
    }
  }, {
    key: "bubbleUp",
    value: function bubbleUp(index) {
      var element = this.list[index];
      while (index > 0) {
        var parentIndex = n - 1 >> 1;
        var parent = this.list[parentIndex];
        if (this.cmp(element, parent) < 0) {
          this.list[parentIndex] = element;
          index = parentIndex;
        } else {
          break;
        }
      }
      this.list[index] = element;
    }
  }, {
    key: "percolateDown",
    value: function percolateDown(index) {
      var element = this.list[index];

      while (2 * index + 1 < this.length) {
        var child1 = 2 * index + 1;
        var child2 = child1 + 1;
        var smaller = child2 >= this.length || this.cmp(this.list[child1], this.list[child2]) <= 0 ? child1 : child2;

        if (this.cmp(element, this.list[smaller]) > 0) {
          this.list[index] = this.list[smaller];
          index = smaller;
        } else {
          break;
        }
      }
      this.list[index] = element;
    }
  }, {
    key: "decreaseKey",
    value: function decreaseKey(element) {
      // get index
      var index = this.getIndexOfElement(element);
      if (index !== undefined) {
        this.bubbleUp(index);
      }
    }
  }, {
    key: "getIndexOfElement",
    value: function getIndexOfElement(element) {
      var i = void 0;
      for (i = 0; i < this.size(); i++) {
        if (this.list[i] === element) {
          return i;
        }
      }
    }
  }, {
    key: "size",
    value: function size() {
      return this.list.length;
    }
  }]);

  return MinHeap;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map