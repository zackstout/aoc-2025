const { input } = require("./input.js");
const { topologicalSort } = require("../algorithms/topologicalSort.js");

const ex = `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`;

const partOne = (begin = "you", goal = "out", data = "") => {
  const atlas = {};
  const lines = (data || input)
    .split("\n")
    .map((line) => line.split(": "))
    .map(([start, end]) => [start, end.split(" ")]);

  lines.forEach(([start, end]) => {
    atlas[start] = end;
  });

  //   return atlas;

  //   let total = 0;

  // NOTE: we initially solved this with "total" counter and without any memoization.
  // Was attempting to optimize for part two but we found a better way.
  function dfs(pos, memo = {}) {
    // if (memo.has(pos)) return;
    // memo.add(pos);

    if (memo[pos]) return memo[pos];

    if (pos === goal) {
      //   total++;
      //   console.log(total);
      return 1;
    }
    // console.log(pos, atlas[pos]);
    if (!atlas[pos]) return;

    let sum = 0;

    for (const n of atlas[pos]) {
      sum += dfs(n, memo);
    }

    memo[pos] = sum;
    return sum;
  }

  const sum = dfs(begin, 0);

  return sum;
};

const ex2 = `svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`;

const partTwo = () => {
  const graph = {};
  const lines = input
    .split("\n")
    .map((line) => line.split(": "))
    .map(([start, end]) => [start, end.split(" ")]);

  lines.forEach(([start, end]) => {
    graph[start] = end;
  });

  graph["out"] = [];

  // Takes about 20ms on real input
  const sorted = topologicalSort(graph);

  // Now, since they are sorted, we can use DP and ensure it will work
  // Wow this is blazingly fast
  function countPaths(start, end) {
    const ways = { ...graph };
    Object.keys(ways).forEach((key) => (ways[key] = 0));
    ways[start] = 1;
    for (const node of sorted) {
      for (const neighbor of graph[node]) {
        ways[neighbor] += ways[node];
      }
    }
    return ways[end];
  }

  const x1 = countPaths("svr", "fft");
  const x2 = countPaths("fft", "dac");
  const x3 = countPaths("dac", "out");

  const y1 = countPaths("svr", "dac");
  const y2 = countPaths("dac", "fft");
  const y3 = countPaths("fft", "out");

  return [Math.max(x1 * x2 * x3, y1 * y2 * y3), x1, x2, x3, y1, y2, y3];
};

console.time("solve");
console.log(partTwo());
console.timeEnd("solve");
