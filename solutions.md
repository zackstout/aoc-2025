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
