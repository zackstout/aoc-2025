# Advent of Code

I love this time of year! Let's reflect a bit on our solutions as we work on them.

## --- Day 1: Secret Entrance ---

Ah, a modulo/remainder number-cycling problem! Classic AoC.

Is there a somewhat clean mathematical formula that would speed up the calculation, accounting for all the edge cases? Almost certainly!

Did we avoid finding it, and instead just simulate the process directly, which ran fast enough (under 1s)? We sure did!

**Part one**: Count how many times `0` is reached during a series of rotations of a cyclic ordering.

**Part two**: Count how many times `0` is crossed during a series of rotations of a cyclic ordering.

## --- Day 2: Gift Shop ---

The theme continues -- instead of finding the more efficient solution, we brute-force it!

We are given a set of ranges of numbers, and asked to sum up all those candidate numbers which are composed of...

**Part one**: a singly-repeated sequence of digits such as "2121".

**Part two**: an any-repeated sequence of digits such as "123123123".

- Naive brute force: check every candidate number in each range.

- 🔭 A more efficient (and complex) approach would probably try to enumerate all possible numbers that are repeated sequences of digits, within a given range.

## --- Day 3: Lobby ---

A nice recursive problem. Find the largest n-digit number by selecting digits (in order) from a long string. Clear recursive structure that we could exploit.

**Part one**: Find the largest 2-digit number from each long string of numbers.

**Part two**: Find the largest 12-digit number from each long string of numbers.

## --- Day 4: Printing Department ---

Hoo hoo, our first grid simulation! Was a bit rusty, ran into issue with trying to set the character in a string, and some confusion about whether neighbors were just coordinates or held the value as well. Ultimately pretty straightforward.

**Part one**: Count how many items in a grid satisfy a certain neighbor-based condition (which will allow them to be culled).

**Part two**: Count how many iterations are needed to cull all the items.

## --- Day 5: Cafeteria ---

Intervals problem. Quick application of `mergeIntervals`.

**Part one**: Find how many candidate numbers are contained within a set of intervals.

**Part two**: Sum up the length of a set of overlapping intervals.

## --- Day 6: Trash Compactor ---

A parsing problem! Interpret lines as columns of digits (so whitespace matters!). Better than [mollusk math of the past](https://adventofcode.com/2021/day/18), that's for sure..

**Part one**: Reduce each group of columns according to the operation (+ or \*), ignoring whitespace.

**Part two**: Reduce each group of columns according to the operation (+ or \*), accounting for whitespace, like handwritten addition.

- 🔭 Can likely use matrix transpose to solve.

## --- Day 7: Laboratories ---

First DFS problem!

**Part one**: Count how many times the path splits.

**Part two**: And then count the total number of paths. A nice iterative solution worked here, very reminiscent of 1-d [cellular automata](https://en.wikipedia.org/wiki/Cellular_automaton).

- 🔭 I feel like the second part is definitely also solveable with DFS and memoization. Doubt it would be faster, still want to do it that way.

## --- Day 8: Playground ---

A little Union-Find action: keeping track of cycles in a graph as new edges are added.

**Part one**: find the largest three cycles after a certain number of iterations (not counting "useless" ones).

**Part two**: find the number of iterations needed to reduce the number of cycles to one.

- Great to get to use the `UnionFind` class and understand how the `parents` array actually works.

- 🔭 Could likely be improved by using a `MinHeap` instead of sorting the entire array of pairs at the outsetl
