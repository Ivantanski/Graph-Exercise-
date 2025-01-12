const { Graph, Node } = require("./graph");

describe("addVertex", function() {
  it("should add a vertex to the graph", function() {
    let graph = new Graph();
    let a = new Node("A");
    let b = new Node("B");
    let c = new Node("C");
    expect(graph.nodes.has(a)).toBe(false);
    expect(graph.nodes.has(b)).toBe(false);
    expect(graph.nodes.has(c)).toBe(false);
    graph.addVertex(a);
    graph.addVertex(b);
    graph.addVertex(c);
    expect(graph.nodes.has(a)).toBe(true);
    expect(graph.nodes.has(b)).toBe(true);
    expect(graph.nodes.has(c)).toBe(true);
  });
});

describe("addVertices", function() {
  it("should add multiple vertices to the graph", function() {
    let graph = new Graph();
    let a = new Node("A");
    let b = new Node("B");
    let c = new Node("C");
    expect(graph.nodes.has(a)).toBe(false);
    expect(graph.nodes.has(b)).toBe(false);
    expect(graph.nodes.has(c)).toBe(false);
    graph.addVertices([a, b, c]);
    expect(graph.nodes.has(a)).toBe(true);
    expect(graph.nodes.has(b)).toBe(true);
    expect(graph.nodes.has(c)).toBe(true);
  });
});

describe("addEdge", function() {
  it("should add the appropriate edges to the adjacency list", function() {
    let graph = new Graph();
    let a = new Node("A");
    let b = new Node("B");
    let c = new Node("C");
    let d = new Node("D");
    graph.addVertices([a, b, c, d]);
    graph.addEdge(a, b);
    graph.addEdge(a, c);
    graph.addEdge(b, d);
    graph.addEdge(c, d);
    expect(a.adjacent.has(b)).toBe(true);
    expect(a.adjacent.has(c)).toBe(true);
    expect(b.adjacent.has(a)).toBe(true);
    expect(b.adjacent.has(d)).toBe(true);
    expect(c.adjacent.has(a)).toBe(true);
    expect(c.adjacent.has(d)).toBe(true);
    expect(d.adjacent.has(b)).toBe(true);
    expect(d.adjacent.has(c)).toBe(true);
  });
});

describe("removeEdge", function() {
  it("should remove the edges from the adjacency list", function() {
    let graph = new Graph();
    let a = new Node("A");
    let b = new Node("B");
    let c = new Node("C");
    let d = new Node("D");
    graph.addVertices([a, b, c, d]);
    graph.addEdge(a, b);
    graph.addEdge(a, c);
    graph.addEdge(b, d);
    graph.addEdge(c, d);

    graph.removeEdge(b, a);
    graph.removeEdge(c, d);

    expect(a.adjacent.has(b)).toBe(false);
    expect(c.adjacent.has(d)).toBe(false);
  });
});

describe("removeVertex", function() {
  it("should remove the vertex as well as any edges", function() {
    let graph = new Graph();
    let a = new Node("A");
    let b = new Node("B");
    let c = new Node("C");
    let d = new Node("D");
    graph.addVertices([a, b, c, d]);
    graph.addEdge(a, b);
    graph.addEdge(a, c);
    graph.addEdge(b, d);
    graph.addEdge(c, d);

    graph.removeVertex(c);
    graph.removeVertex(d);

    expect(a.adjacent.has(c)).toBe(false);
    expect(b.adjacent.has(d)).toBe(false);
    expect(graph.nodes.has(a)).toBe(true);
    expect(graph.nodes.has(b)).toBe(true);
    expect(graph.nodes.has(c)).toBe(false);
    expect(graph.nodes.has(d)).toBe(false);
  });
});

describe("DFS", function() {
  it("should return an array of the nodes searched using DFS", function() {
    let graph = new Graph();
    let S = new Node("S");
    let P = new Node("P");
    let U = new Node("U");
    let X = new Node("X");
    let Q = new Node("Q");
    let Y = new Node("Y");
    let V = new Node("V");
    let R = new Node("R");
    let W = new Node("W");
    let T = new Node("T");

    graph.addVertices([S, P, U, X, Q, Y, V, R, W, T]);

    graph.addEdge(S, P);
    graph.addEdge(S, U);

    graph.addEdge(P, X);
    graph.addEdge(U, X);

    graph.addEdge(P, Q);
    graph.addEdge(U, V);

    graph.addEdge(X, Q);
    graph.addEdge(X, Y);
    graph.addEdge(X, V);

    graph.addEdge(Q, R);
    graph.addEdge(Y, R);

    graph.addEdge(Y, W);
    graph.addEdge(V, W);

    graph.addEdge(R, T);
    graph.addEdge(W, T);

    let result = JSON.stringify(graph.depthFirstSearch(S));
    let validResult = 
      result === JSON.stringify(["S", "U", "V", "W", "T", "R", "Q", "Y", "X", "P"]) ||
      result === JSON.stringify(["S", "P", "X", "U", "V", "W", "Y", "R", "Q", "T"]);

    expect(validResult).toBe(true);
  });
});

describe("BFS", function() {
  it("should return an array of the nodes searched using BFS", function() {
    let graph = new Graph();
    let S = new Node("S");
    let P = new Node("P");
    let U = new Node("U");
    let X = new Node("X");
    let Q = new Node("Q");
    let Y = new Node("Y");
    let V = new Node("V");
    let R = new Node("R");
    let W = new Node("W");
    let T = new Node("T");

    graph.addVertices([S, P, U, X, Q, Y, V, R, W, T]);

    graph.addEdge(S, P);
    graph.addEdge(S, U);

    graph.addEdge(P, X);
    graph.addEdge(U, X);

    graph.addEdge(P, Q);
    graph.addEdge(U, V);

    graph.addEdge(X, Q);
    graph.addEdge(X, Y);
    graph.addEdge(X, V);

    graph.addEdge(Q, R);
    graph.addEdge(Y, R);

    graph.addEdge(Y, W);
    graph.addEdge(V, W);

    graph.addEdge(R, T);
    graph.addEdge(W, T);

    expect(graph.breadthFirstSearch(S)).toEqual([
      "S",
      "P",
      "U",
      "X",
      "Q",
      "V",
      "Y",
      "R",
      "W",
      "T"
    ]);
  });
});

