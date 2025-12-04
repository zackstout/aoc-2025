const { input } = require("./input.js");

const test = `     |          
     |  +--+    
     A  |  C    
 F---|--|-E---+ 
     |  |  |  D 
     +B-+  +--+ 
`;

const solution = () => {
  const lines = input.split("\n").filter((x) => x);
  //   return lines.map((l) => l.length);
  const startX = lines[0].indexOf("|");
  let pos = { x: startX, y: 0 };
  let dir = "D";
  const DIRS = {
    D: [0, 1],
    U: [0, -1],
    R: [1, 0],
    L: [-1, 0],
  };

  function move(p, d) {
    return { x: p.x + DIRS[d][0], y: p.y + DIRS[d][1] };
  }

  function turn() {
    if ("DU".includes(dir)) {
      const right = move(pos, "R");
      if (lines[right.y][right.x].match(/\S/)) return { pos: right, dir: "R" };
      const left = move(pos, "L");
      return { pos: left, dir: "L" };
    } else {
      const up = move(pos, "U");
      if (lines[up.y][up.x].match(/\S/)) return { pos: up, dir: "U" };
      const down = move(pos, "D");
      return { pos: down, dir: "D" };
    }
  }

  let steps = 0;
  while (true) {
    const char = lines[pos.y][pos.x];

    // Ahhh of course, also need to test against non-space here....
    // And then that messes up the final minus one. Ok. got it.
    if (!char.match(/\S/)) {
      break;
    }
    // console.log("char", char, pos.x, pos.y);

    if (char.match(/[A-Z]/)) {
      console.log("GOT LETTER", char);
    }

    let newPos = pos;

    if (char === "+") {
      const d = turn();
      newPos = d.pos;
      dir = d.dir;
    } else {
      newPos = { x: pos.x + DIRS[dir][0], y: pos.y + DIRS[dir][1] };
    }

    pos = newPos;

    steps++;
    // console.log("new pos", newPos);
  }

  return steps;
};

console.time("solve");
console.log(solution());
console.timeEnd("solve");

// 16394 too high...
// 16311 is too low.... ugh
// Yessss finally got there. 16312. Woot.
