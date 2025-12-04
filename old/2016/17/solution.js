const { input } = require("./input.js");
const crypto = require("crypto");

function getHash(str) {
  return crypto.createHash("md5").update(str).digest("hex");
}

// Ok the brackets in the regex are important when using -.. makes sense...
function getUDLR(hash) {
  return hash
    .slice(0, 4)
    .split("")
    .map((c) => (/[b-f]/.test(c) ? 1 : 0));
}

function getNeighbors(p, udlr) {
  // ordered as UDLR
  return [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ]
    .map((d, i) => ({ x: p.x + d[0], y: p.y + d[1], dir: "UDLR".charAt(i) }))
    .filter((_, i) => udlr[i])
    .filter((p) => p.x >= 0 && p.y >= 0 && p.x < 4 && p.y < 4);
}

const solution = () => {
  const test = "hijkl";
  const test2 = "ihgpwlah";
  const test3 = "kglvqrro";

  const seed = test3;

  const pos = { x: 0, y: 0 };
  const vault = { x: 3, y: 3 };

  const start = { pos: { ...pos }, path: "" };
  const queue = [start];

  while (queue.length) {
    const node = queue.shift();

    if (node.pos.x === vault.x && node.pos.y === vault.y) {
      console.log("WE DID IT!!!");
      return node;
    }
    // console.log("process", node);
    const hash = getHash(`${seed}${node.path}`);
    const udlr = getUDLR(hash);
    // console.log(udlr);
    const neighbors = getNeighbors(node.pos, udlr);
    neighbors.forEach((n) => {
      const newNode = {
        pos: n,
        path: `${node.path}${n.dir}`,
      };
      queue.push(newNode);
    });
    // return neighbors;
  }

  //   const h = hash(test);
  //   return getUDLR(h);
};

const solutionPartTwo = () => {
  const test = "ihgpwlah";
  const test2 = "kglvqrro";
  const test3 = "ulqzkmiv";

  let max = 0;

  const seed = input;

  const pos = { x: 0, y: 0 };
  const vault = { x: 3, y: 3 };

  const start = { pos: { ...pos }, path: "" };
  const queue = [start];

  while (queue.length) {
    const node = queue.shift();

    if (node.pos.x === vault.x && node.pos.y === vault.y) {
      //   console.log("Got one", node.path.length);
      max = Math.max(max, node.path.length);
      //   return node;
      continue;
    }
    // console.log("process", node);
    const hash = getHash(`${seed}${node.path}`);
    const udlr = getUDLR(hash);
    // console.log(udlr);
    const neighbors = getNeighbors(node.pos, udlr);
    neighbors.forEach((n) => {
      const newNode = {
        pos: n,
        path: `${node.path}${n.dir}`,
      };
      queue.push(newNode);
    });
    // return neighbors;
  }

  return max;
};

console.time("solve");
console.log(solutionPartTwo());
console.timeEnd("solve");
