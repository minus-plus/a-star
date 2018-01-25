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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // src/Graph.js


var _GridNode = __webpack_require__(5);

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
    key: "valid",
    value: function valid(node) {
      if (node.visited || node.closed || node.g !== 100000 || node.f !== node.g || node.h !== 0) {
        console.log("wrong");
      }
    }
  }, {
    key: "init",
    value: function init() {
      this.dirtyNodes = [];
      for (var i = 0; i < this.nodes.length; i++) {
        this.nodes[i].reset();
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      for (var i = 0; i < this.grid.length; i++) {
        for (var j = 0; j < this.grid.length; j++) {
          var prevW = this.grid[i][j].weight;
          this.grid[i][j].reset();
          console.log(this.grid[i][j].weight, prevW);
        }
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
      this.dirtyNodes.push(node);
    }
  }, {
    key: "getNeighbors",
    value: function getNeighbors(node) {
      var grid = this.grid;
      var result = [];
      var x = node.x;
      var y = node.y;
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
  }, {
    key: "getNode",
    value: function getNode(point) {
      return this.grid[point[0]][point[1]];
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // src/Astar.js


var _MinHeap = __webpack_require__(4);

var _MinHeap2 = _interopRequireDefault(_MinHeap);

var _Graph = __webpack_require__(0);

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

      var heuristic = options.heuristic || Astar.manhattan;
      var openList = new _MinHeap2.default(function (node1, node2) {
        return node1.f - node2.f;
      });
      var closeList = {}; // a set
      start.g = 0;
      openList.offer(start);
      graph.markDirty(start);

      while (openList.size() > 0) {
        var curr = openList.poll();
        if (curr === end) {
          // success
          return this.getPath(end);
        }
        curr.colsed = true;
        // console.log("==============")
        // console.log("[", curr.x, curr.y, "]", curr.g, curr.h, curr.f);
        // console.log("--------------")
        // expanding
        var neighbors = graph.getNeighbors(curr);
        for (var i = 0; i < neighbors.length; i++) {

          var neighbor = neighbors[i];
          if (neighbor.colsed || neighbor.isObstacle()) {
            if (!neighbor.closed) {
              // console.log(neighbor.colsed || (neighbor.isObstacle()),neighbor.isObstacle(), neighbor.weight === 0)
            }
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

          // console.log("[", neighbor.x, neighbor.y, "]", neighbor.g, neighbor.h, neighbor.f);
        }
      }
      console.log("can not reach the goal");
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

      node.g = 100000;
      node.h = 0;
      node.f = this.g + this.h;
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
        path.unshift(curr);
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


var _domready = __webpack_require__(3);

var _domready2 = _interopRequireDefault(_domready);

var _Astar = __webpack_require__(1);

var _Astar2 = _interopRequireDefault(_Astar);

var _Graph = __webpack_require__(0);

var _Graph2 = _interopRequireDefault(_Graph);

var _GraphSearch = __webpack_require__(6);

var _GraphSearch2 = _interopRequireDefault(_GraphSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _domready2.default)(function () {

  var row = 20;
  var width = 640 / row;
  var lineWith = 1;
  var w = width - lineWith * 2;
  var r = ~~((width - lineWith * 2) / 3);
  var p = 0.2;

  var defaultColor = "#e3e3e3";

  var canvas = document.getElementById("canvas");
  var searchBtn = document.getElementById('search');
  var resetBtn = document.getElementById('reset');
  var frequency = document.getElementById('frequency');
  var gridSize = document.getElementById('gridSize');
  var option = {
    canvas: canvas,
    searchBtn: searchBtn,
    resetBtn: resetBtn,
    frequency: frequency,
    gridSize: gridSize,
    row: row,
    width: width,
    lineWith: lineWith,
    r: r,
    p: p,
    defaultColor: defaultColor,
    diagonal: false
  };

  var graphSearch = new _GraphSearch2.default(option);
});

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

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
    key: 'offer',
    value: function offer(element) {
      this.list.push(element);
      // bubble up
      this.bubbleUp(this.list.length - 1);
    }
  }, {
    key: 'poll',
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
    key: 'peek',
    value: function peek() {
      return this.list[0];
    }
  }, {
    key: 'bubbleUp',
    value: function bubbleUp(index) {
      var element = this.list[index];
      while (index > 0) {
        var parentIndex = index - 1 >> 1;
        var parent = this.list[parentIndex];
        if (this.cmp(element, parent) < 0) {
          this.list[index] = parent;
          index = parentIndex;
        } else {
          break;
        }
      }
      this.list[index] = element;
    }
  }, {
    key: 'percolateDown',
    value: function percolateDown(index) {
      var element = this.list[index];

      while (2 * index + 1 < this.list.length) {
        var child1 = 2 * index + 1;
        var child2 = child1 + 1;
        var smaller = child2 >= this.list.length || this.cmp(this.list[child1], this.list[child2]) <= 0 ? child1 : child2;

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
    key: 'decreaseKey',
    value: function decreaseKey(element) {
      // get index
      var index = this.getIndexOfElement(element);
      if (index !== undefined) {
        this.bubbleUp(index);
      }
    }
  }, {
    key: 'getIndexOfElement',
    value: function getIndexOfElement(element) {
      var i = void 0;
      for (i = 0; i < this.size(); i++) {
        if (this.list[i] === element) {
          return i;
        }
      }
    }
  }, {
    key: 'size',
    value: function size() {
      return this.list.length;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.list.join(', ');
    }
  }]);

  return MinHeap;
}();

exports.default = MinHeap;

/***/ }),
/* 5 */
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

    this.g = 100000;
    this.h = 0;
    this.f = this.g + this.h;
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
    key: 'isObstacle',
    value: function isObstacle() {
      return this.weight === 0;
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.g = 100000;
      this.h = 0;
      this.f = this.g + this.h;
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Yun on 1/24/2018.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _Astar = __webpack_require__(1);

var _Astar2 = _interopRequireDefault(_Astar);

var _Graph = __webpack_require__(0);

var _Graph2 = _interopRequireDefault(_Graph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GraphSearch = function () {
  _createClass(GraphSearch, null, [{
    key: 'generateMatrix',
    value: function generateMatrix(row) {
      var p = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.2;

      var result = [];
      for (var i = 0; i < row; i++) {
        result[i] = [];
        for (var j = 0; j < row; j++) {
          if (Math.random() < p) {
            result[i][j] = 0;
          } else {
            result[i][j] = 1;
          }
        }
      }
      return result;
    }
  }, {
    key: 'drawRect',
    value: function drawRect(ctx, x, y, w, h, r, color) {
      color = color || "#e3e3e3";
      ctx.beginPath();
      ctx.moveTo(x, y + r);
      ctx.lineTo(x, y + h - r);
      ctx.arcTo(x, y + h, x + r, y + h, r);
      ctx.lineTo(x + w - r, y + h);
      ctx.arcTo(x + w, y + h, x + w, y + h - r, r);
      ctx.lineTo(x + w, y + r);
      ctx.arcTo(x + w, y, x + w - r, y, r);
      ctx.lineTo(x + r, y);
      ctx.arcTo(x, y, x, y + r, r);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }]);

  function GraphSearch() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, GraphSearch);

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
    this.p = option.p;
    this.canvas = option.canvas;
    this.ctx = option.canvas.getContext('2d');
    this.searchBtn = option.searchBtn;
    this.resetBtn = option.resetBtn;
    this.gridSize = option.gridSize;
    this.frequency = option.frequency;
    this.defaultColor = option.defaultColor;

    this.init = this.init.bind(this);
    this.search = this.search.bind(this);
    this.prevPath = [];

    this.init();
    this.bindEventListner();
  }

  _createClass(GraphSearch, [{
    key: 'init',
    value: function init() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.resetDimensions();
      this.start = null;
      this.end = null;
      this.prevPath = [];
      this.matrix = this.constructor.generateMatrix(this.row, this.p);
      this.graph = new _Graph2.default(this.matrix, { diagonal: this.diagonal });
      this.draw();
    }
  }, {
    key: 'drawByIndex',
    value: function drawByIndex(x, y, color) {

      var width = this.width;
      var w = this.w;
      var r = this.r;
      var ctx = this.ctx;
      var lineWidth = this.lineWith;

      this.constructor.drawRect(ctx, x * width + lineWidth, y * width + lineWidth, w, w, r, color);
    }
  }, {
    key: 'bindEventListner',
    value: function bindEventListner() {
      var _this = this;

      this.canvas.addEventListener('click', function (event) {
        // do, check new start and goal, check
        var rect = canvas.getBoundingClientRect();
        var x = ~~((event.clientX - rect.left) / _this.width);
        var y = ~~((event.clientY - rect.top) / _this.width);
        _this.updateDes([x, y]);
      }, false);

      this.searchBtn.addEventListener('click', function (event) {
        var path = _this.search();
        console.log(_this.start, _this.end);
        console.log(path);
        if (path.length) {
          for (var i = 0; i < path.length - 1; i++) {
            var node = path[i];
            _this.drawByIndex(node.x, node.y, "#ed904e");
          }
        }
      }, false);

      this.resetBtn.addEventListener('click', function (event) {
        console.log("reset");
        _this.init();
      }, false);
    }
  }, {
    key: 'resetDimensions',
    value: function resetDimensions() {
      this.p = +this.frequency.value || this.p;
      this.row = +this.gridSize.value || this.row;
      this.width = 640 / this.row;
      this.w = this.width - this.lineWith * 2;
      this.r = ~~((this.width - this.lineWith * 2) / 3);
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.init();
    }
  }, {
    key: 'clearPrevPath',
    value: function clearPrevPath() {
      for (var i = 0; i < this.prevPath.length - 1; i++) {
        var node = this.prevPath[i];
        this.drawByIndex(node.x, node.y, "#e3e3e3");
      }
      this.prevPath = [];
    }
  }, {
    key: 'updateDes',
    value: function updateDes(point) {
      var width = this.width;
      var lineWith = this.lineWith;
      var r = this.r;
      var w = this.w;
      var node = this.graph.getNode(point);
      if (!node.isObstacle()) {
        if (this.end) {
          var temp = this.start;
          this.start = this.end;
          this.end = node;
          this.drawByIndex(this.start.x, this.start.y, "#42f4c8");
          this.drawByIndex(this.end.x, this.end.y, "#ed4d95");
          this.drawByIndex(temp.x, temp.y, "#e3e3e3");
        } else if (this.start) {
          this.end = node;
          this.drawByIndex(point[0], point[1], "#ed4d95");
        } else {
          this.start = node;
          this.drawByIndex(point[0], point[1], "#42f4c8");
        }
      }
    }
  }, {
    key: 'draw',
    value: function draw() {
      var width = this.width;
      var lineWith = this.lineWith;
      var r = this.r;
      var w = this.w;
      for (var i = 0; i < this.row; i++) {
        for (var j = 0; j < this.row; j++) {
          if (this.matrix[i][j] === 1) {
            this.constructor.drawRect(this.ctx, i * width + 1, j * width + 1, w, w, r);
          } else {
            this.constructor.drawRect(this.ctx, i * width + lineWith, j * width + lineWith, w, w, r, "#333333");
          }
        }
      }
    }
  }, {
    key: 'search',
    value: function search() {
      // clear previous result
      if (this.start && this.end) {
        this.prevPath = _Astar2.default.search(this.graph, this.start, this.end);
        return this.prevPath;
      }
    }
  }]);

  return GraphSearch;
}();

exports.default = GraphSearch;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map