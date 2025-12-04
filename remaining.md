# Remaining Stars

We currently (at time of writing) have obtained 397 of 500 possible stars.

Let's document what we learn while tackling the last 100-odd problems.

I'll leave out the Day 25's, since they tend to be checks for whether you have all previous stars.

---

## 2024

### --- Day 17: Chronospatial Computer ---

Intcode computer! Find lowest value that causes program to output a copy of itself.

### --- Day 21: Keypad Conundrum ---

Recursive keypad simulation: minimize number of button presses.

### --- Day 24: Crossed Wires ---

Find the pairs of swapped gates which, when reversed, causes the complex signal network simulation to correctly perform addition.

---

## 2023

### --- Day 10: Pipe Maze ---

### --- Day 12: Hot Springs ---

Unfold the spring records to determine how many possible combinations would be valid (rules tell you groups, like (1,1,3)).

### --- Day 17: Clumsy Crucible ---

Minimize sum of values in a grid-based path, with constraint that you can only go 3 in a direction before turning.

### --- Day 18: Lavaduct Lagoon ---

A dig plan (UDLR) with huge numbers, find the enclosed area.

### --- Day 19: Aplenty ---

How many of huge set of possible combinations get validated by a simulated "workflow" process.

### --- Day 20: Pulse Propagation ---

Complex signal network simulation: fewest number of steps to achieve a desired outcome.

### --- Day 21: Step Counter ---

How many cells can be reached after N steps (where N is cranked up to a huge number), in an infinitely repeated grid.

### --- Day 22: Sand Slabs ---

### --- Day 23: A Long Walk ---

### --- Day 24: Never Tell Me The Odds ---

---

## 2022

### --- Day 15: Beacon Exclusion Zone ---

Part two: ⭐

Phew, we got there. Had to do a little math to figure out how to pinpoint the single position that an unseen beacon _could_ exist, given the positions of sensors and their _nearest_ beacons.

We iterated through the (4 million by 4 million) space of cells row by row to determine how many spots were ruled out in each row, given the positions and nearest-distance-to-beacon values for each sensor. This let us single out the one row with a different value.

We relied on merging intervals to determine how many spots were ruled out in each row. I suspect that full brute force would not have worked.

Solution still took a minute to run, so there's definitely room for improvement. We'll take it!

Potential optimization: if we detect that every cell in the row is invalid, we could move on; but this would require computing the size of `overlaps` every iteration... unsure.

### --- Day 16: Proboscidea Volcanium ---

Oh yeah, the elephants and minimal pipe time thing... Yikes.

### --- Day 17: Pyroclastic Flow ---

Tetris! Crank up the simulation to 1000000000000. Which is to say, don't actually simulate it lol.

### --- Day 19: Not Enough Minerals ---

Robots trying to maximize how many geodes they can crack in a certain amount of time.

Missing both parts.

### --- Day 22: Monkey Map ---

A folded up cube with wrapping rules. Fun.

### --- Day 24: Blizzard Basin ---

Minimum amount of time to reach goal, come back and reach goal again. With simulated dynamic conditions (obstacles) changing.

---

## 2021

### --- Day 16: Packet Decoder ---

Decoding packets with version numbers and rules.

### --- Day 18: Snailfish ---

Reduce numbers via nested pairs and rules.

### --- Day 22: Reactor Reboot ---

Count how many cells are on after executing many cube-sized-region-based swaps.

### --- Day 23: Amphipod ---

Minimum energy required to obtain a given configuration.

### --- Day 24: Arithmetic Logic Unit ---

Intcode-style computer!

---

## 2020

### --- Day 18: Operation Order ---

Different precedence rules for arithmetic.

### --- Day 19: Monster Messages ---

Valid "ab" messages based on rules that may generate loops (formal grammar).

### --- Day 20: Jurassic Jigsaw ---

Reassembling rotated tiles back into an image, and then finding "sea monsters" within it.

### --- Day 22: Crab Combat ---

Recursive card game.

### --- Day 23: Crab Cups ---

Cup-moving simulation game cranked up to huge number of cycles.

### --- Day 24: Lobby Layout ---

Hexagonal game of life.

---

## 2019

### --- Day 14: Space Stoichiometry ---

Minimize amount of ORE needed to produce FUEL given a series of reactions.

### --- Day 16: Flawed Frequency Transmission ---

Signal processing cranked up with many more cycles.

