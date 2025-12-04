const { bfs } = require("../../../algorithms/bfs.js");
const { kruskalMST } = require("../../../algorithms/spanningTree.js");
const { getPermutations } = require("../../../algorithms/permutations.js");
const { input } = require("./input.js");

const example = `###########
#0.1.....2#
#.#######.#
#4.......3#
###########`;

const solution = (isPartTwo = false) => {
  const grid = input.split("\n");

  function getPosition(n) {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === n) return { x, y };
      }
    }
  }

  function findNums() {
    const nums = [];
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x].match(/\d/)) nums.push(grid[y][x]);
      }
    }
    return nums;
  }

  const maxX = grid[0].length;
  const maxY = grid.length;

  //   return getPosition("1");

  function minPath(p1, p2) {
    const isGoal = (node) => {
      const [x, y] = node.split(",").map(Number);
      return x === p2.x && y === p2.y;
      //   return node === `${p2.x},${p2.y}`;
    };

    const getNeighbors = (node) => {
      const [x, y, steps] = node.split(",").map(Number);
      return [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
        // [1, 1],
        // [-1, -1],
        // [1, -1],
        // [-1, 1],
      ]
        .map((d) => {
          return { x: x + d[0], y: y + d[1] };
        })
        .filter((p) => p.x >= 0 && p.y >= 0 && p.x < maxX && p.y < maxY)
        .filter((p) => grid[p.y][p.x] !== "#")
        .map((p) => `${p.x},${p.y},${steps + 1}`);
    };
    const solve = bfs(`${p1.x},${p1.y},0`, isGoal, getNeighbors);
    const numSteps = solve.split(",")[2];
    return numSteps;
  }

  //   const start = getPosition("0");
  //   const end = getPosition("1");
  //   return minPath(start, end);

  /**
   * Set up the distance graph with a number of calls to BFS.
   */

  const numsInGrid = findNums();
  const distanceGraph = {};
  numsInGrid.forEach((n) => {
    const o = {};
    numsInGrid.forEach((nn) => {
      if (n !== nn) o[nn] = 0;
    });
    distanceGraph[n] = o;
  });

  console.log("nums", numsInGrid);

  for (let i = 0; i < numsInGrid.length - 1; i++) {
    for (let j = i + 1; j < numsInGrid.length; j++) {
      const n1 = numsInGrid[i];
      const n2 = numsInGrid[j];
      const start = getPosition(n1);
      const end = getPosition(n2);
      const dist = minPath(start, end);
      //   console.log(
      //     `Distance from ${n1} to ${n2} is ${dist}`
      //   );
      distanceGraph[n1][n2] = +dist;
      distanceGraph[n2][n1] = +dist;
    }
  }

  /**
   * Finally we are prepared to find the Minimal Spanning Tree.
   */

  //   const numNodes = numsInGrid.length;
  //   const edges = [];
  //   for (let i = 0; i < numsInGrid.length; i++) {
  //     for (let j = i + 1; j < numsInGrid.length; j++) {
  //       edges.push([i, j, distanceGraph[i][j]]);
  //     }
  //   }
  //   return kruskalMST(edges, numNodes);

  /**
   * Brute force the Hamiltonian path minimization.
   */

  // We always start at 0, so we only need to permute the rest of the nums.
  const perms = getPermutations(numsInGrid.length - 1);

  function getPathLength(perm) {
    let prev = "0";
    let idx = 0;
    let total = 0;
    while (idx < perm.length) {
      const next = perm[idx];
      const dist = distanceGraph[next][prev];
      total += dist;
      prev = next;
      idx++;
    }

    if (isPartTwo) {
      const finalDist = distanceGraph[prev]["0"];
      total += finalDist;
    }
    return total;
  }

  let bestLength = Infinity;

  for (const perm of perms) {
    const length = getPathLength(perm);
    bestLength = Math.min(length, bestLength);
  }

  //   return getPathLength(perms[0]);

  return bestLength;
};

console.time("solve");
console.log(solution(true));
console.timeEnd("solve");

/**
 * Ahh shoot it's not MST that we need.... because that is satisfied to connect 0 to 4, 0 to 1, 1 to 2, and 2 to 3.
 *
 * But that's not the same as a path that lands on every square.... huh...
 * Because we need to traverse the edges.
 *
 * So what we want is the classic Traveling Salesman... which is NP-hard...
 *
 * If we don't require returning to start, it's Shortest Hamiltonian Path...
 *
 * But I guess the point is that since the number of nodes is so low you can just brute force it by checking every path...
 *
 * Maybe we just need one final BFS on this graph...?
 */
