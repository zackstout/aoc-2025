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

const solution = () => {
  const lines = input.split("\n").filter((x) => x);

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

  dfs({ x: lines[0].indexOf("S"), y: 0 });

  return timesSplit;
};

console.time("solve");
console.log(solution());
console.timeEnd("solve");
