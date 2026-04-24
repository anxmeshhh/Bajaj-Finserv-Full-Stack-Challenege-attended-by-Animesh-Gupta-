const { validateInput } = require("../services/validator");
const { removeDuplicates } = require("../services/duplicateHandler");
const { buildGraph } = require("../services/graphBuilder");

const handleBFHL = (req, res) => {
    try {
        const data = req.body?.data;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                error: "Invalid input format"
            });
        }

        const { validEdges, invalidEntries } = validateInput(data);
        const { uniqueEdges, duplicateEdges } = removeDuplicates(validEdges);

        const { adjacencyList, childSet } = buildGraph(uniqueEdges);

        res.json({
            graph: adjacencyList,
            invalid_entries: invalidEntries,
            duplicate_edges: duplicateEdges
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

module.exports = { handleBFHL };