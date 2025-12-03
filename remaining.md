# Remaining Stars

We currently (at time of writing) have obtained 397 of 500 possible stars.

Let's document what we learn while tackling the last 100-odd problems.

I'll leave out the Day 25's, since they tend to be checks for whether you have all previous stars.

## 2024

### --- Day 17: Chronospatial Computer ---

### --- Day 21: Keypad Conundrum ---

### --- Day 24: Crossed Wires ---

## 2023

### --- Day 10: Pipe Maze ---

### --- Day 12: Hot Springs ---

### --- Day 17: Clumsy Crucible ---

### --- Day 18: Lavaduct Lagoon ---

### --- Day 19: Aplenty ---

### --- Day 20: Pulse Propagation ---

### --- Day 21: Step Counter ---

### --- Day 22: Sand Slabs ---

### --- Day 23: A Long Walk ---

### --- Day 24: Never Tell Me The Odds ---

## 2022

### --- Day 15: Beacon Exclusion Zone ---

Complete: ✅

Missing part two.

Phew, we got there. Had to do a little math to figure out how to pinpoint the single position that an unseen beacon _could_ exist, given the positions of sensors and their _nearest_ beacons.

We iterated through the (4 million by 4 million) space of cells row by row to determine how many spots were ruled out in each row, given the positions and nearest-distance-to-beacon values for each sensor. This let us single out the one row with a different value.

We relied on merging intervals to determine how many spots were ruled out in each row. I suspect that full brute force would not have worked.

Solution still took a minute to run, so there's definitely room for improvement. We'll take it!

Potential optimization: if we detect that every cell in the row is invalid, we could move on; but this would require computing the size of `overlaps` every iteration... unsure.

### --- Day 16: Proboscidea Volcanium ---

Oh yeah, the elephants and minimal pipe time thing... Yikes.

### --- Day 17: Pyroclastic Flow ---

Crank up the simulation to 1000000000000. Which is to say, don't actually simulate it lol.

### --- Day 19: Not Enough Minerals ---

Robots trying to maximize how many geodes they can crack in a certain amount of time.

Missing both parts.

### --- Day 22: Monkey Map ---

A folded up cube with wrapping rules. Fun.

### --- Day 24: Blizzard Basin ---

Minimum amount of time to reach goal, come back and reach goal again. With simulated dynamic conditions (obstacles) changing.

## 2021

## 2020

## 2019

## 2018

## 2017

### --- Day 15: Dueling Generators ---

### --- Day 19: A Series of Tubes ---

### --- Day 23: Coprocessor Conflagration ---

## 2016

### --- Day 9: Explosives in Cyberspace ---

### --- Day 11: Radioisotope Thermoelectric Generators ---

### --- Day 14: One-Time Pad ---

### --- Day 17: Two Steps Forward ---

### --- Day 19: An Elephant Named Joseph ---

### --- Day 22: Grid Computing ---

### --- Day 23: Safe Cracking ---

### --- Day 24: Air Duct Spelunking ---

## 2015

### --- Day 8: Matchsticks ---

### --- Day 19: Medicine for Rudolph ---

### --- Day 22: Wizard Simulator 20XX ---
