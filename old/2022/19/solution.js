const test = `Blueprint 1:
  Each ore robot costs 4 ore.
  Each clay robot costs 2 ore.
  Each obsidian robot costs 3 ore and 14 clay.
  Each geode robot costs 2 ore and 7 obsidian.

Blueprint 2:
  Each ore robot costs 2 ore.
  Each clay robot costs 3 ore.
  Each obsidian robot costs 3 ore and 8 clay.
  Each geode robot costs 3 ore and 12 obsidian.`;

// Return all permutations of 0 and 1 of length x
function perms(x) {
  let res = [];

  function bt(a) {
    // console.log("bt", a);
    if (a.length === x) {
      // Not sure why we have to slice here.... oh well!
      res.push(a.slice(0));
      return;
    }
    [0, 1].forEach((n) => {
      a.push(n);
      bt(a);
      a.pop();
    });
  }

  bt([]);

  return res;
}

const INITIAL_RESOURCES = {
  ore: 0,
  clay: 0,
  obsidian: 0,
  geodes: 0,
};

function advanceResources(resources, robots) {
  const newResources = { ...resources };
  Object.keys(robots).forEach((bot) => {
    newResources[bot] += robots[bot];
  });
  return newResources;
}

// Use this to map the ordering from the input text
const order = ["ore", "clay", "obsidian", "geodes"];

function parseBp(bp) {
  const costs = {
    ore: { ...INITIAL_RESOURCES },
    clay: { ...INITIAL_RESOURCES },
    obsidian: { ...INITIAL_RESOURCES },
    geodes: { ...INITIAL_RESOURCES },
  };

  bp.forEach((robot, robotIdx) => {
    // robot looks like ["2 ore", "7 clay"]
    robot.forEach((cost) => {
      const [n, ing] = cost.split(" ");
      const o = order[robotIdx];
      costs[o][ing] = +n;
    });
  });
  return costs;
}

// const solution_old = () => {
//   // blueprints are now array of ingredients for, in order:
//   // ore robot, clay robot, obsidian robot, geode robot.
//   // ingredients look like "4 ore", "14 clay", etc.

//   // AHA, YES, NEED /G GLOBAL MODIFIER TO CATCH MULTIPLES
//   const bps = test.split("\n\n").map((bp) =>
//     bp
//       .split("\n")
//       .slice(1)
//       .map((part) => part.match(/\d+\s\w+/g))
//   );

//   const INITIAL_ROBOTS = {
//     ore: 1,
//     clay: 0,
//     obsidian: 0,
//     geodes: 0,
//   };

//   // Get rid of case with all 0s
//   // Wait... maybe we need that? In case we can't build anything lol
//   // And to cover case of building nothing
//   // This should let us check each valid configuration of buying at the "SHOP"
//   const ROBOTS_CONFIG = perms(4);
//   //   .filter((x) => x.some((y) => y));

//   //   return perms(3);

//   const BLUEPRINT = parseBp(bps[0]);

//   let states = [
//     { resources: { ...INITIAL_RESOURCES }, robots: { ...INITIAL_ROBOTS } },
//   ];

//   let ticks = 0;

//   //   return BLUEPRINT;

//   while (ticks < 24) {
//     const newStates = [];

//     // Add new possible states to newStates, for each state
//     states.forEach((state) => {
//       ROBOTS_CONFIG.forEach((config) => {
//         const costs = { ...INITIAL_RESOURCES };

//         // Compute the cost for this config (e.g. buying 1 geode robot, and 1 ore robot)
//         [0, 1, 2, 3].forEach((n) => {
//           if (config[n]) {
//             const ingredient = order[n];
//             // BLUEPRINT[ingredient] looks like { ore: 0, clay: 2, ... }
//             Object.keys(BLUEPRINT[ingredient]).forEach((key) => {
//               costs[key] += BLUEPRINT[ingredient][key];
//             });
//           }
//         });

//         // Now, check if we have resources to cover the cost
//         let canBuy = true;
//         Object.keys(costs).forEach((key) => {
//           if (state.resources[key] < costs[key]) {
//             canBuy = false;
//           }
//         });
//         if (canBuy) {
//           // Ok, create a new state! And push to newStates
//           //   console.log("can buy", costs);
//           const newResources = { ...state.resources };
//           Object.keys(costs).forEach((key) => {
//             newResources[key] -= costs[key];
//           });
//           const newRobots = { ...state.robots };
//           const bots = order.filter((_, i) => config[i] === 1);
//           bots.forEach((b) => (newRobots[b] += 1));

