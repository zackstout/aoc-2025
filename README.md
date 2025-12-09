# Advent of Code

I love this time of year! Let's reflect a bit on our solutions as we work on them.

## Day 1

Ah, a modulo/remainder number-cycling problem! Classic AoC.

Is there a somewhat clean mathematical formula that would speed up the calculation, accounting for all the edge cases? Almost certainly!

Did we avoid finding it, and instead just simulate the process directly, which ran fast enough (under 1s)? We sure did!

## Day 2

The theme continues -- instead of finding the more efficient solution, we brute-force it!

We are given a set of ranges of numbers, and asked to sum up all those candidate numbers which are composed of (1) a singly-repeated sequence of digits such as "2121", or (2) an any-repeated sequence of digits such as "123123123".

Naive brute force: check every candidate number in each range.

A more efficient (and complex) approach would probably try to enumerate all possible numbers that are repeated sequences of digits, within a given range.

## Day 3

A nice recursive problem. Find the largest n-digit number by selecting digits (in order) from a long string. Clear recursive structure that we could exploit.

## Day 4

Hoo hoo, our first grid simulation! Was a bit rusty, ran into issue with trying to set the character in a string, and some confusion about whether neighbors were just coordinates or held the value as well. Ultimately pretty straightforward.

## Day 5

Intervals problem. Quick application of `mergeIntervals`.

## Day 6

A parsing problem! Interpret lines as columns of digits (so whitespace matters!). Better than [mollusk math of the past](https://adventofcode.com/2021/day/18), that's for sure..

## Day 7

First DFS problem!

Part one: Count how many times the path splits.

Part two: And then count the total number of paths. A nice iterative solution worked here, very reminiscent of 1-d [cellular automata](https://en.wikipedia.org/wiki/Cellular_automaton).

I feel like the second part is definitely also solveable with DFS, and I'd like to capture that at some point.

## Day 8

A little Union-Find action: keeping track of cycles in a graph as new edges are added.

Part one: find the largest three cycles after a certain number of iterations (not counting "useless" ones).

Part two: find the number of iterations needed to reduce the number of cycles to one.

Great to get to use the `UnionFind` class and understand how the `parents` array actually works.
