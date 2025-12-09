const { MinPriorityQueue } = require("./minPriorityQueue.js");
const { reconstructPath } = require("./dijkstra.js");

/**
 * A* search on a weighted directed graph with non-negative weights.
 *
 * @template T
 * @param {Map<T, Array<{ node: T, weight: number }>>} graph
 *   Adjacency list: for each node, an array of outgoing edges
 * @param {T} start
 *   Start node
 * @param {T} goal
 *   Goal node
 * @param {(node: T, goal: T) => number} heuristic
 *   Admissible heuristic: estimated cost from node to goal (>= 0, never overestimates)
 *
 * @returns {{
 *   gScore: Map<T, number>,
 *   fScore: Map<T, number>,
 *   previous: Map<T, T | null>,
 *   found: boolean
 * }}
 */
function aStar(graph, start, goal, heuristic) {
  const gScore = new Map();
  const fScore = new Map();
  const previous = new Map();
  const openSet = new MinPriorityQueue();

  // Initialize scores
  for (const node of graph.keys()) {
    gScore.set(node, Infinity);
    fScore.set(node, Infinity);
    previous.set(node, null);
  }

  gScore.set(start, 0);
  fScore.set(start, heuristic(start, goal));
  openSet.enqueue(start, fScore.get(start));

  while (!openSet.isEmpty()) {
    const item = openSet.dequeue();
    if (!item) break;

    const { element: current, priority: currentF } = item;

    // If this entry is stale, skip it
    if (currentF > fScore.get(current)) continue;

    // Goal reached: we can stop early (A* property)
    if (current === goal) {
      return { gScore, fScore, previous, found: true };
    }

    const neighbors = graph.get(current) || [];
    for (const { node: neighbor, weight } of neighbors) {
      if (weight < 0) {
        throw new Error(
          "A* (like Dijkstra) does not support negative edge weights."
        );
      }

      const tentativeG = gScore.get(current) + weight;

      if (tentativeG < (gScore.get(neighbor) ?? Infinity)) {
        gScore.set(neighbor, tentativeG);
        previous.set(neighbor, current);

        const newF = tentativeG + heuristic(neighbor, goal);
        fScore.set(neighbor, newF);
        openSet.enqueue(neighbor, newF);
      }
    }
  }

  // Goal not reachable
  return { gScore, fScore, previous, found: false };
}

/* =========================
   Example usage
   ========================= */

// Simple graph:
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

// Very simple heuristic for demo:
// h(x, goal) = 0   (this reduces A* to Dijkstra)
function zeroHeuristic(node, goal) {
  return 0;
}

const { gScore, previous, found } = aStar(graph, "A", "C", zeroHeuristic);

console.log("Found path?", found); // true
console.log("Cost A→C:", gScore.get("C")); // 3
console.log("Path A→C:", reconstructPath(previous, "C")); // ['A', 'B', 'C']

module.exports = {
  aStar,
  reconstructPath,
};
