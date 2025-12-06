const { input } = require("./input.js");
const { merge } = require("../algorithms/mergeIntervals.js");

const test = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

const solution = (isPartTwo = false) => {
  let [ranges, ings] = input.split("\n\n").map((g) => g.split("\n"));
  ranges = ranges.map((r) => r.split("-").map(Number));

  if (!isPartTwo) {
    // Count how many ingredients are included in some range
    return ings.filter((x) => {
      return ranges.some((range) => {
        const [start, end] = range;
        const n = +x;
        return n >= start && n <= end;
      });
    }).length;
  }

  // Find the total size of the (merged) intervals
  const merged = merge(ranges);
  return merged.reduce((acc, range) => acc + range[1] - range[0] + 1, 0);
};

console.time("solve");
console.log(solution(true));
console.timeEnd("solve");
