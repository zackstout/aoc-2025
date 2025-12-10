const { input } = require("./input.js");

const ex = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3
`;

const solution = () => {
  const pts = input
    .split("\n")
    .filter((x) => x)
    .map((line) => line.split(",").map(Number));

  let maxArea = 0;
  for (i = 0; i < pts.length - 1; i++) {
    for (j = i + 1; j < pts.length; j++) {
      const p1 = pts[i];
      const p2 = pts[j];
      const w = Math.abs(p1[0] - p2[0] + 1);
      const h = Math.abs(p1[1] - p2[1] + 1);
      const area = w * h;
      maxArea = Math.max(maxArea, area);
      //   console.log(area, p1, p2);
    }
  }
  return maxArea;
};

console.time("solve");
console.log(solution());
console.timeEnd("solve");
