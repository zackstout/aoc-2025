const { input } = require("./input.js");

// let groupId = 0;

const test = {
  immune: `17 units each with 5390 hit points (weak to radiation, bludgeoning) with an attack that does 4507 fire damage at initiative 2
  989 units each with 1274 hit points (immune to fire; weak to bludgeoning, slashing) with an attack that does 25 slashing damage at initiative 3`,
  infect: `801 units each with 4706 hit points (weak to radiation) with an attack that does 116 bludgeoning damage at initiative 1
 4485 units each with 2961 hit points (immune to radiation; weak to fire, cold) with an attack that does 12 slashing damage at initiative 4`,
};

function parseGroup(str, type = "immune", boost = 0) {
  const lines = str.split("\n");

  return lines.map((line) => {
    const group = {};
    const nums = line.match(/\d+/g);
    let specials = line.match(/\(.*\)/)?.[0];
    specials = specials?.slice(1, specials.length - 1);
    specials = specials?.split("; ");

    const weak = new Set();
    const immune = new Set();

    (specials || []).forEach((sp) => {
      if (sp.startsWith("weak")) {
        sp.slice(8)
          .split(", ")
          .forEach((x) => weak.add(x));
      }
      if (sp.startsWith("immune")) {
        sp.slice(10)
          .split(", ")
          .forEach((x) => immune.add(x));
      }
    });

    const words = line.split(" ");
    const idx = words.findIndex((w) => w === "damage");
    const damageType = words[idx - 1];

    group.damageType = damageType;
    group.amount = +nums[0];
    group.hp = +nums[1];
    group.damage = +nums[2];

    // For part two:
    if (boost && type === "immune") {
      group.damage += boost;
    }

    group.initiative = +nums[3];
    group.weak = weak;
    group.immune = immune;
    group.type = type;
    // group.id = groupId++;
    group.id = group.initiative;

    return group;
  });
}

function getEP(group) {
  return group.amount * group.damage;
}

function wouldDeal(a, b) {
  if (b.immune.has(a.damageType)) return 0;
  const scale = b.weak.has(a.damageType) ? 2 : 1;
  return getEP(a) * scale;
}

const solution = (boost = 0) => {
  const { immune, infect } = input;

  //   const population = {
  //     immune: parseGroup(immune, "immune"),
  //     infect: parseGroup(infect, "infect"),
  //   };

  let population = [
    ...parseGroup(immune, "immune", boost),
    ...parseGroup(infect, "infect", boost),
  ];

  //   return population;

  let times = 0;

  function battle() {
    const newPopulation = [...population];

    if (
      population.filter((x) => x.type === "immune" && x.amount > 0).length === 0
    ) {
      return;
    }
    if (
      population.filter((x) => x.type === "infect" && x.amount > 0).length === 0
    ) {
      return;
    }

    // console.log("\n=== Select phase ===");

    // Target selection: sort by EP, then initiative
    const selectionOrderGroups = [...newPopulation].sort((a, b) => {
      const aEP = getEP(a);
      const bEP = getEP(b);
      if (aEP === bEP) return b.initiative - a.initiative;
      return bEP - aEP;
    });

    const chosen = new Set();
    const attackMap = {};

    // Each group will target the group to which it would deal most damage (ignoring target.amount)
    // Ties broken by target's EP.
    selectionOrderGroups.forEach((group) => {
      const targetType = group.type === "immune" ? "infect" : "immune";

      let targets = [...population].filter((g) => g.type === targetType);

      targets = targets
        .filter((x) => !chosen.has(x.id))
        // Not sure if we will need this...
        .filter((x) => x.amount > 0);

      targets.sort((a, b) => {
        const aDmg = wouldDeal(group, a);
        const bDmg = wouldDeal(group, b);
        if (aDmg === bDmg) return getEP(b) - getEP(a);
        return bDmg - aDmg;
      });
      const target = targets[0];
      if (!target) {
        // console.log("no target available for", group.id);
        return;
      }
      chosen.add(target.id);
      attackMap[group.id] = target.id;
      //   console.log(group.id, "targets", target.id);
    });

    // console.log(selectionOrderGroups.map(getEP));

    // Now, attack!
    const attackOrderGroups = newPopulation.sort((a, b) => {
      return b.initiative - a.initiative;
    });

    // console.log("\n=== Attack phase ===");

    attackOrderGroups.forEach((grp) => {
      if (grp.amount <= 0) return;
      const targetId = attackMap[grp.id];
      if (!targetId) return;
      const target = [...population].find((g) => g.id === targetId);
      const dmg = wouldDeal(grp, target);
      //   const totalHealth = target.amount * target.hp;
      const numKilled = Math.floor(dmg / target.hp);

      //   if (boost === 29 && times > 50_000) {
      //     console.log(
      //       `Group ${grp.id} deals ${dmg} to ${target.id}, annihilating ${numKilled} of ${target.amount} units!`
      //     );
      //   }

      // Actually deal the damage:
      target.amount = Math.max(0, target.amount - numKilled);
      //   console.log("Leaving behind", target.amount, "survivors");
    });

    return newPopulation;
  }

  //   return population.infect.map(getEP);
  //   return population.infect[0];
  //   return parseGroup(immune);
  //   battle();

  //   console.log("boost", boost);

  while (true) {
    // console.log(`\n\n=== BATTLE ${times} === `);
    const pop = battle();

    // Exit condition when one army is empty
    if (!pop) {
      //   console.log("All done!", population);
      break;
    }

    population = pop;

    // Assume it got caught in a cycle? Or something? Idk?
    if (times > 100_000) {
      console.log("what up");
      break;
    }

    times++;
  }

  const isWinner =
    population.filter((x) => x.amount > 0 && x.type === "immune").length ===
      0 ||
    population.filter((x) => x.amount > 0 && x.type === "infect").length === 0;

  const winningArmySize = population.reduce((acc, grp) => acc + grp.amount, 0);
  return {
    winningArmySize,
    type: isWinner ? population.find((g) => g.amount > 0).type : null,
  };
};

function partTwo() {
  // Ahh.... should be binary search right?
  // It must be...
  // Ok and 1000 is enough to get there... I mean damn we can just run it. We'll write binary after.
  let boost = 0;

  // Huh... it's not 27 eh?

  //   return solution(27);

  while (true) {
    const s = solution(boost);
    if (s.type === "immune") return { ...s, boost };
    // 12519 is too high...
    // 5873 too low..
    // And 6763 is not right... Huh.
    // That's what we got when we skipped past the cursed boost 29... onto 30....
    console.log("boost", boost, "Winner", s);
    boost++;
  }

  return solution(boost);
}

console.time("solve");
console.log("solve", partTwo());
console.timeEnd("solve");

/**
 * NOTE: Object-oriented approach may be better here.... a.wouldDeal(b) rather than wouldDeal(a,b)...
 *
 * Also this is a case where TypeScript would be way better...
 */

// YES!!!! 646 battle iterations and 200ms..... we got it. Awesome.

// And for part two, ah of course, the pesky 1000 hard cap on the amount of iterations.... oops!
