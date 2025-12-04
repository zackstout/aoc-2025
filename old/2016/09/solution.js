const { input } = require("./input.js");

const solution = () => {
  const t0 = "ADVENT";
  const t1 = "(3x3)XYZAA";
  const t2 = "X(8x2)(3x3)ABCY";
  const t3 = "(27x12)(20x12)(13x14)(7x10)(1x12)A";
  const t4 = "(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN";

  function getDecompressedLength(str) {
    console.log("decompress", str);
    const idx = str.indexOf("(");
    if (idx === -1) return str.length;

    const endIdx = str.indexOf(")");

    // repeat the next n1 characters n2 times
    const [n1, n2] = str
      .slice(idx + 1, endIdx)
      .split("x")
      .map(Number);
    // const target = str.slice(endIdx + 1, endIdx + 1 + n1);

    // console.log(n1, n2, target);

    // const endLength = str.slice(endIdx + n1 + 1).length;

    // OOOOH JUST DON'T DO THIS??? AMAZING!!!
    // if (!target.includes("(")) {
    //   return idx + n2 * target.length + endLength;
    // }

    return (
      idx +
      n2 * getDecompressedLength(str.slice(endIdx + 1, endIdx + 1 + n1)) +
      getDecompressedLength(str.slice(endIdx + n1 + 1))
    );
    // return target;
    // return [n1, n2];
  }

  return getDecompressedLength(input);
};

console.time("solve");
console.log(solution());
console.timeEnd("solve");

// Aughhhh so close.. but then t4 trips us up.... should be like double the amount we got....
