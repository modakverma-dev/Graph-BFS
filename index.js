let edgeList = [
  ["a", "b"],
  ["a", "m"],
  ["a", "c"],
  ["b", "g"],
  ["b", "f"],
  ["m", "k"],
  ["g", "d"],
  ["e", "d"],
  ["q", "d"],
  ["c", "l"],
];

const shortestPath = (edges, nodeA, nodeB) => {
  let reslutPath = [];
  const graph = generateGraph(edges);
  const visited = new Set([nodeA]);
  const queue = [[nodeA, [nodeA]]];
  while (queue.length > 0) {
    const [node, path] = queue.shift();
    if (node === nodeB) return path;
    for (let neighbour of graph[node]) {
      if (!visited.has(neighbour)) {
        queue.push([neighbour, [...path, neighbour]]);
        visited.add(neighbour);
      }
    }
  }
  return [];
};

const generateGraph = (edges) => {
  const graph = {};
  for (let edge of edges) {
    const [a, b] = edge;
    if (!(a in graph)) graph[a] = [];
    if (!(b in graph)) graph[b] = [];
    graph[a].push(b);
    graph[b].push(a);
  }
  return graph;
};

const graph = shortestPath(edgeList, "f", "q");

(() => {
  const generatedGraph = generateGraph(edgeList);
  const visited = new Set(["a"]);
  const queue = [["a", 0]];
  const graphContainer = document.getElementById("graph-container");
  const nodeElem = document.createElement("div");
  nodeElem.classList.add(`node`);
  nodeElem.setAttribute("id", `level-${0}node-a`);
  nodeElem.textContent = "a";
  if (graph.includes("a")) {
    nodeElem.style.backgroundColor = "red";
  }
  graphContainer.appendChild(nodeElem);
  while (queue.length > 0) {
    const [node, distance] = queue.shift();
    let indexOfNeighbor;
    let sizeOfNeighbors = generatedGraph[node].length;
    for (let neighbour of generatedGraph[node]) {
      if (!visited.has(neighbour)) {
        queue.push([neighbour, distance + 1]);
        visited.add(neighbour);
        const neighbourElem = document.createElement("div");
        neighbourElem.textContent = neighbour;
        neighbourElem.classList.add("child");
        if (graph.includes(neighbour)) {
          neighbourElem.style.backgroundColor = "red";
        }
        indexOfNeighbor = generatedGraph[node].indexOf(neighbour) + 1;
        neighbourElem.style.transform = `translateX(${
          (indexOfNeighbor - sizeOfNeighbors) * 70
        }px)`;
        sizeOfNeighbors--;
        const parentElem = document.getElementById(
          `level-${distance}node-${node}`
        );
        parentElem.appendChild(neighbourElem);
        neighbourElem.setAttribute(
          "id",
          `level-${distance + 1}node-${neighbour}`
        );
      }
    }
  }
})();

console.log(graph, "graph");
