const buildGraph = (edges) => {
    const adjacencyList = {};
    const childSet = new Set();
    const parentMap = {};

    edges.forEach((edge) => {
        const [parent, child] = edge.split("->");


        if (!adjacencyList[parent]) {
            adjacencyList[parent] = [];
        }


        if (!parentMap[child]) {
            adjacencyList[parent].push(child);
            parentMap[child] = parent;
        }

        childSet.add(child);


        if (!adjacencyList[child]) {
            adjacencyList[child] = [];
        }
    });

    return { adjacencyList, childSet };
};

module.exports = { buildGraph };