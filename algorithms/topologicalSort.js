// Can just use DFS. Mark as visited, recurse through adjacent, and then add to stack. Reverse stack to get sorted order.

// This is Kahn's algorithm

function topologicalSort(graph) {
  const inDegree = {};
  const queue = [];
  const sortedOrder = [];

  // Initialize in-degree of all nodes
  for (const node in graph) {
    inDegree[node] = 0;
  }
  for (const node in graph) {
    // console.log("node", node, graph[node]);
    for (const neighbor of graph[node]) {
      //   console.log("nbr", neighbor);
      inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
    }
  }

  // Collect nodes with in-degree 0
  for (const node in inDegree) {
    if (inDegree[node] === 0) {
      queue.push(node);
    }
  }

  // Process the queue
  while (queue.length > 0) {
    // TODO: What would adding a ! to end of this do?
    const node = queue.shift();
    sortedOrder.push(node);

    for (const neighbor of graph[node]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  // If sorted order doesn't include all nodes, there's a cycle
  if (sortedOrder.length !== Object.keys(graph).length) {
    throw new Error("Graph has a cycle, topological sorting not possible");
  }

  return sortedOrder;
}

// Example usage:
function example() {
  const graph = {
    A: ["B", "C"],
    B: ["D"],
    C: ["D"],
    D: [],
  };

  const result = topologicalSort(graph);
  console.log("Topological Order:", result);
}

// example();

module.exports = { topologicalSort };
