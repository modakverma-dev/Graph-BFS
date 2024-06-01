/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("// import \"./index.css\";\n\nlet edgeList = [\n  [\"a\", \"b\"],\n  [\"a\", \"m\"],\n  [\"a\", \"c\"],\n  [\"b\", \"g\"],\n  [\"b\", \"f\"],\n  [\"m\", \"k\"],\n  [\"g\", \"d\"],\n  [\"e\", \"d\"],\n  [\"q\", \"d\"],\n  [\"c\", \"l\"],\n];\n\nconst shortestPath = (edges, nodeA, nodeB) => {\n  let reslutPath = [];\n  const graph = generateGraph(edges);\n  const visited = new Set([nodeA]);\n  const queue = [[nodeA, [nodeA]]];\n  while (queue.length > 0) {\n    const [node, path] = queue.shift();\n    if (node === nodeB) return path;\n    for (let neighbour of graph[node]) {\n      if (!visited.has(neighbour)) {\n        queue.push([neighbour, [...path, neighbour]]);\n        visited.add(neighbour);\n      }\n    }\n  }\n  return [];\n};\n\nconst generateGraph = (edges) => {\n  const graph = {};\n  for (let edge of edges) {\n    const [a, b] = edge;\n    if (!(a in graph)) graph[a] = [];\n    if (!(b in graph)) graph[b] = [];\n    graph[a].push(b);\n    graph[b].push(a);\n  }\n  return graph;\n};\n\nconst graph = shortestPath(edgeList, \"f\", \"q\");\n\n(() => {\n  const generatedGraph = generateGraph(edgeList);\n  const visited = new Set([\"a\"]);\n  const queue = [[\"a\", 0]];\n  const graphContainer = document.getElementById(\"graph-container\");\n  const nodeElem = document.createElement(\"div\");\n  nodeElem.classList.add(`node`);\n  nodeElem.setAttribute(\"id\", `level-${0}node-a`);\n  nodeElem.textContent = \"a\";\n  if (graph.includes(\"a\")) {\n    nodeElem.style.backgroundColor = \"red\";\n  }\n  graphContainer.appendChild(nodeElem);\n  while (queue.length > 0) {\n    const [node, distance] = queue.shift();\n    let indexOfNeighbor;\n    let sizeOfNeighbors = generatedGraph[node].length;\n    for (let neighbour of generatedGraph[node]) {\n      if (!visited.has(neighbour)) {\n        queue.push([neighbour, distance + 1]);\n        visited.add(neighbour);\n        const neighbourElem = document.createElement(\"div\");\n        neighbourElem.textContent = neighbour;\n        neighbourElem.classList.add(\"child\");\n        if (graph.includes(neighbour)) {\n          neighbourElem.style.backgroundColor = \"red\";\n        }\n        indexOfNeighbor = generatedGraph[node].indexOf(neighbour) + 1;\n        neighbourElem.style.transform = `translateX(${\n          (indexOfNeighbor - sizeOfNeighbors) * 70\n        }px)`;\n        sizeOfNeighbors--;\n        const parentElem = document.getElementById(\n          `level-${distance}node-${node}`\n        );\n        parentElem.appendChild(neighbourElem);\n        neighbourElem.setAttribute(\n          \"id\",\n          `level-${distance + 1}node-${neighbour}`\n        );\n      }\n    }\n  }\n})();\n\nconsole.log(graph, \"graph\");\n\n\n//# sourceURL=webpack://graph-bfs/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;