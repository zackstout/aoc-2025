const { input } = require("./input.js");

const test = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

const solution = () => {
  const lines = input
    .split("\n")
    .map((line) => line.trim())
    .map((line) => line.split(/\s/).filter((x) => x));

  let total = 0;

  function leftPad(str, val, target) {
    let s = str;

    while (s.length < target) {
      s = val + s;
    }
    return s;
  }

  for (let i = 0; i < lines[0].length; i++) {
    const arr = lines.map((line) => line[i]);
    // console.log("column", arr);
    const op = arr.at(-1);
    let res = 0;
    let nums = arr.slice(0, arr.length - 1);

    if (!isPartTwo) {
      nums = nums.map(Number);
      res = nums.reduce(
        (acc, val) => (op === "+" ? acc + val : acc * val),
        op === "+" ? 0 : 1
      );
    } else {
      // Vertical columns of numbers..
      const maxLength = nums.sort((a, b) => b.length - a.length)[0].length;
      console.log(maxLength);
      //   nums = nums.map((n) => leftPad(n, "0", maxLength));
      const realNums = [];
      //   for (let i = 0; i < maxLength; i++) {
      //     const n = nums.reduce(
      //       (acc, val) => acc + (val[i] === "0" ? "" : val[i]),
      //       ""
      //     );
      //     console.log(n);
      //   }
    }

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
  for (let i = 0; i < lines[0].length; i++) {
    const arr = lines.map((line) => line[i]);
    const nums = arr.slice(0, arr.length - 1);
    const maxLength = nums.sort((a, b) => b.length - a.length)[0].length;
    maxLengths.push(maxLength);
  }
  const columns = [];

  const numColumns = lines[0].length;

  //   let idx = 0;

  let idx = 0;

  for (let i = 0; i < lines[0].length; i++) {
    // let idx = 0;
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
