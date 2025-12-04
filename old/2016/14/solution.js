const { input } = require("./input.js");
const crypto = require("crypto");

function hash(str) {
  return crypto.createHash("md5").update(str).digest("hex");
}

// const cache = new Map();

// Huh, caching didn't really seem to help.... Yeah duh we're only ever computing each one a single time....
function stretchedHash(str) {
  //   if (cache.has(i)) return cache.get(i);
  //   let str = `${salt}${i}`;
  for (let n = 0; n < 2017; n++) {
    str = hash(str);
  }
  //   cache.set(i, str);
  return str;
}

const solution = () => {
  //   const salt = "abc";
  const salt = input;

  //   const inputString = salt + "0";
  //   const hash = crypto.createHash("md5").update(inputString).digest("hex");

  let int = 0;

  let keysFound = 0;

  const foundSet = {};

  let lastInt = 0;

  while (keysFound < 64) {
    const hashed = stretchedHashForIndex(salt, int);

    // Drop expired triples BEFORE using them
    Object.keys(foundSet).forEach((key) => {
      if (Number(key) < int - 1000) {
        delete foundSet[key];
      }
    });

    // Ahh ok slight issue because one finalizing check can validate many keys, going over the 64 limit, at once... sure

    // Check for key
    Object.keys(foundSet).forEach((key) => {
      const hexDigit = foundSet[key];
      // 1 + 4 repeats = 5 total
      //   const regex = new RegExp(`(${hexDigit})\\1{4}`);
      const regex = new RegExp(`${hexDigit}{5}`);
      if (hashed.match(regex)) {
        keysFound++;
        console.log("Key found!", keysFound, int, key);
        lastInt = key;

        // AHHH OF COURSE if we find two quintuplets within the 1000 range that match, we double count the key...
        delete foundSet[key]; // <-- important
      }
    });

    // Ahhh of course it has to be a HEXADECIMAL digit, not a decimal digit....
    // could also use (/([0-9a-f])\1\1/)
    const containsThree = hashed.match(/([\d|a-f])\1\1/);
    if (containsThree) {
      //   console.log("got three", containsThree);
      //   keysFound++;
      foundSet[int] = containsThree[1];
    }

    // console.log(int);

    int++;
  }

  return lastInt;

  //   return stretchedHash(inputString);
};

const solution2 = () => {
  const keys = [];
  let int = 0;
  const foundSet = {};
  const salt = input;

  while (true) {
    const hashed = stretchedHash(`${salt}${int}`);

    // 0) cleanup first
    Object.keys(foundSet).forEach((key) => {
      if (Number(key) < int - 1000) {
        delete foundSet[key];
      }
    });

    // 1) check for 5-in-a-row validating earlier triples
    Object.keys(foundSet).forEach((key) => {
      const hexDigit = foundSet[key];
      const regex = new RegExp(`${hexDigit}{5}`);

      if (regex.test(hashed)) {
        const keyIndex = Number(key);
        if (!keys.includes(keyIndex)) {
          keys.push(keyIndex);
          console.log(
            "Key found!",
            keys.length,
            "index:",
            keyIndex,
            "validated at:",
            int
          );
        }
        delete foundSet[key];
      }
    });

    // 2) look for first triple in this hash
    const containsThree = hashed.match(/([0-9a-f])\1\1/);
    if (containsThree) {
      foundSet[int] = containsThree[1];
    }

    // 3) see if we can safely stop
    if (keys.length >= 64) {
      const sorted = [...keys].sort((a, b) => a - b);
      const sixtyFourth = sorted[63];

      // if we've gone more than 1000 hashes past the 64th smallest index,
      // no new smaller key can appear
      if (int > sixtyFourth + 1000) {
        return sixtyFourth;
      }
    }

    int++;
  }
};

console.time("solve");
console.log(solution2());
console.timeEnd("solve");

// Huh.... 20932 is too high......
// and then 20035 is too low.... huh...
// and then 20316 is too low...

/**
 * We can’t just stop when keys.length === 64, because there might still be undiscovered keys with smaller indices (their validating hash hasn’t appeared yet).
 */
