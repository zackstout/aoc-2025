const test = `987654321111111
811111111111119
234234234234278
818181911112111`;

const partOne = () => {
  const { input } = require("./input.js");

  const lines = input.split("\n");

  let sum = 0;

  lines.forEach((line) => {
    const nums = line.split("");
    let max = 0;
    for (let i = 0; i < nums.length - 1; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        const n = Number(nums[i] + nums[j]);
        max = Math.max(n, max);
      }
    }
    sum += max;
    console.log("max", max);
  });

  return sum;
};

// console.time("solve");
// console.log(partOne());
// console.timeEnd("solve");

function findNextLargest(str, target) {
  if (target === 1) {
    return Math.max(...str.split("").map(Number)).toString();
  }
  // target can be 1-12
  // ignore the final {target-1} characters of the string; consider only those before that.
  let max = 0;
  for (let i = 0; i < str.length - (target - 1); i++) {
    max = Math.max(max, Number(str.charAt(i)));
  }
  const firstIdx = str.indexOf(max.toString());
  return max.toString() + findNextLargest(str.slice(firstIdx + 1), target - 1);
}

const partTwo = () => {
  const { input } = require("./input.js");

  const lines = input.split("\n");

  // return findNextLargest(lines[2], 2);

  let sum = 0;

  lines.forEach((line) => {
    const largest = findNextLargest(line, 12);
    sum += Number(largest);
  });

  // return lines[0].length;
  return sum;
};

console.log(partTwo());

/**
 * Ok... so we can start by examining first (100-12) digits and find max one.
 * We should always start with leftmost (first) instance, because it couldn't be improved by skipping it..
 * In fact we know that we could just take any instances of it right?
 *
 * Or can we just recurse then? After finding starting number, now we just need biggest 11-digit number from remaining...?
 */
