const test = `R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`;

const partOne = () => {
  const lines = test
    .split("\n")
    .map((x) => x.split(" ")[2])
    .map((code) => code.slice(2, 8))
    .map((code) => [parseInt(code.slice(0, 5), 16), code.charAt(5)]);

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  let pos = { x: 0, y: 0 };

  lines.forEach((line) => {
    if (line[1] === "0") pos.x += line[0];
    if (line[1] === "1") pos.y += line[0];
    if (line[1] === "2") pos.x -= line[0];
    if (line[1] === "3") pos.y -= line[0];

    console.log(pos);

    minX = Math.min(minX, pos.x);
    minY = Math.min(minY, pos.y);
    maxX = Math.max(maxX, pos.x);
    maxY = Math.max(maxY, pos.y);
  });

  return { minX, minY, maxX, maxY };
};

console.log(partOne());
