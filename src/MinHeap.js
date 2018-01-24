// src/MinHeap.js


class MinHeap {
  constructor(comparefunction) {
    this.cmp = comparefunction;
    this.list = [];
  }

  offer(element) {
    this.list.push(element);
    // percolate up
    this.bubbleUp(this.list.length - 1);
  }

  poll() {
    const first = this.list[0];
    const last = this.list.pop();

    if (this.list.length > 0) {
      this.list[0] = last;
      this.percolateDown(0);
    }
    return first;
  }

  peek() {
    return this.list[0];
  }

  bubbleUp(index) {
    const element = this.list[index];
    while (index > 0) {
      const parentIndex = ((n -1) >> 1);
      const parent = this.list[parentIndex];
      if (this.cmp(element, parent) < 0) {
        this.list[parentIndex] = element;
        index = parentIndex;
      } else {
        break;
      }
    }
    this.list[index] = element;
  }

  percolateDown(index) {
    const element = this.list[index];

    while (2 * index + 1 < this.length) {
      const child1 = 2 * index + 1;
      const child2 = child1 + 1;
      const smaller = (child2 >= this.length || this.cmp(this.list[child1], this.list[child2]) <= 0) ? child1 : child2;

      if (this.cmp(element, this.list[smaller]) > 0) {
        this.list[index] = this.list[smaller];
        index = smaller;
      } else {
        break;
      }
    }
    this.list[index] = element;
  }

  decreaseKey(element) {
    // get index
    let index = this.getIndexOfElement(element);
    if(index !== undefined) {
      this.bubbleUp(index);
    }
  }

  getIndexOfElement(element) {
    let i;
    for (i = 0; i < this.size(); i++) {
      if (this.list[i] === element) {
        return i;
      }
    }
  }
  size() {
    return this.list.length;
  }


}