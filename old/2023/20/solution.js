const { input } = require("./input.js");

const ex = `broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`;

const ex2 = `broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`;

const solution = () => {
  const nodes = input
    .split("\n")
    .map((line) => line.split(" -> "))
    .map(([start, end]) => {
      let type = "bc";
      let val = start;
      if (start.startsWith("%")) {
        type = "%";
        val = start.slice(1);
      }
      if (start.startsWith("&")) {
        type = "&";
        val = start.slice(1);
      }

      return {
        type: type,
        val: val,
        out: end.split(", "),
      };
    });

  const nodeMap = {};

  nodes.forEach((node) => {
    if (node.type === "&") {
      // Gather up all inputs for this node
      const mem = {};
      nodes.forEach((node2) => {
        if (node2.out.includes(node.val)) {
          mem[node2.val] = 0;
        }
      });
      node.mem = mem;
    }

    if (node.type === "%") {
      node.on = false;
    }

    nodeMap[node.val] = node;
  });

  // ======================================================================

  let buttonPresses = 0;
  let low = 0;
  let high = 0;

  //   return nodeMap;

  // Part one is: while (buttonPresses < 1000) {...}
  // Hmm..... apparently simulating part 2 is not going to work....
  // Ah of course, we will need to multiply the lengths of all cycles that lead into the "rx" module...
  // Or, rather, get their LCM..

  // "lx" is name of node that outputs to "rx"
  const desired = { ...nodeMap["lx"].mem };

  outer: while (true) {
    const queue = [{ val: 0, target: "broadcaster", from: "button" }];

    // This will break whenever we reach the "end".
    // The "end" will require pushing the button again.
    while (queue.length > 0) {
      const { val, target, from } = queue.shift();
      if (val === 0) {
        if (target === "rx") {
          break outer;
        }
        low++;
      } else {
        if (Object.keys(desired).includes(from)) {
          desired[from] = buttonPresses;
          console.log("Updating desired", desired, from);
          if (Object.values(desired).every((v) => v > 0)) {
            break outer;
          }
        }
        high++;
      }
      //   console.log("processing", target);
      const tgt = nodeMap[target];
      if (!tgt) {
        // console.log("Whoops");
        continue;
      }
      switch (tgt.type) {
        case "bc":
          tgt.out.forEach((n) => {
            queue.push({ val: val, target: n, from: tgt.val });
          });
          break;
        case "%":
          if (val === 0) {
            tgt.on = !tgt.on;
            tgt.out.forEach((n) => {
              queue.push({ val: tgt.on ? 1 : 0, target: n, from: tgt.val });
            });
          }
          break;
        case "&":
          tgt.mem[from] = val;
          const allOn = Object.values(tgt.mem).every((val) => val === 1);
          const v = allOn ? 0 : 1;
          tgt.out.forEach((n) => {
            queue.push({ val: v, target: n, from: tgt.val });
          });
          break;
      }
    }

    buttonPresses++;
  }

  // Hmm 1017574192140 is too low...
  // Aha! Needed to add one to each cycle length, nice.

  return Object.values(desired).reduce((x, val) => lcm(x, val + 1), 1);
  return { low, high, buttonPresses };
};

function gcd(a, b) {
  return !b ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

// const cl = 149319 - 145586;
// const rp = 147275 - 143184;
// const lb = 140795 - 136884;
// const nj = 147347 - 143254;

// console.log(cl, rp, lb, nj);

console.time("solve");
console.log(solution());
console.timeEnd("solve");
