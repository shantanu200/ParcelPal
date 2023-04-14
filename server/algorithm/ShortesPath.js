class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

export function dijkstra(graph, startNode, endNode) {
  var distances = {};
  var previous = {};
  var pq = new PriorityQueue();

  for (let node in graph) {
    if (node === startNode) {
      distances[node] = 0;
      pq.enqueue(node, 0);
    } else {
      distances[node] = Infinity;
      pq.enqueue(node, Infinity);
    }
    previous[node] = null;
  }

  while (pq.values.length) {
    var currentNode = pq.dequeue().val;
    if (currentNode === endNode) {
      var path = [];
      while (previous[currentNode]) {
        path.push(currentNode);
        currentNode = previous[currentNode];
      }
      console.log(distances);
      return path.concat(startNode).reverse();
    }
    if (distances[currentNode] === Infinity) {
      break;
    }

    for (let neighbor in graph[currentNode]) {
      const distance = graph[currentNode][neighbor];
      const newPath = distances[currentNode] + distance;

      if (newPath < distances[neighbor]) {
        distances[neighbor] = newPath;
        previous[neighbor] = currentNode;
        pq.enqueue(neighbor, newPath);
      }
    }
  }

  return null;
}
