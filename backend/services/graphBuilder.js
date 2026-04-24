const buildGraph = (edges) => {
    const adjacencyList = {};
    const parentMap = {};
    const activeNodes = new Set();
    const inDegrees = {};

    // First pass: apply diamond rule and filter edges
    edges.forEach((edge) => {
        const [parent, child] = edge.split("->");

        // Diamond rule: first parent wins
        if (parentMap[child] && parentMap[child] !== parent) {
            return; // silently discard subsequent parent edges
        }

        // Initialize structures
        if (!adjacencyList[parent]) adjacencyList[parent] = [];
        if (!adjacencyList[child]) adjacencyList[child] = [];
        if (!(parent in inDegrees)) inDegrees[parent] = 0;
        if (!(child in inDegrees)) inDegrees[child] = 0;

        // Add edge
        if (!parentMap[child]) {
            adjacencyList[parent].push(child);
            parentMap[child] = parent;
            inDegrees[child] += 1;
        }

        activeNodes.add(parent);
        activeNodes.add(child);
    });

    return { adjacencyList, activeNodes, inDegrees };
};

module.exports = { buildGraph };