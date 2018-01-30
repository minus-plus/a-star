import domready from 'domready';

import Astar from './Astar';
import Graph from './Graph';
import GraphSearch from './GraphSearch'





domready(function() {

  let row = 20;
  let width = 640 / row;
  let lineWith = 1;
  let w = width - lineWith * 2;
  let r = ~~((width - lineWith * 2) / 3);
  let p = 0.2;
  let diagonal = false;

  const defaultColor = "#e3e3e3";

  const canvas = document.getElementById("canvas");
  const searchBtn = document.getElementById('search');
  const resetBtn = document.getElementById('reset');
  const frequency = document.getElementById('frequency');
  const gridSize = document.getElementById('gridSize');
  const option = {
    canvas,
    searchBtn,
    resetBtn,
    frequency,
    gridSize,
    row,
    width,
    lineWith,
    r,
    p,
    defaultColor,
    diagonal
  };

  const graphSearch = new GraphSearch(option);


});