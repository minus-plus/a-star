/**
 * Created by Yun on 1/24/2018.
 */

class Effect {
  constructor(option = {}) {
    this.bindListener = this.bindListener.bind(this);
    this.removeListener = this.removeListener.bind(this);
    this.tick = this.tick.bind(this);
    this.reset = this.reset.bind(this);;
    this.canvas = option.canvas;
    if (this.canvas === null) {
      throw Error('No Canvas Attached');
    }

    this.ctx = this.canvas.getContext('2d');

    this.bindListener();


  }

  bindListener() {

    return this;
  }

  removeListener() {

    return this;
  }

  tick() {

    return this;
  }

  play() {

    return this;
  }

  reset() {
    return this;
  }



}

const exports = (module.exports = Effect);
