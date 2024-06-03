import "./index.css";

let edgeList = [
  ["a", "b"],
  ["c", "b"],
  ["a", "c"],
  ["a", "m"],
  ["b", "g"],
  ["b", "f"],
  ["m", "k"],
  ["g", "d"],
  ["e", "d"],
  ["e", "y"],
  ["e", "k"],
  ["e", "f"],
  // ["e", "o"],
  // ["c", "l"],
  // ["q", "l"],
  // ["c", "p"],
  // ["t", "p"],
  // ["p", "i"],
  // [";", "i"],
  // ["q", "d"],
];

const shortestPath = (edges, nodeA, nodeB) => {
  const graph = generateGraph(edges);
  const visited = new Set([nodeA]);
  if (!graph[nodeA]) return [];
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
  graph = shortestPath(edgeList, source_val, destination_val);
  visualizeGraph();
});

const visualizeGraph = () => {
  const generatedGraph = generateGraph(edgeList);
  const startingElem = Object.keys(generatedGraph)[0];
  const visited = new Set([startingElem]);
  const queue = [[startingElem, 0]];
  const graphContainer = document.getElementById("graph-container");
  const nodeElem = document.createElement("div");
  nodeElem.classList.add(`node`);
  nodeElem.setAttribute("id", `node-${startingElem}`);
  nodeElem.textContent = startingElem;
  if (graph.includes(startingElem)) {
    nodeElem.style.backgroundColor = "white";
    nodeElem.style.color = "black";
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
          neighbourElem.style.backgroundColor = "white";
          neighbourElem.style.color = "black";
        }
        indexOfNeighbor = generatedGraph[node].indexOf(neighbour) + 1;
        neighbourElem.style.transform = `translateX(${
          (indexOfNeighbor - sizeOfNeighbors) * 70
        }px)`;
        sizeOfNeighbors--;
        const parentElem = document.getElementById(`node-${node}`);
        parentElem.appendChild(neighbourElem);
        neighbourElem.setAttribute("id", `node-${neighbour}`);
      }
    }
  }
  for (let edge of edgeList) {
    const [start, end] = edge;
    let sizeOfNeighbors = generatedGraph[start].length;
    let indexOfNeighbor = generatedGraph[start].indexOf(end) + 2.1;
    let startelem = document.getElementById(`node-${start}`);
    let endelem = document.getElementById(`node-${end}`);
    drawEdge(startelem, endelem, indexOfNeighbor - sizeOfNeighbors);
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
  edge.style.width = length + "px";
  edge.style.left = x1 + "px";
  edge.style.top = y1 + "px";
  edge.style.transformOrigin = "0 0";
  edge.style.transform = `rotate(${angle}deg)`;
  document.body.appendChild(edge);
}

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
