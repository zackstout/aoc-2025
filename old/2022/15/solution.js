const {
  insertAndMergeIntervals,
} = require("../../../algorithms/mergeIntervals.js");

const test = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

const MAX_LIMIT = 4_000_000;

function manhatten(a, b) {
  const res = Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
  // if (a[0] == 2 && a[1] == 18) console.log(a, b, res);
  return res;
}

function getIntervalsSize(intervals) {
  let size = 0;
  for (const i of intervals) {
    size += i[1] - i[0] + 1;
  }
  return size;
}

function generateOverlaps(sensors, i) {
  let overlaps = [];

  Object.keys(sensors).forEach((key) => {
    const [x, y] = key.split(",").map(Number);
    const dist = sensors[key];
    // In this case, the sensor is too far away from our row to matter
    if (Math.abs(y - i) > dist) return;
    // const amtOverlap = 1 + 2 * (dist - Math.abs(y - i));
    // Ooooomg I wrote y-1 instead of y-i .... but now it's worse???
    const intervalSize = dist - Math.abs(y - i);
    const interval = [x - intervalSize, x + intervalSize];
    interval[0] = Math.max(interval[0], 0);
    interval[1] = Math.min(interval[1], MAX_LIMIT);
    overlaps = insertAndMergeIntervals(overlaps, interval);
  });

  return overlaps;
}

const solution = (isPartTwo = false) => {
  const { input } = require("./input.js");

  // Ok... finally got there hahaha
  // return 2936793 * MAX_LIMIT + 3442119;

  // MAKE SURE TO CAPTURE NEGATIVE NUMBERS, WHOOPS
  const lines = input
    .split("\n")
    .map((line) =>
      line
        .split(":")
        .map((part) => part.split(",").map((x) => +x.match(/[\d|-]+/)[0]))
    );

  //   lines.forEach((el) => console.log(el[0]));

  // Store distance from closest beacon for each sensor
  const sensors = {};

  lines.forEach((line) => {
    const [sensor, beacon] = line;
    sensors[sensor.join(",")] = manhatten(sensor, beacon);
  });

  let prevCount = 0;

  let isFirst = true;

  let resultRow = -1;

  for (let i = 0; i < MAX_LIMIT; i++) {
    // ROW BY ROW...
    const overlaps = generateOverlaps(sensors, i);
    const count = getIntervalsSize(overlaps);
    // console.log(i, overlaps, count);

    if (count !== prevCount) {
      if (!isFirst) {
        resultRow = i;
        break;
      }
      isFirst = false;
      // console.log("Different count!", count, prevCount, i);
    }
    prevCount = count;
  }

  // Now we have the result Row.... in our case 3442119... of course toward the end lol...
  const overlaps = generateOverlaps(sensors, resultRow);

  return overlaps;

  return resultRow;
  return sensors;
};

// Takes about a minute....fine lol
console.time("solve");
console.log(solution());
console.timeEnd("solve");

/**
 *
 * Ok... so for part one... I almost certainly brute forced.
 * For the single row, of 4million elements, I probably walked through it,
 * asking for each one, are you precluded by any of the 20-odd sensors that we have?
 * (That is, are you within the same distance of it that it is from its nearest beacon?)
 *
 * That obviously won't work now, that we have to find the ONE point that ISN'T covered by any sensor...
 *
 * Surely we have to track the intervals by their endpoints in some clever way...
 *
 * Going row by row might be a clue...find the one where the number differs from all others by one?
 *
 * Yes, I think we go row by row,
 *
 * And merge intervals in each row, for all the places where a sensor can intersect it.
 */

/**
 * Oooomg we missed negative numbers during parsing.... Ouch lol
 * Add the "|-" to the regex...
 */

/**
 * x = 2936793
 * y = 3442119
 *
 * So result is...
 */
