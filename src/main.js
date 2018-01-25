import domready from 'domready';

import Astar from './Astar';
import Graph from './Graph';
import GraphSearch from './GraphSearch'





domready(function() {

  let row = 20;
  let width = 800 / row;
  let lineWith = 1;
  let w = width - lineWith * 2;
  let r = ~~((width - lineWith * 2) / 3);

  const canvas = document.getElementById("canvas");
  const searchBtn = document.getElementById('search')
  const option = {
    canvas,
    searchBtn,
    row,
    width,
    lineWith,
    r,
    diagonal: false
  };

  const graphSearch = new GraphSearch(option);


});