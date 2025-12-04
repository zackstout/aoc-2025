function bfs(start, isGoal, getNeighbors) {
  const queue = [start];
  const visited = new Set();
  visited.add(start);

  while (queue.length > 0) {
    const node = queue.shift();

    if (isGoal(node)) {
      return node; // Goal found
    }

    // NOTE: We could pass in separate validateNode function, or just handle that inside getNeighbors
    for (const neighbor of getNeighbors(node)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return null; // Goal not found
}

// Example usage:
function example() {
  function isGoal(node) {
    return node === 5; // Example goal condition
  }

  function getNeighbors(node) {
    const graph = {
      1: [2, 3],
      2: [4, 5],
      3: [6],
      4: [],
      5: [],
      6: [],
    };
    return graph[node] || [];
  }

  const result = bfs(1, isGoal, getNeighbors);
  console.log("Goal found:", result);
}

// example();

module.exports = { bfs };
