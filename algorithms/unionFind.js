class UnionFind {
  constructor(size) {
    this.parent = new Array(size).fill(0).map((_, index) => index);

    // Prevents dumb choices during union -- allows us to constrain tree height
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
      // if (this.rank[root1] > this.rank[root2]) {
      //   this.parent[root2] = root1;
      //   this.rank[root1] += this.rank[root2];
      // } else {
      //   this.parent[root1] = root2;
      //   this.rank[root2] += this.rank[root1];
      // }

      if (this.rank[root1] > this.rank[root2]) {
        this.parent[root2] = root1;
        // this.rank[root1] += this.rank[root2];
      } else if (this.rank[root1] < this.rank[root2]) {
        this.parent[root1] = root2;
        // this.rank[root2] += this.rank[root1];
      } else {
        this.parent[root2] = root1;
        this.rank[root1]++;
      }
    }
  }
}

module.exports = { UnionFind };
