// Kruskal's -- greedy, continuously take lowest weight edge that does not produce cycle.
// Prim's -- greedy, continuously take lowest weight edge that connects to current tree.

// Also union-find??

// KRUSKALS (does use Union find):
// It sorts the edges in ascending order of weight and adds them one by one to the Minimum Spanning Tree (MST), ensuring that no cycles are formed.
// To efficiently check if adding an edge would form a cycle, it uses the union-find data structure with path compression and union by rank.

// PRIMS (does NOT use Union find):
// It grows the MST by starting from an arbitrary vertex and repeatedly adding the smallest edge that connects a new vertex to the MST.
// Instead of union-find, Prim’s algorithm typically uses a priority queue (min-heap) to efficiently find the next smallest edge.

class UnionFind {
  constructor(size) {
    this.parent = new Array(size).fill(0).map((_, index) => index);
    this.rank = new Array(size).fill(1);
  }

  find(node) {
    if (this.parent[node] !== node) {
      this.parent[node] = this.find(this.parent[node]); // Path compression
    }
    return this.parent[node];
  }

  union(node1, node2) {
    let root1 = this.find(node1);
    let root2 = this.find(node2);

    if (root1 !== root2) {
      if (this.rank[root1] > this.rank[root2]) {
        this.parent[root2] = root1;
      } else if (this.rank[root1] < this.rank[root2]) {
        this.parent[root1] = root2;
      } else {
        this.parent[root2] = root1;
        this.rank[root1]++;
      }
    }
  }
}

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
