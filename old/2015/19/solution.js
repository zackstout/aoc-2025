const { input } = require("./input.js");
const { bfs } = require("../../../algorithms/bfs.js");

const exRules = `e => H
e => O
H => HO
H => OH
O => HH`;

const exTarget = `HOHOHO`;

const ex = {
  rules: exRules,
  target: exTarget,
};

const solution = () => {
  const rules = input.rules.split("\n").map((line) => line.split(" => "));
  const inverseRules = {};
  rules.forEach((rule) => {
    const [before, after] = rule;
    inverseRules[after] = before;
  });

  //   return inverseRules;

  const start = `${input.target},0`;

  const isGoal = (str) => {
    const [val, steps] = str.split(",");
    return val === "e";
  };

  const sorted = Object.entries(inverseRules).sort((a, b) => {
    return b[0].length - a[0].length;
  });

  const getNeighbors = (str) => {
    const [val, steps] = str.split(",");
    console.log(val.length, steps);
    const neighbors = [];
    for (const [pattern, v] of sorted) {
      //   console.log(pattern, v);
      const re = new RegExp(pattern, "g");
      let match;

      while ((match = re.exec(val)) !== null) {
        const startIndex = match.index;
        const end = startIndex + pattern.length;
        const next = val.slice(0, startIndex) + v + val.slice(end);
        // console.log(startIndex, end, next);
        neighbors.push(`${next},${Number(steps) + 1}`);
      }
      //   //   console.log(val.match(re));
      //   const newStr = val.replace(re, v);
      //   //   console.log(newStr);
      //   if (re) neighbors.push(`${newStr},${Number(steps) + 1}`);
    }
    return neighbors;
  };

  //   return getNeighbors(start);

  const result = bfs(start, isGoal, getNeighbors);

  return result;
};

console.time("solve");
console.log(solution());
console.timeEnd("solve");