//           const updatedResources = advanceResources(newResources, state.robots);

//           newStates.push({ resources: updatedResources, robots: newRobots });
//         }
//       });

//       // Update resources for this state (produce from robots)
//       //   Object.keys(state.robots).forEach((bot) => {
//       //     state.resources[bot] += state.robots[bot];
//       //   });
//     });

//     states = newStates;

//     ticks++;
//   }

//   return states.sort((a, b) => a.resources.geodes - b.resources.geodes).at(-1);
//   return parseBp(bps[0]);
//   return bps;
// };

// ===========================

const solution = () => {
  const bps = test.split("\n\n").map((bp) =>
    bp
      .split("\n")
      .slice(1)
      .map((part) => part.match(/\d+\s\w+/g))
  );

  const INITIAL_ROBOTS = {
    ore: 1,
    clay: 0,
    obsidian: 0,
    geodes: 0,
  };

  const ROBOTS_CONFIG = perms(4);

  const BLUEPRINT = parseBp(bps[0]);

  let state = {
    resources: { ...INITIAL_RESOURCES },
    robots: { ...INITIAL_ROBOTS },
  };

  let ticks = 0;

  function advanceState() {
    // Copy old state's robots
    const old_bots = { ...state.robots };

    // Then build new robots
    function build(bot) {
      const bots = { ...state.robots };
      const resources = { ...state.resources };

      const costs = { ...INITIAL_RESOURCES };
      Object.keys(BLUEPRINT[bot]).forEach((key) => {
        costs[key] += BLUEPRINT[bot][key];
      });
      //   console.log("costs", costs, "resources", resources);
      const canBuy = Object.keys(resources).every((key) => {
        // Lol.... forgot the return...
        return resources[key] >= costs[key];
      });
      if (canBuy) {
        // console.log("BOUGHT");
        bots[bot] += 1;
        Object.keys(resources).forEach((key) => {
          resources[key] -= costs[key];
        });
        state.robots = bots;
        state.resources = resources;
        return true;
      }
    }

    let built = build("geodes");
    if (!built) built = build("obsidian");
    if (!built) built = build("clay");
    if (!built) build("ore");

    // Then produce resources based on initial robots
    Object.keys(old_bots).forEach((bot) => {
      state.resources[bot] += old_bots[bot];
    });
  }

  while (ticks < 24) {
    advanceState();
    console.log(state);
    ticks++;
  }

  return state;
};

console.time("solve");
console.log("solution", solution());
console.timeEnd("solve");

/**
 * Ok... so we'll be dealing with some kind of mapping,
 * from states (what resources do I have, what robots do i have, and what is my blueprint) into
 * possible outcomes (what resources do i produce, and can i build anything?)
 *
 * One optimization... it's never good to hoard resources for multiple of the same robot.
 * Building it earlier is always better -- more resources, right?
 * The same doesn't go for different robots obviously -- a geode is more valuable than a clay!
 *
 * I'm just thinking of a function that takes in available resources and spits out the combos of all robots you could build.
 * Feels like it never behooves us to build 2 ore robots at once, for instance, right?
 *
 *
 * So for a given list of available resources... it should spit out a list of 4 booleans, "can i built it" for each robot?
 * And then we need to add.... each combo of changing 1s into 0s?....? Or something?
 * Or not every one... only the maximal ones... like if I can build geode robot and ore robot, I should...
 *
 * Maybe this is wrong way to think of it. Maybe just check for each robot if it can be built.
 * Ah but this won't catch path where we can build 2 different robots at once...
 *
 *
 *
 * So the strategy for part one will be..
 *
 * Take each state (which is 8 numbers -- resources plus robots) --
 * and generate from robots. Then see which of possible combos of robots you can produce.
 * For each combo -- produce it, and add that to possible states.
 * And hope this doesn't balloon too big by 24 ticks lol.
 *
 *
 * Is the timing thing a red herring?
 * "First start making robots. Then generate resources. Then actually create robot."
 * I guess the upshot is that you spend your resources before you can generate them.
 *
 *
 *
 *
 * Hmm... That seemed to take way too long.
 * Even just 16 iterations was 3 seconds.
 *
 *
 * Maybe we need to be greedy? Just build highest value robot if you can?
 *
 *
 * No.... each example exposes issue with that....
 * With first BP, we never build anything since we are stuck just making clay robots...
 *
 * With second, we only build 10 geodes instead of optimal 12... so being greedy isn't best it seems....
 *
 *
 * Ooooh you can only make one robot per tick.... that changes things....
 */
