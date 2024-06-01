import "./index.css";

let edgeList = [
  ["a", "b"],
  ["a", "m"],
  ["a", "c"],
  ["b", "g"],
  ["b", "f"],
  ["m", "k"],
  ["g", "d"],
  ["e", "d"],
  ["e", "y"],
  ["e", "o"],
  ["c", "l"],
  ["q", "l"],
  ["c", "p"],
  ["t", "p"],
  ["p", "i"],
  [";", "i"],
  ["t", "q"],
];

const shortestPath = (edges, nodeA, nodeB) => {
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
let graph = [];
const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const source_val = document.findPath.source.value;
  const destination_val = document.findPath.destination.value;
  console.log(source_val, destination_val);
  graph = shortestPath(edgeList, source_val, destination_val);
  console.log(graph);
  visualizeGraph();
});

const visualizeGraph = () => {
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
        drawEdge(parentElem, neighbourElem, indexOfNeighbor - sizeOfNeighbors);
      }
    }
  }
};

visualizeGraph();

function drawEdge(nodeA, nodeB, translateX) {
  const rectA = nodeA.getBoundingClientRect();
  const rectB = nodeB.getBoundingClientRect();
  const x1 = rectA.left + rectA.width / 2;
  const y1 = rectA.top + rectA.height / 2;
  const x2 = rectB.left + rectB.width / 2;
  const y2 = rectB.top + rectB.height / 2;
  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  const edge = document.createElement("div");
  edge.classList.add("edge");
  // console.log(nodeA.textContent, nodeB.textContent, "content");
  edge.style.width = length + "px";
  edge.style.left = x1 - 90 + translateX * 35 + "px";
  edge.style.top = y1 + 50 + "px";
  edge.style.transform = `rotate(${angle}deg)`;
  document.body.appendChild(edge);
}

// drawEdge();

// window.addEventListener("resize", () => {
//   const graph = generateGraph(edgeList);
//   const visited = new Set(["a"]);
//   const queue = [["a", 0]];
//   while (queue.length > 0) {
//     const [node, distance] = queue.shift();
//     for (let neighbour of graph[node]) {
//       if (!visited.has(neighbour)) {
//         const nodeA = document.getElementById(`level-${distance}node-${node}`);
//         const nodeB = document.getElementById(
//           `level-${distance + 1}node-${neighbour}`
//         );
//         drawEdge(nodeA, nodeB, 70);
//         queue.push([neighbour, distance + 1]);
//         visited.add(neighbour);
//       }
//     }
//   }
// });
