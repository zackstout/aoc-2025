const { input } = require("./input.js");

const test = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

const solution = (isFirstPart) => {
  const lines = input.split("\n").map((l) => l.split(""));
  const maxX = lines[0].length;
  const maxY = lines.length;

  const getNeighbors = (p, g) => {
    return [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
      [1, 1],
      [-1, -1],
      [1, -1],
      [-1, 1],
    ]
      .map((d) => {
        return { x: p.x + d[0], y: p.y + d[1] };
      })
      .filter((p) => p.x >= 0 && p.y >= 0 && p.x < maxX && p.y < maxY)
      .map((p) => g[p.y][p.x]);
  };

  if (isFirstPart) {
    let total = 0;

    lines.forEach((line, y) => {
      line.forEach((cell, x) => {
        const neighbors = getNeighbors({ x, y }, lines);
        if (neighbors.filter((n) => n === "@").length < 4 && cell === "@") {
          // console.log(x, y);
          total++;
        }
      });
    });

    //   return maxX * maxY;

    return total;
  }

  function advance(grid) {
    const newGrid = [...grid.map((l) => [...l])];

    // console.log("ADVANCE", grid);

    let totalCulled = 0;

    grid.forEach((line, y) => {
      line.forEach((cell, x) => {
        const neighbors = getNeighbors({ x, y }, grid);
        if (neighbors.filter((n) => n === "@").length < 4 && cell === "@") {
          //   console.log(x, y);
          //   total++;
          totalCulled++;
          newGrid[y][x] = ".";
        }
      });
    });

    // console.log("advanced and culled", totalCulled);

    return { grid: newGrid, culled: totalCulled };
  }

  let grid = lines;

  let timesAdvanced = 0;

  let totalCulled = 0;

  while (true) {
    const data = advance(grid);
    grid = data.grid;
    totalCulled += data.culled;
    if (data.culled === 0) {
      break;
    }
    timesAdvanced++;
  }

  return { timesAdvanced, totalCulled };
};

console.time("solve");
console.log(solution(false));
console.timeEnd("solve");
