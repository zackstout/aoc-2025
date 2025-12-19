const { MinPriorityQueue } = require("./minPriorityQueue.js");
/**
 * Dijkstra's algorithm on a weighted directed graph with non-negative weights.
 *
 * @template T
 * @param {Map<T, Array<{ node: T, weight: number }>>} graph
 *   Adjacency list: for each node, an array of outgoing edges
 * @param {T} start
 *   Start node
 * @returns {{
 *   distances: Map<T, number>,
 *   previous: Map<T, T | null>
 * }}
 *   distances: shortest distance from start to each node (Infinity if unreachable)
 *   previous: to reconstruct paths
 */
function dijkstra(graph, start) {
  const distances = new Map();
  const previous = new Map();
  const pq = new MinPriorityQueue();

  // Initialize distances and previous
  for (const node of graph.keys()) {
    distances.set(node, node === start ? 0 : Infinity);
    previous.set(node, null);
  }

  pq.enqueue(start, 0);

  while (!pq.isEmpty()) {
    const item = pq.dequeue();
    if (!item) break;

    const { element: current, priority: currentDist } = item;

    // Skip if we've already found a better path
    if (currentDist > distances.get(current)) continue;

    const neighbors = graph.get(current) || [];
    for (const { node: neighbor, weight } of neighbors) {
      if (weight < 0) {
        throw new Error(
          "Dijkstra's algorithm does not support negative edge weights."
        );
      }

      const newDist = currentDist + weight;
      if (newDist < (distances.get(neighbor) ?? Infinity)) {
        distances.set(neighbor, newDist);
        previous.set(neighbor, current);
        pq.enqueue(neighbor, newDist);
      }
    }
  }

  return { distances, previous };
}

/**
 * Reconstruct shortest path from start to target using the `previous` map.
 *
 * @template T
 * @param {Map<T, T | null>} previous
 * @param {T} target
 * @returns {T[]} Path from start to target (empty if unreachable)
 */
function reconstructPath(previous, target) {
  if (!previous.has(target)) return [];
  const path = [];
  let current = target;
  while (current != null) {
    path.push(current);
    current = previous.get(current) ?? null;
  }
  return path.reverse();
}

/* =========================
   Example usage
   ========================= */

// Graph as adjacency list (directed)
// A --1--> B --2--> C
// A --4--> C
const graph = new Map([
  [
    "A",
    [
      { node: "B", weight: 1 },
      { node: "C", weight: 4 },
    ],
  ],
  ["B", [{ node: "C", weight: 2 }]],
  ["C", []],
]);

const { distances, previous } = dijkstra(graph, "A");

// console.log("Distance A→C:", distances.get("C")); // 3
// console.log("Path A→C:", reconstructPath(previous, "C")); // ['A', 'B', 'C']

module.exports = { dijkstra, reconstructPath };

/**
 * Main idea: Once a node is popped from the priority queue, its shortest path is final.
 * And then, we update its neighbors with a potentially new (lower) cost.
 *
 * Also maybe we consolidate all to one...
 *
 * because A* extends this, and this extends BFS.
 * (in the sense of "extends" where "A extends B" <--> "B is a special case of A")
 */
