const { input } = require("./input.js");
const { bfs } = require("../algorithms/bfs.js");

const ex = `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`;

const partOne = () => {
  const lines = input.split("\n").map((line) => {
    const first = line.indexOf(" ");
    const last = line.lastIndexOf(" ");
    return [
      line.slice(0 + 1, first - 1),
      line
        .slice(first + 1, last)
        .split(" ")
        .map((x) => new Set(x.match(/\d+/g).map(Number))),
      line.slice(last + 1),
    ];
  });

  // Rule is set of nums, line is string
  function applyRule(rule, line) {
    let newLine = "";
    for (let i = 0; i < line.length; i++) {
      if (rule.has(i)) {
        newLine += line.charAt(i) === "." ? "#" : ".";
      } else {
        newLine += line.charAt(i);
      }
    }
    return newLine;
  }

  let sum = 0;

  lines.forEach((line, idx) => {
    // if (idx > 0) return;

    const [goal, rules, _] = line;

    let start = "";
    for (let i = 0; i < goal.length; i++) {
      start += ".";
    }
    start += ",0";

    const isGoal = (line) => line.split(",")[0] === goal;
    const getNeighbors = (data) => {
      const [line, steps] = data.split(",");
      const lines = [];
      for (const rule of rules) {
        lines.push(applyRule(rule, line) + `,${Number(steps) + 1}`);
      }
      return lines;
    };
    const result = bfs(start, isGoal, getNeighbors);
    // console.log("Result", result);
    sum += Number(result.split(",")[1]);
  });

  return sum;
};

// =======================================================

const partTwo = () => {
  const lines = input.split("\n").map((line) => {
    const first = line.indexOf(" ");
    const last = line.lastIndexOf(" ");
    return [
      line.slice(0 + 1, first - 1),
      line
        .slice(first + 1, last)
        .split(" ")
        .map((x) => new Set(x.match(/\d+/g).map(Number))),
      line.slice(last + 2, -1),
    ];
  });

  //   return lines[0];

  //   return applyRule([1, 2], [0, 0, 0, 0]);

  // Rule is set of nums, line is array of nums
  function applyRule(rule, line) {
    const newLine = [...line];
    for (const i of [...rule]) {
      newLine[i] += 1;
    }
    return newLine;
  }

  let sum = 0;

  lines.forEach((line, idx) => {
    // if (idx > 0) return;

    const [goal, rules, joltage] = line;

    const start = [];
    for (let i = 0; i < goal.length; i++) {
      start.push(0);
    }

    const isGoal = (line) => line.split(";")[0] === joltage;
    const getNeighbors = (line) => {
      const [valsStr, steps] = line.split(";");
      console.log("get neighs", valsStr, steps);
      const lines = [];
      const vals = valsStr.split(",").map(Number);
      for (const rule of rules) {
        lines.push(
          [applyRule(rule, vals).join(","), Number(steps) + 1].join(";")
        );
      }
      return lines;
    };
    const result = bfs(`${start.join(",")};0`, isGoal, getNeighbors);
    console.log("Result", result, Number(result.split(";")[1]));
    sum += Number(result.split(";")[1]);
  });

  return sum;
};

console.time("solve");
console.log("Solution:", partTwo());
console.timeEnd("solve");

/**
 * It is fairly annoying we need to roll everything up into a string to get memoization to work...
 * We should fix that.
 *
 * Also, duh, of course part two isn't going to be brute-forced with BFS... never going to get there.
 *
 * Ah, and a different approach to part one could use permutations of {0,1}, since pushing a button twice is never sensible:
 * each button is only pushed 1 or 0 times in a correct solution.
 * Start with all 1-press combos, then 2-press, etc. Would allow us to exploit bitwise operations.
 */
