import MinHeap from 'MinHeap';
function test() {
  const heap = new MinHeap(function(n1, n2) {
    return n1 - n2;
  });

  heap.offer(1)
  heap.offer(3)
  heap.offer(5)
  heap.offer(6)
  heap.offer(8)
  heap.offer(7)
  heap.offer(2)
  let size = heap.size();
  for (let i = 0; i < size; i++) {
    console.log(heap.poll());
    console.log(heap.toString());
  }



}

test();