const findRoots = (graph, childSet) => {
    const roots = [];

    Object.keys(graph).forEach((node) => {
        if (!childSet.has(node)) {
            roots.push(node);
        }
    });

    return roots;
};

// DFS with cycle detection + depth
const dfs = (node, graph, visited, stack) => {
    if (stack.has(node)) {
        return { hasCycle: true };
    }

    if (visited.has(node)) {
        return { subtree: {}, depth: 0 };
    }

    visited.add(node);
    stack.add(node);

    let maxDepth = 0;
    const subtree = {};

    for (const child of graph[node]) {
        const result = dfs(child, graph, visited, stack);

        if (result.hasCycle) {
            return { hasCycle: true };
        }

        subtree[child] = result.subtree;
        maxDepth = Math.max(maxDepth, result.depth);
    }

    stack.delete(node);

    return {
        subtree,
        depth: maxDepth + 1
    };
};

const buildHierarchies = (graph, childSet) => {
    const visitedGlobal = new Set();
    const result = [];

    // Step 1: find actual roots
    let roots = findRoots(graph, childSet);

    // Step 2: process normal trees first
    roots.forEach((root) => {
        if (visitedGlobal.has(root)) return;

        const visited = new Set();
        const stack = new Set();

        const dfsResult = dfs(root, graph, visited, stack);

        visited.forEach(n => visitedGlobal.add(n));

        if (dfsResult.hasCycle) {
            result.push({
                root,
                tree: {},
                has_cycle: true
            });
        } else {
            const tree = {};
            tree[root] = dfsResult.subtree;

            result.push({
                root,
                tree,
                depth: dfsResult.depth
            });
        }
    });

    // Step 3: handle remaining nodes (cycles)
    Object.keys(graph).forEach((node) => {
        if (visitedGlobal.has(node)) return;

        const visited = new Set();
        const stack = new Set();

        const dfsResult = dfs(node, graph, visited, stack);

        visited.forEach(n => visitedGlobal.add(n));

        result.push({
            root: node,
            tree: {},
            has_cycle: true
        });
    });

    return result;
};

module.exports = { buildHierarchies };