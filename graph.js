class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** Add a vertex to the graph */
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  /** Add multiple vertices to the graph */
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  /** Add an edge between two vertices */
  addEdge(v1, v2) {
    if (this.nodes.has(v1) && this.nodes.has(v2)) {
      v1.adjacent.add(v2);
      v2.adjacent.add(v1);
    }
  }

  /** Remove the edge between two vertices */
  removeEdge(v1, v2) {
    if (v1.adjacent.has(v2) && v2.adjacent.has(v1)) {
      v1.adjacent.delete(v2);
      v2.adjacent.delete(v1);
    }
  }

  /** Remove a vertex and its edges from the graph */
  removeVertex(vertex) {
    for (let node of this.nodes) {
      node.adjacent.delete(vertex);
    }
    this.nodes.delete(vertex);
  }

  /** Depth-first search (recursive) */
  depthFirstSearch(start) {
    const visited = new Set();
    const result = [];

    const traverse = (vertex) => {
      if (!vertex) return null;
      
      visited.add(vertex);
      result.push(vertex.value);

      vertex.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          traverse(neighbor);
        }
      });
    };

    traverse(start);
    return result;
  }

  /** Depth-first search (iterative) */
  depthFirstSearchIterative(start) {
    const stack = [start];
    const result = [];
    const visited = new Set();
    visited.add(start);

    while (stack.length) {
      let currentVertex = stack.pop();
      result.push(currentVertex.value);

      currentVertex.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          stack.push(neighbor);
        }
      });
    }
    return result;
  }

  /** Breadth-first search */
  breadthFirstSearch(start) {
    const queue = [start];
    const result = [];
    const visited = new Set();
    visited.add(start);

    while (queue.length) {
      let currentVertex = queue.shift();
      result.push(currentVertex.value);

      currentVertex.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }
    return result;
  }

  /** Find the shortest path between two nodes using BFS */
  shortestPath(start, end) {
    if (start === end) return [start.value];

    const queue = [start];
    const visited = new Set();
    const predecessors = {};
    let path = [];

    while (queue.length) {
      let currentVertex = queue.shift();

      if (currentVertex === end) {
        let stop = end.value;
        while (stop !== start.value) {
          path.push(stop);
          stop = predecessors[stop];
        }
        path.push(start.value);
        path.reverse();
        return path;
      }

      visited.add(currentVertex);

      currentVertex.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          predecessors[neighbor.value] = currentVertex.value;
          queue.push(neighbor);
        }
      });
    }

    return null; // In case there is no path
  }
}

module.exports = { Graph, Node };

