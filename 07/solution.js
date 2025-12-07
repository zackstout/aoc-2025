const { input } = require("./input.js");

const ex = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............
`;

const partOne = () => {
  const lines = test.split("\n").filter((x) => x);

  let timesSplit = 0;
  const maxX = lines[0].length;
  const maxY = lines.length;

  const visited = new Set();

  function dfs(pos) {
    const { x, y } = pos;
    if (x < 0 || y < 0 || x >= maxX || y >= maxY) return;
    const key = `${x},${y}`;
    if (visited.has(key)) return;
    visited.add(key);
    const char = lines[y][x];
    if (char === "^") {
      dfs({ x: pos.x + 1, y: pos.y });
      dfs({ x: pos.x - 1, y: pos.y });
      timesSplit++;
    } else {
      dfs({ x: pos.x, y: pos.y + 1 });
    }
  }

  dfs({ x: lines[0].indexOf("S"), y: 0 }, 1);

  return timesSplit;
};

/**
 * Feels like an iterative approach makes sense.
 * Go through line by line, where each line is represented as numbers of active paths at each point, like [0,...0, 1, 0, ... 0] for start.
 */
const partTwo = () => {
  const lines = input.split("\n").filter((x) => x);
  const maxX = lines[0].length;
  const maxY = lines.length;

  let activeLine = lines[0].split("").map((s) => (s === "S" ? 1 : 0));
  let idx = 0;
  while (idx < maxY - 1) {
    const newLine = [...activeLine];
    const nextLine = lines[idx + 1];

    console.log(newLine, nextLine);
    for (let i = 0; i < maxX; i++) {
      if (nextLine[i] === "^") {
        if (i + 1 < maxX) newLine[i + 1] += newLine[i];
        if (i - 1 >= 0) newLine[i - 1] += newLine[i];

        // Do we clear it??

        newLine[i] = 0;
      }
    }

    activeLine = newLine;

    idx++;
  }
  return activeLine.reduce((acc, val) => acc + val, 0);

  dfs({ x: lines[0].indexOf("S"), y: 0 }, 1);

  return timesSplit;
};

console.time("solve");
console.log(partTwo());
console.timeEnd("solve");
