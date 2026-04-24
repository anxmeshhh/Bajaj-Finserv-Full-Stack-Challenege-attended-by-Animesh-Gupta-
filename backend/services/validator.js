const isValidEdge = (edge) => {
    if (typeof edge !== "string") return { valid: false, clean: "" };

    const trimmed = edge.trim();
    const regex = /^[A-Z]->[A-Z]$/;

    if (!regex.test(trimmed)) return { valid: false, clean: trimmed };

    const [parent, child] = trimmed.split("->");

    if (parent === child) return { valid: false, clean: trimmed }; // Self-loop treated as invalid

    return { valid: true, clean: trimmed };
};

const validateInput = (data) => {
    const validEdges = [];
    const invalidEntries = [];

    data.forEach((edge) => {
        const { valid, clean } = isValidEdge(edge);
        if (valid) {
            validEdges.push(clean);
        } else {
            invalidEntries.push(typeof edge === "string" ? edge : String(edge));
        }
    });

    return { validEdges, invalidEntries };
};

module.exports = { validateInput };