const { input } = require("./input.js");

const ex = `0:
###
##.
##.

1:
###
##.
.##

2:
.##
###
##.

3:
##.
###
##.

4:
###
#..
###

5:
###
.#.
###

4x4: 0 0 0 0 2 0
12x5: 1 0 1 0 2 2
12x5: 1 0 1 0 3 2`;

function count(str, char) {
  let c = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === char) c++;
  }
  return c;
}

const solution = () => {
  const parsed = input.split("\n\n").map((gp) => gp.split("\n"));
  const grps = parsed.slice(0, -1).map((line) => line.slice(1));
  const last = parsed.at(-1).map((item) => item.split(": "));

  const sizes = grps.map((grp) =>
    grp.reduce((sum, line) => sum + count(line, "#"), 0)
  );

  let candidates = 0;
  let culled = 0;

  last.forEach((room) => {
    const [dims, presents] = room;
    const area = dims
      .split("x")
      .map(Number)
      .reduce((prod, val) => prod * val, 1);
    const presentArea = presents
      .split(" ")
      .reduce((sum, num, i) => sum + num * sizes[i], 0);

    const amountSquares = 0;

    // What!? Insane that this works...
    // All of the "candidates" pass this one test, that is, they don't fail to work for this specific reason...
    // But that there would be no other reason for any to fail is..                              serendipitous lol

    // It would feel at least a little less dirty if we also had to check for "obvious successes"
    // i.e. cases where there are enough 3x3 subgrids in the main area to hold all presents.
    // Oh well lol

    if (area < presentArea) {
      culled++;
    } else {
      candidates++;
    }
    // console.log(dims, area, presentArea, area < presentArea);
  });

  return { sizes, last, culled, candidates };
};

console.time("solve");
console.log(solution());
console.timeEnd("solve");
