const removeDuplicates = (edges) => {
    const seen = new Set();
    const uniqueEdges = [];
    const duplicateEdges = [];

    edges.forEach((edge) => {
        if (seen.has(edge)) {
            if (!duplicateEdges.includes(edge)) {
                duplicateEdges.push(edge);
            }
        } else {
            seen.add(edge);
            uniqueEdges.push(edge);
        }
    });

    return { uniqueEdges, duplicateEdges };
};

module.exports = { removeDuplicates };