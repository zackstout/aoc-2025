const test = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

const partOne = () => {
  const { input } = require("./input.js");

  const d = input.split("\n").map((line) => [line.charAt(0), +line.slice(1)]);
  let pos = 50;
  let numZeroes = 0;
  for (const [dir, n] of d) {
    // console.log(dir, n);

    pos = (pos + (dir === "L" ? -1 : 1) * n + 100) % 100;
    if (pos === 0) numZeroes++;
  }
  return numZeroes;
};

// console.log(partOne());

const partTwo = () => {
  const { input } = require("./input.js");

  const d = input.split("\n").map((line) => [line.charAt(0), +line.slice(1)]);
  let pos = 50;
  let numZeroes = 0;
  for (const [dir, n] of d) {
    const one = dir === "L" ? -1 : 1;
    for (let i = 0; i < n; i++) {
      pos = (pos + one + 100) % 100;
      if (pos === 0) numZeroes++;
    }
  }
  return numZeroes;
};

console.log(partTwo());