### --- Day 17: Set and Forget ---

Whoa, Intcode program to move a robot around and truncate instructions for moving it.

### --- Day 18: Many-Worlds Interpretation ---

Collect all the keys to open all the doors; tough one.

### --- Day 19: Tractor Beam ---

Intcode to scan a tractor beam and determine nearest point to enclose a square within it.

### --- Day 20: Donut Maze ---

Wrap-around maze with recursion, woof.

### --- Day 21: Springdroid Adventure ---

Use "springscript" to program an Intcode robot to know when to jump.

### --- Day 22: Slam Shuffle ---

Shuffling simulation cranked up to huge values.

### --- Day 23: Category Six ---

A network of Intcode computers!

### --- Day 24: Planet of Discord ---

Game of life but with a recursive grid, neat.

---

## 2018

### --- Day 9: Marble Mania ---

Cycling marble counting game simulation.

### --- Day 12: Subterranean Sustainability ---

Cellular automata with potted plants; wait for stable pattern to emerge.

### --- Day 15: Beverage Bandits ---

Goblin/Elf combat simulation.

### --- Day 17: Reservoir Research ---

Sand filling reservoirs simulation.

### --- Day 19: Go With The Flow ---

Op-code simulation!

### --- Day 20: A Regular Map ---

Regex parsing combined with traversing a map...

### --- Day 21: Chronal Conversion ---

Force an op-code program to halt.

### --- Day 22: Mode Maze ---

Part one: ⭐

Ok part one was not too bad... terrain-based cave. Really just following the instructions for how to generate the grid.

But part two is path-length minimization with constraints (tool-swapping).

### --- Day 23: Experimental Emergency Teleportation ---

Find the coordinates that are in range of the largest number of bots (with Manhattan-distance radius).

Feels like it will be similar to "Beacon Exclusion Zone"..

### --- Day 24: Immune System Simulator 20XX ---

Immune system battle simulation.

---

## 2017

### --- Day 15: Dueling Generators ---

Simulation.

### --- Day 19: A Series of Tubes ---

Walk-along-path simulation. Maddening that we have never gotten this one.

### --- Day 23: Coprocessor Conflagration ---

Register-computer simulation (or: not actually simulate).

---

## 2016

### --- Day 9: Explosives in Cyberspace ---

Part two: ⭐

Recursive string parsing "decompression".

Yessss we got there. Yeah honestly pretty dead simple when you look at it. Recursion is hard.

### --- Day 11: Radioisotope Thermoelectric Generators ---

Microchips and elevators: minimize number of steps.

### --- Day 14: One-Time Pad ---

Part two: ⭐

Salt and MD5 iterated many times.

Woof, needed some GPT action and still takes 2 minutes to run. A few subtle bugs were crushing me (double counting, and counting in order of when validated, rather than original index).

### --- Day 17: Two Steps Forward ---

Part two: ⭐

Find longest path that reaches vault (using MD5 on path to get next possible steps).

Huh, this one was pleasantly simple!

Once we recovered part one solution (BFS), just... don't return when you find a solution? Instead, just check it against the max currently found length. We don't have to do any extra checking to stop the simulation -- it stops on its own when all the doors end up closed in each node. Works for me!

### --- Day 19: An Elephant Named Joseph ---

Circular gift-stealing game simulation.

### --- Day 22: Grid Computing ---

Shuffle data around a grid to available spaces: fewest number of steps.

### --- Day 23: Safe Cracking ---

Intcode-style computer simulation.

### --- Day 24: Air Duct Spelunking ---

Part one: ⭐

(Ran in about 8s.)

Fewest number of steps to reach every target square at least once.

Hm, so it seems like we could first use a number of BFS calls, to determine distance between any given pair of points.

And that would produce a graph, and it seems like we would need to find a minimal spanning tree of that graph..

Ah, not quite. Since we need to traverse it, it's actually closer to Traveling Salesman or Hamiltonian Path...

Which fortunately we can brute force here because the number of nodes is so small!

Now, in part two, we just need to return to the start... shouldn't that just be a matter of adding in a single distance to each path..?

Yes! Beautiful!

---

## 2015

### --- Day 8: Matchsticks ---

Code representation of string vs in-memory representation.

### --- Day 19: Medicine for Rudolph ---

Minimize number of replacements needed to reach a target molecule.

### --- Day 22: Wizard Simulator 20XX ---

Wizard battle simulation.
