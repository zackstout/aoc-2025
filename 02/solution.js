const test = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`;

const solution = (isPartTwo = false) => {
  const { input } = require("./input.js");

  const lines = input
    .split(",")
    .map((line) => line.split("\n").filter((line) => line))
    .map((line) => line[0]);

  let invalid = 0;

  for (const line of lines) {
    const [start, end] = line.split("-").map(Number);

    for (let i = start; i <= end; i++) {
      // MATCHES A NUMBER THAT CONSISTS OF A SEQUENCE THAT IS REPEATED EXACTLY ONCE
      let regex = new RegExp(/^(\d+)\1{1}$/);

      if (isPartTwo) {
        // MATCHES A NUMBER THAT CONSISTS OF A SEQUENCE THAT IS REPEATED ANY NUMBER OF TIMES
        regex = new RegExp(/^(\d+)\1+$/);
      }
      const matches = i.toString().match(regex);
      if (matches) invalid += i;
    }
  }
  return invalid;
};

console.log(solution(true));
