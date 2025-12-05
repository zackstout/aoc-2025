function insertAndMergeIntervals(intervals, newInterval) {
  if (!intervals || intervals.length === 0) return [newInterval];

  // Step 1: Insert new interval into list
  intervals.push(newInterval);

  // Step 2: Sort intervals by start time
  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [];
  let [currentStart, currentEnd] = intervals[0];

  // Step 3: Merge overlaps
  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];

    if (start <= currentEnd) {
      // Overlap: extend the current interval
      currentEnd = Math.max(currentEnd, end);
    } else {
      // No overlap: push current and reset
      merged.push([currentStart, currentEnd]);
      [currentStart, currentEnd] = [start, end];
    }
  }

  // Push the last interval
  merged.push([currentStart, currentEnd]);

  return merged;
}

function merge(intervals) {
  let merged = [];

  for (const range of intervals) {
    merged = insertAndMergeIntervals(merged, range);
  }

  return merged;
}

module.exports = { insertAndMergeIntervals, merge };
