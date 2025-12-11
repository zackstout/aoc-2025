const { input } = require("./input.js");

const ex = `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`;

const partOne = (begin = "you", goal = "out", data = "") => {
  const atlas = {};
  const lines = (data || input)
    .split("\n")
    .map((line) => line.split(": "))
    .map(([start, end]) => [start, end.split(" ")]);

  lines.forEach(([start, end]) => {
    atlas[start] = end;
  });

  //   return atlas;

  let total = 0;

  function dfs(pos, steps) {
    if (pos === goal) {
      total++;
      return;
    }
    // console.log(pos, atlas[pos]);
    if (!atlas[pos]) return;
    for (const n of atlas[pos]) {
      dfs(n, steps + 1);
    }
  }

  dfs(begin, 0);

  return total;
};

const ex2 = `svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`;

const partTwo = () => {
  //   const atlas = {};
  //   const lines = input
  //     .split("\n")
  //     .map((line) => line.split(": "))
  //     .map(([start, end]) => [start, end.split(" ")]);

  //   lines.forEach(([start, end]) => {
  //     atlas[start] = end;
  //   });

  //   let total = 0;

  //   //   const visited = new Set();

  //   function dfs(pos, path, steps) {
  //     if (path.includes(pos)) return;
  //     const newPath = path ? `${path},${pos}` : pos;
  //     // if (visited.has(newPath)) return;
  //     // visited.add(newPath);
  //     // console.log(steps);
  //     if (pos === "out") {
  //       const p = new Set(newPath.split(","));
  //       if (p.has("dac") && p.has("fft")) total++;
  //       //   console.log(newPath);
  //       return;
  //     }
  //     for (const n of atlas[pos]) {
  //       // Very important to spread out path here
  //       dfs(n, newPath, steps + 1);
  //     }
  //   }

  //   dfs("svr", "", 0);

  //   return total;

  const x1 = partOne("svr", "dac", input);
  console.log(x1);
  const x2 = partOne("dac", "fft", input);
  console.log(x2);
  const x3 = partOne("fft", "out", input);
  console.log(x3);

  const y1 = partOne("svr", "fft", input);
  const y2 = partOne("fft", "dac", input);
  const y3 = partOne("dac", "out", input);

  return x1 * x2 * x3 + y1 * y2 * y3;
};

console.time("solve");
console.log(partTwo());
console.timeEnd("solve");
