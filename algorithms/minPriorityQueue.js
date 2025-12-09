/**
 * Minimal reusable min-priority queue for Dijkstra.
 */
class MinPriorityQueue {
  constructor() {
    /** @type {{element: any, priority: number}[]} */
    this._heap = [];
  }

  _parentIndex(i) {
    return Math.floor((i - 1) / 2);
  }
  _leftChildIndex(i) {
    return 2 * i + 1;
  }
  _rightChildIndex(i) {
    return 2 * i + 2;
  }

  _swap(i, j) {
    const tmp = this._heap[i];
    this._heap[i] = this._heap[j];
    this._heap[j] = tmp;
  }

  _bubbleUp(index) {
    while (index > 0) {
      const parent = this._parentIndex(index);
      if (this._heap[index].priority >= this._heap[parent].priority) break;
      this._swap(index, parent);
      index = parent;
    }
  }

  _bubbleDown(index) {
    const length = this._heap.length;
    while (true) {
      const left = this._leftChildIndex(index);
      const right = this._rightChildIndex(index);
      let smallest = index;

      if (
        left < length &&
        this._heap[left].priority < this._heap[smallest].priority
      ) {
        smallest = left;
      }
      if (
        right < length &&
        this._heap[right].priority < this._heap[smallest].priority
      ) {
        smallest = right;
      }
      if (smallest === index) break;

      this._swap(index, smallest);
      index = smallest;
    }
  }

  /**
   * Add an element with given priority.
   * @param {any} element
   * @param {number} priority
   */
  enqueue(element, priority) {
    this._heap.push({ element, priority });
    this._bubbleUp(this._heap.length - 1);
  }

  /**
   * Remove and return the element with smallest priority.
   * @returns {{element: any, priority: number} | null}
   */
  dequeue() {
    if (this._heap.length === 0) return null;
    const min = this._heap[0];
    const end = this._heap.pop();
    if (this._heap.length > 0 && end) {
      this._heap[0] = end;
      this._bubbleDown(0);
    }
    return min;
  }

  isEmpty() {
    return this._heap.length === 0;
  }
}

module.exports = { MinPriorityQueue };
