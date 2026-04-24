const buildTreeRecursive = (node, adjacencyList) => {
    const subtree = {};
    let maxDepth = 0;

    for (const child of adjacencyList[node]) {
        const result = buildTreeRecursive(child, adjacencyList);
        subtree[child] = result.subtree;
        maxDepth = Math.max(maxDepth, result.depth);
    }

    return { subtree, depth: maxDepth + 1 };
};

const buildHierarchies = (adjacencyList, activeNodes, inDegrees) => {
    const result = [];
    
    // We treat the graph as undirected to find Weakly Connected Components (WCC)
    const undirectedAdj = {};
    for (const node of activeNodes) {
        undirectedAdj[node] = [];
    }
    
    for (const node of activeNodes) {
        for (const child of adjacencyList[node]) {
            undirectedAdj[node].push(child);
            undirectedAdj[child].push(node);
        }
    }

    const globalVisited = new Set();
    const wccs = [];

    // Find all WCCs using BFS
    for (const node of activeNodes) {
        if (!globalVisited.has(node)) {
            const wcc = [];
            const queue = [node];
            globalVisited.add(node);

            while (queue.length > 0) {
                const current = queue.shift();
                wcc.push(current);

                for (const neighbor of undirectedAdj[current]) {
                    if (!globalVisited.has(neighbor)) {
                        globalVisited.add(neighbor);
                        queue.push(neighbor);
                    }
                }
            }
            wccs.push(wcc);
        }
    }

    // Process each WCC mathematically
    for (const wcc of wccs) {
        // Find roots in this WCC (nodes with inDegree 0)
        const wccRoots = wcc.filter(node => inDegrees[node] === 0);

        if (wccRoots.length > 0) {
            // It's a valid tree (since inDegree <= 1, there's exactly 1 root per WCC)
            wccRoots.sort(); 
            const root = wccRoots[0];
            
            const treeData = buildTreeRecursive(root, adjacencyList);
            
            result.push({
                root: root,
                tree: { [root]: treeData.subtree },
                depth: treeData.depth
            });
        } else {
            // It's a cyclic group (0 roots)
            // Pick lexicographically smallest node
            wcc.sort();
            const root = wcc[0];
            
            result.push({
                root: root,
                tree: {},
                has_cycle: true
            });
        }
    }

    return result;
};

module.exports = { buildHierarchies };