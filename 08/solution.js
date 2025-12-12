const { input } = require("./input.js");
const { UnionFind } = require("../algorithms/unionFind.js");

const ex = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`;

const euclideanDist = (p1, p2) => {
  return Math.pow(
    Math.pow(p1[0] - p2[0], 2) +
      Math.pow(p1[1] - p2[1], 2) +
      Math.pow(p1[2] - p2[2], 2),
    0.5
  );
};

const partOne = () => {
  const ps = input.split("\n").map((line) => line.split(",").map(Number));

  const distances = [];
  for (let i = 0; i < ps.length - 1; i++) {
    for (let j = i + 1; j < ps.length; j++) {
      const dist = euclideanDist(ps[i], ps[j]);
      distances.push({ dist, i, j });
    }
  }
  distances.sort((a, b) => a.dist - b.dist);

  const NUM_SHORTEST_CONNECTIONS = 1000;
  const uf = new UnionFind(ps.length);

  let times = 0;
  let idx = 0;

  while (times < NUM_SHORTEST_CONNECTIONS) {
    if (idx > ps.length) break;
    const { i, j, dist } = distances[idx];

    if (uf.find(i) === uf.find(j)) {
      // These nodes already belong to the same cycle; just skip them
      //   console.log("AWOOGA", i, j);
    } else {
      // We actually count a new union
      times++;
      uf.union(i, j);
    }

    idx++;
  }

  console.log("times", times, "total", ps.length);

  const counts = {};

  //   uf.parent.forEach((x) => {
  //     if (!counts[x]) counts[x] = 0;
  //     counts[x]++;
  //   });

  // ahhhhh dumb mistake lol whoops
  // but yeah it reflects/exposes a fundamental misunderstanding of mine in how parents is working.
  // each spot in array doesn't point to root, but to its own parent. creating a chain.
  for (let i = 0; i < ps.length; i++) {
    const root = uf.find(i);
    if (!counts[root]) counts[root] = 0;
    counts[root]++;
  }

  //   return counts;

  return Object.values(counts)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((prod, val) => prod * val, 1);

  //   return distances;
};

const partTwo = () => {
  const ps = input.split("\n").map((line) => line.split(",").map(Number));

  const distances = [];
  for (let i = 0; i < ps.length - 1; i++) {
    for (let j = i + 1; j < ps.length; j++) {
      const dist = euclideanDist(ps[i], ps[j]);
      distances.push({ dist, i, j });
    }
  }
  distances.sort((a, b) => a.dist - b.dist);

  const uf = new UnionFind(ps.length);

  const getCounts = () => {
    const counts = {};

    for (let i = 0; i < ps.length; i++) {
      const root = uf.find(i);
      if (!counts[root]) counts[root] = 0;
      counts[root]++;
    }

    return counts;
  };

  const isDone = () => {
    const c = getCounts();
    return Object.keys(c).length === 1;
  };

  let prev = [];

  let idx = 0;

  while (!isDone()) {
    if (idx > ps.length * ps.length) break;
    const { i, j, dist } = distances[idx];
    uf.union(i, j);
    prev = [i, j];
    // console.log("idx", idx, getCounts());
    idx++;
  }

  return prev.map((i) => ps[i][0]).reduce((prod, val) => prod * val, 1);
};

console.time("solve");
console.log(partTwo());
console.timeEnd("solve");
