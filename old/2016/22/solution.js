const { input } = require("./input.js");
const { bfs } = require("../../../algorithms/bfs.js");

const ex = `/dev/grid/node-x0-y0   10T    8T     2T   80%
/dev/grid/node-x0-y1   11T    6T     5T   54%
/dev/grid/node-x0-y2   32T   28T     4T   87%
/dev/grid/node-x1-y0    9T    7T     2T   77%
/dev/grid/node-x1-y1    8T    0T     8T    0%
/dev/grid/node-x1-y2   11T    7T     4T   63%
/dev/grid/node-x2-y0   10T    6T     4T   60%
/dev/grid/node-x2-y1    9T    8T     1T   88%
/dev/grid/node-x2-y2    9T    6T     3T   66%`;

const parse = (str) => {
  const lines = str.split("\n").map((line) => line.split(/\s+/));
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
  // console.log(maxX, maxY);

  return { nodes: data, nodeMap, maxX, maxY };
};

const solution = () => {
  const { nodeMap, nodes, maxX, maxY } = parse(ex);

  const key = Object.keys(nodeMap).find((key) => nodeMap[key].used === 0);
  const maxAllowed = nodeMap[key].available;

  Object.keys(nodeMap).forEach((key) => {
    const node = nodeMap[key];
    node.isWall = node.used > maxAllowed;
  });

  const start = `${key};0`;
  const goal = `${maxX},0`;

  // return { start, goal };

  const isGoal = (data) => {
    const [pt, steps] = data.split(";");
    return pt === goal;
  };
  const isStart = (data) => {
    const [pt, steps] = data.split(";");
    return pt === "0,0";
  };

  const getNeighbors = (data) => {
    const [pt, steps] = data.split(";");
    const [x, y] = pt.split(",").map(Number);
    // console.log("nbrs", x, y, steps);
    return (
      [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
      ]
        .map((d) => {
          return { x: x + d[0], y: y + d[1] };
        })
        // Oh wow need <= not < here.....
        .filter((p) => p.x >= 0 && p.y >= 0 && p.x <= maxX && p.y <= maxY)
        .filter((p) => !nodeMap[`${p.x},${p.y}`].isWall)
        .map((p) => `${p.x},${p.y};${Number(steps) + 1}`)
    );
  };
  const result = bfs(start, isGoal, getNeighbors);

  const res2 = bfs(`${goal};0`, isStart, getNeighbors);

  // return { result, res2 };

  return Number(result.split(";")[1]) + maxX + 3;
  // return nodeMap["0,2"];
};

// 106 is too low...so is 109. Ugh.
// I mean yeah we're hacking it... assuming num steps back to home is same always....
// The better way would probably be, do another bfs back from end to start, with this considered a wall....

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
