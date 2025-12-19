const { input } = require("./input.js");

const ex = `px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}`;

const solution = () => {
  const lines = input.split("\n").map((line) => {
    const idx = line.indexOf("{");
    return {
      val: line.slice(0, idx),
      out: line
        .slice(idx + 1, -1)
        .split(",")
        .map((n) => {
          if (n.includes(":")) {
            return {
              cond: n.split(":")[0],
              val: n.split(":")[1],
            };
          } else {
            return {
              val: n,
            };
          }
        }),
    };
  });

  const nodesMap = {};
  lines.forEach((line) => {
    const { val, out } = line;
    nodesMap[val] = out;
  });

  let R = 0;
  let A = 0;

  // Hmm.... can we guarantee that there is no "overlap" among sets that can reach A?
  // Then, we could just add up each size.... that seems like right approach...

  function getSize(conditions) {
    let constraints = {
      x: [1, 4000],
      m: [1, 4000],
      a: [1, 4000],
      s: [1, 4000],
    };
    conditions.forEach((condition) => {
      if (condition.includes("<=")) {
        let [l, v] = condition.split("<=");
        constraints[l][1] = Math.min(constraints[l][1], Number(v));
        return;
      }
      if (condition.includes("<")) {
        let [l, v] = condition.split("<");
        constraints[l][1] = Math.min(constraints[l][1], Number(v) - 1);
        return;
      }
      if (condition.includes(">=")) {
        let [l, v] = condition.split(">=");
        constraints[l][0] = Math.max(constraints[l][0], Number(v));
        return;
      }
      if (condition.includes(">")) {
        let [l, v] = condition.split(">");
        constraints[l][0] = Math.max(constraints[l][0], Number(v) + 1);
        return;
      }
    });

    // The total number of accepted values is going to be the size of the X interval, times the size of the M interval, etc.
    return Object.values(constraints).reduce(
      (prod, arr) => prod * (arr[1] - arr[0] + 1),
      1
    );
  }

  let totalSize = 0;

  function dfs(node, conditions = []) {
    if (node === "R") {
      R++;
      return;
    }
    if (node === "A") {
      A++;
      console.log("Reached A", conditions);
      totalSize += getSize(conditions);
      return;
    }
    const tgts = nodesMap[node];
    const conds = [];
    // console.log(tgts);

    function invert(cond) {
      //   cond = cond.replace(">", "XXX");
      //   cond = cond.replace("<=", ">");
      //   cond = cond.replace("XXX", "<=");
      //   return `NOT${cond}`;

      if (cond.includes("<=")) return cond.replace("<=", ">");
      if (cond.includes("<")) return cond.replace("<", ">=");
      if (cond.includes(">=")) return cond.replace(">=", "<");
      if (cond.includes(">")) return cond.replace(">", "<=");
    }

    tgts.forEach((tgt) => {
      // Since this is an "if/else if" structure, we need to invert all previously accumulated conditions from this round
      const newConditions = [...conditions, ...conds.map(invert)];
      if (tgt.cond) {
        newConditions.push(tgt.cond);
      }
      dfs(tgt.val, newConditions);
      // Add to list of conditions to be inverted for future branches in this set
      if (tgt.cond) {
        conds.push(tgt.cond);
      }
    });
  }

  dfs("in");

  return { R, A, totalSize };

  //   return lines.map((l) => l.out);
};

console.time("solve");
console.log(solution());
console.timeEnd("solve");
