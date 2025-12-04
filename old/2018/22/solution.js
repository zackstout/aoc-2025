const solution = () => {
  const test = {
    depth: 510,
    target: { x: 10, y: 10 },
  };

  const input = {
    depth: 11820,
    target: { x: 7, y: 782 },
  };

  const { depth, target } = input;

  const grid = [];
  for (let i = 0; i <= target.y; i++) {
    const row = [];
    for (let j = 0; j <= target.x; j++) {
      row.push(0);
    }
    grid.push(row);
  }

  function getLevel(v) {
    return (v + depth) % 20183;
  }

  for (let i = 0; i <= target.y; i++) {
    for (let j = 0; j <= target.x; j++) {
      // Compute the value of the cell
      let val = 0;
      if (i === 0 && j !== 0) {
        val = j * 16807;
      } else if (j === 0) {
        val = i * 48271;
      } else if (i === target.y && j === target.x) {
        val = 0;
      } else {
        const v1 = grid[i - 1][j];
        const v2 = grid[i][j - 1];
        val = getLevel(v1) * getLevel(v2);
      }
      grid[i][j] = val;
    }
  }

  function getRisk(v) {
    return getLevel(v) % 3;
  }

  function render(v) {
    if (getRisk(v) === 0) return "."; // rocky
    if (getRisk(v) === 1) return "="; // wet
    return "|"; // narrow
  }

  function parseRiskLevel() {
    let sum = 0;
    for (const row of grid) {
      let output = "";
      for (const cell of row) {
        sum += getRisk(cell);
        output += render(cell);
      }
      console.log(output);
    }
    return sum;
  }

  const sum = parseRiskLevel();

  return sum;

  return grid;
};

console.time("solve");
console.log(solution());
console.timeEnd("solve");
