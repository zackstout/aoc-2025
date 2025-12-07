const { input } = require("./input.js");

const test = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

const partOne = () => {
  const lines = input
    .split("\n")
    .map((line) => line.trim())
    .map((line) => line.split(/\s/).filter((x) => x));

  let total = 0;

  for (let i = 0; i < lines[0].length; i++) {
    const arr = lines.map((line) => line[i]);
    // console.log("column", arr);
    const op = arr.at(-1);
    let res = 0;
    let nums = arr.slice(0, arr.length - 1);

    nums = nums.map(Number);
    res = nums.reduce(
      (acc, val) => (op === "+" ? acc + val : acc * val),
      op === "+" ? 0 : 1
    );

    total += res;
  }

  return total;
};

const partTwo = () => {
  const rawlines = input.split("\n");

  const lines = rawlines
    .map((line) => line.trim())
    .map((line) => line.split(/\s/).filter((x) => x));

  const maxLengths = [];
  const numColumns = lines[0].length;

  for (let i = 0; i < numColumns; i++) {
    const arr = lines.map((line) => line[i]);
    const nums = arr.slice(0, arr.length - 1);
    const maxLength = nums.sort((a, b) => b.length - a.length)[0].length;
    maxLengths.push(maxLength);
  }
  const columns = [];

  let idx = 0;

  // Grab the proper slice from rawline and then advance index by proper amount
  // Because "  23" has different meaning than " 23 " or "23  ".
  for (let i = 0; i < numColumns; i++) {
    let arr = rawlines.map((line) => line.slice(idx, idx + maxLengths[i]));
    idx += maxLengths[i] + 1;
    // console.log("arr", arr);
    // arr = arr.slice(0, arr.length - 1);
    // arr = arr.map((x) => x.replace(/\s/g, "0"));
    columns.push(arr);
  }

  return columns.reduce((acc, val) => {
    // Perform the operation
    const op = val.at(-1).trim();
    // console.log("op", op);
    const nums = val.slice(0, -1);
    const maxLength = nums[0].length;
    const realNums = [];

    for (let i = 0; i < maxLength; i++) {
      const n = nums.reduce(
        (acc, val) => acc + (val[i] === "0" ? "" : val[i]),
        ""
      );
      //   console.log(n);
      realNums.push(n);
    }

    // console.log("real nums", realNums);

    const result = realNums
      .map(Number)
      .reduce(
        (acc, val) => (op === "+" ? acc + val : acc * val),
        op === "+" ? 0 : 1
      );

    // console.log("result", result, op, op === "+", realNums.map(Number));

    return acc + result;
  }, 0);
};

console.time("solve");
console.log(partTwo());
console.timeEnd("solve");

/**
 * Oooh yeah now the whitespace matters for part two... so we can't trim at beginning...
 */
