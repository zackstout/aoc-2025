const { input } = require("./input.js");
const { MinPriorityQueue } = require("../../../algorithms/minPriorityQueue.js");

const ex = `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`;

// You can always turn either right or left, and if you haven't gone 3 steps in a direction, you can go straight.
function getNeighbors(r, c, dir, steps) {
  const goStraight = steps < 3;
  let nbrs = ["U", "D"].includes(dir) ? ["R", "L"] : ["U", "D"];
  nbrs = nbrs.map((d) => ({ dir: d, steps: 1 }));
  if (goStraight) nbrs.push({ dir, steps: steps + 1 });

  return nbrs.map((el) => {
    switch (el.dir) {
      case "D":
        return { ...el, r: r + 1, c: c, dir: el.dir };
      case "U":
        return { ...el, r: r - 1, c: c, dir: el.dir };
      case "R":
        return { ...el, r: r, c: c + 1, dir: el.dir };
      case "L":
        return { ...el, r: r, c: c - 1, dir: el.dir };
    }
  });
}

// Now you must move at least 4 blocks in a direction, and a max of 10.
function getNeighborsTwo(r, c, dir, steps) {
  const canTurn = steps > 3;
  const canStraight = steps < 10;
  let result = [];

  if (canTurn) {
    let nbrs = ["U", "D"].includes(dir) ? ["R", "L"] : ["U", "D"];
    nbrs = nbrs.map((d) => ({ dir: d, steps: 1 }));
    result = [...nbrs];
  }

  if (canStraight) result.push({ dir, steps: steps + 1 });

  return result.map((el) => {
    switch (el.dir) {
      case "D":
        return { ...el, r: r + 1, c: c, dir: el.dir };
      case "U":
        return { ...el, r: r - 1, c: c, dir: el.dir };
      case "R":
        return { ...el, r: r, c: c + 1, dir: el.dir };
      case "L":
        return { ...el, r: r, c: c - 1, dir: el.dir };
    }
  });
}

const solution = () => {
  const atlas = {};
  let R = 0;
  let C = 0;
  input.split("\n").forEach((line, r) => {
    line.split("").forEach((char, c) => {
      atlas[`${r},${c}`] = Number(char);
      R = Math.max(R, r);
      C = Math.max(C, c);
    });
  });

  const queue = new MinPriorityQueue();
  queue.enqueue({ r: 1, c: 0, dir: "D", steps: 1 }, 0);
  queue.enqueue({ r: 0, c: 1, dir: "R", steps: 1 }, 0);

  const visited = new Set();

  //   return { R, C };

  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    if (!node) break;

    const { element, priority: currentDist } = node;

    const { r, c, dir, steps } = element;

    // Ah I always forgot this lol
    const key = `${r},${c},${dir},${steps}`;
    if (visited.has(key)) continue;
    visited.add(key);

    // console.log({ r, c, dir, steps });

    if (r < 0 || c < 0 || r > R || c > C) continue;

    const cost = atlas[`${r},${c}`];

    if (r === R && c === C) {
      // All done
      return currentDist + cost;
    }
    const neighbors = getNeighborsTwo(r, c, dir, steps);
    neighbors.forEach((nbr) => {
      queue.enqueue(nbr, cost + currentDist);
    });
  }

  //   return atlas["0,0"];
};

// 1046 is too high for Part 1... Ah we got it, we just were counting the starting node twice, and not counting end node
console.time("solve");
console.log(solution());
console.timeEnd("solve");
