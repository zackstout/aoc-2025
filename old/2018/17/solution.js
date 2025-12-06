const { input } = require("./input.js");

const test = `x=495, y=2..7
y=7, x=495..501
x=501, y=3..7
x=498, y=2..4
x=506, y=1..2
x=498, y=10..13
x=504, y=10..13
y=13, x=498..504`;

const solution = () => {
  const atlas = new Set();

  let minX = Infinity;
  let minY = Infinity;
  let maxX = 0;
  let maxY = 0;

  // Parse input into atlas set that tracks where all obstacles are
  test.split("\n").map((line) => {
    const [lone, start, end] = line.match(/\d+/g).map(Number);
    const first = line.charAt(0);
    const last = first === "x" ? "y" : "x";

    for (let i = start; i <= end; i++) {
      const pt = {};
      pt[first] = lone;
      pt[last] = i;
      atlas.add(`${pt.x},${pt.y}`);
      minX = Math.min(pt.x, minX);
      minY = Math.min(pt.y, minY);
      maxX = Math.max(pt.x, maxX);
      maxY = Math.max(pt.y, maxY);
    }
  });

  // Phew, just feel stuck again...
  // Maybe some kind of... row by row iteration? On completion we count how many were filled and add them to obstacles atlas...?

  return { minX, minY, maxX, maxY };
};

console.time("solve");
console.log(solution());
console.timeEnd("solve");
