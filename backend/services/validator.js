const isValidEdge = (edge) => {
    if (typeof edge !== "string") return false;

    const trimmed = edge.trim();
    const regex = /^[A-Z]->[A-Z]$/;

    if (!regex.test(trimmed)) return false;

    const [parent, child] = trimmed.split("->");

    if (parent === child) return false;

    return true;
};

const validateInput = (data) => {
    const validEdges = [];
    const invalidEntries = [];

    data.forEach((edge) => {
        if (isValidEdge(edge)) {
            validEdges.push(edge.trim());
        } else {
            invalidEntries.push(edge);
        }
    });

    return { validEdges, invalidEntries };
};

module.exports = { validateInput };