// Kruskal's -- greedy, continuously take lowest weight edge that does not produce cycle.
// Prim's -- greedy, continuously take lowest weight edge that connects to current tree.

// KRUSKALS (does use Union find):
// It sorts the edges in ascending order of weight and adds them one by one to the Minimum Spanning Tree (MST), ensuring that no cycles are formed.
// To efficiently check if adding an edge would form a cycle, it uses the union-find data structure with path compression and union by rank.

// PRIMS (does NOT use Union find):
// It grows the MST by starting from an arbitrary vertex and repeatedly adding the smallest edge that connects a new vertex to the MST.
// Instead of union-find, Prim’s algorithm typically uses a priority queue (min-heap) to efficiently find the next smallest edge.

const { UnionFind } = require("./unionFind.js");

function kruskalMST(edges, numNodes) {
  edges.sort((a, b) => a[2] - b[2]); // Sort edges by weight
  let uf = new UnionFind(numNodes);
  let mst = [];

  for (let [u, v, weight] of edges) {
    if (uf.find(u) !== uf.find(v)) {
      uf.union(u, v);
      mst.push([u, v, weight]);
    }
  }

  return mst;
}

// Example usage:
// function example() {
//   const edges = [
//     [0, 1, 1],
//     [0, 2, 3],
//     [1, 2, 1],
//     [1, 3, 4],
//     [2, 3, 2],
//   ];
//   let mst = kruskalMST(edges, 4);
//   console.log("Minimum Spanning Tree:", mst);
// }

// example();

module.exports = { kruskalMST };
