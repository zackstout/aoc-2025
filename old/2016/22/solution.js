const { input } = require("./input.js");

const solution = () => {
  const lines = input.split("\n").map((line) => line.split(/\s+/));
  let maxX = 0;
  let maxY = 0;
  const data = lines.map((line) => {
    const xy = line[0].match(/\d+/g);
    // console.log(xy);
    const x = Number(xy[0]);
    const y = Number(xy[1]);
    maxX = Math.max(x, maxX);
    maxY = Math.max(y, maxY);
    return {
      x,
      y,
      used: Number(line[2].match(/\d+/g)[0]),
      available: Number(line[3].match(/\d+/g)[0]),
    };
  });

  const nodeMap = {};

  data.forEach((d) => {
    nodeMap[`${d.x},${d.y}`] = d;
  });

  let viableOptions = 0;

  console.log(maxX, maxY);

  console.log(nodeMap["33,0"]);

  for (const node of data) {
    const nbrs = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ]
      .map((d) => ({ x: node.x + d[0], y: node.y + d[1] }))
      .filter((pt) => pt.x >= 0 && pt.y >= 0 && pt.x <= maxX && pt.y <= maxY)
      .map((p) => nodeMap[`${p.x},${p.y}`])
      .filter((n) => {
        return node.available >= n.used && n.used >= 0;
      });

    if (nbrs.length && node.used) {
      console.log(node, "can dump into", nbrs);
      viableOptions += nbrs.length;
    }
  }

  return viableOptions;

  return data.slice(0, 5);
};

console.time("solve");
console.log(solution());
console.timeEnd("solve");

/**
 *
 * Hmm.. So there are only 4 possible moves initially, just like in the example...
 *
 * Can we take that at face value? So it's essentially a sliding block puzzle with one empty space, only, ever?
 *
 * And it gets swapped around.... And we can assume that is the only possible move, ever.
 *
 * So we can treat that empty space like the node that we care about...right?
 *
 * And that empty space.... needs to get to Goal... and then get to Start (without touching Goal).... Ok....
 *
 * So each state is just.... the empty space.... how much space is available... (??), and ...
 * how many steps for sure... and also whether it has reached goal, and whether there is a disallowed space (from reaching goal)... so those are the redundant...
 *
 *
 * Can you move partial amounts? Would that ever help? Seems like it could...?
 */
