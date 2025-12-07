const { input } = require("./input.js");

const ex1 = `#########
#b.A.@.a#
#########`;

const ex2 = `########################
#f.D.E.e.C.b.A.@.a.B.c.#
######################.#
#d.....................#
########################`;

const solution = () => {
  const lines = input.split("\n").map((x) => x.trim());
  const grid = {};
  const start = { x: 0, y: 0 };

  let numKeys = 0;

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      const char = lines[y][x];
      grid[`${x},${y}`] = char;
      if (char === "@") {
        start.x = x;
        start.y = y;
        // Hide the "@"
        grid[`${x},${y}`] = ".";
      }
      if (char.match(/[a-z]/)) {
        numKeys++;
      }
    }
  }

  console.log(`${numKeys} total keys.`);

  // Given a position, and a current amount of collected keys, which new keys could you reach?
  function getTargets(position, collected) {
    const targets = [];
    const visited = new Set();
    // console.log("get targets", position, collected);

    function dfs(pos, steps = 0) {
      const key = `${pos.x},${pos.y}`;
      if (visited.has(key)) return;
      visited.add(key);

      // Have we found a new key?
      const char = grid[key];
      if (char.match(/[a-z]/) && !collected.has(char)) {
        targets.push({ ...pos, char, steps });
        return;
      }

      // UNLOCK doors if able:
      if (char.match(/[A-Z]/) && collected.has(char.toLowerCase())) {
        // Chillin, we can unlock this door
      } else if (char !== "." && !char.match(/[a-z]/)) {
        // Hit a wall or locked door:
        return;
      }

      [
        [0, 1],
        [1, 0],
        [-1, 0],
        [0, -1],
      ].forEach((d) => {
        const newPos = { x: pos.x + d[0], y: pos.y + d[1] };
        dfs(newPos, steps + 1);
      });
    }

    dfs(position, 0);

    return targets;
  }

  const collected = new Set();

  const queue = [{ position: start, collected: collected, steps: 0 }];

  const visited = new Set();

  let minAmt = Infinity;

  while (queue.length) {
    const { position, collected, steps } = queue.shift();

    // Ah..... I think we need to actually grab the MINIMUM STEP COUNT guy every time...
    // That part is guaranteed for us when each step costs 1..... but that isn't so here....

    // Ooooh yes this makes a huge difference, huzzah!
    const key = `${position.x},${position.y},${[...collected]
      .sort()
      .join("")},${steps}`;
    if (visited.has(key)) continue;
    visited.add(key);

    if (collected.size === numKeys) {
      // return steps;
      minAmt = Math.min(minAmt, steps);
    }

    console.log("Processing", collected.size, steps);
    const targets = getTargets(position, collected);
    // console.log("new targets", targets);
    targets.forEach((target) => {
      const { x, y, char, steps: newSteps } = target;
      const clonedSet = new Set(collected);
      clonedSet.add(char);
      queue.push({
        position: { x, y },
        collected: clonedSet,
        steps: steps + newSteps,
      });
    });
  }
  //   collected.add("a");
  //   return getTargets(start, collected);

  return minAmt;
};

console.time("solve");
console.log(solution());
console.timeEnd("solve");

/**
 * I wonder... some kind of recursive bfs...
 * So for every state... we bfs out and see how many keys we could reach... and those are now valid steps in larger bfs...
 * And in the "inner" bfs we'd need to go until we hit ALL, not just the first one..
 *
 * Oho yes.. it's working for the first two examples..!!
 * Looks like it might take too long on real input though.... woof 26 keys
 */

// 6028 too high... ok...
