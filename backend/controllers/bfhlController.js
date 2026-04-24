const { validateInput } = require("../services/validator");
const { removeDuplicates } = require("../services/duplicateHandler");
const { buildGraph } = require("../services/graphBuilder");
const { buildHierarchies } = require("../services/treeBuilder");

const handleBFHL = (req, res) => {
    try {
        const data = req.body?.data;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                error: "Invalid input format"
            });
        }

        // 1. Validate input
        const { validEdges, invalidEntries } = validateInput(data);

        // 2. Remove duplicates
        const { uniqueEdges, duplicateEdges } = removeDuplicates(validEdges);

        // 3. Build graph
        const { adjacencyList, childSet } = buildGraph(uniqueEdges);

        // 4. Build hierarchies (tree + cycle + depth)
        const hierarchies = buildHierarchies(adjacencyList, childSet);

        // 5. Summary calculations
        const totalTrees = hierarchies.filter(h => !h.has_cycle).length;
        const totalCycles = hierarchies.filter(h => h.has_cycle).length;

        let largestTreeRoot = null;
        let maxDepth = -1;

        hierarchies.forEach((h) => {
            if (!h.has_cycle) {
                if (
                    h.depth > maxDepth ||
                    (h.depth === maxDepth && h.root < largestTreeRoot)
                ) {
                    maxDepth = h.depth;
                    largestTreeRoot = h.root;
                }
            }
        });

        // 6. Final response
        res.json({
            user_id: "animeshgupta_16042004",   // update DOB if needed
            email_id: "your_email@srmist.edu.in",
            college_roll_number: "RA2311026010375",
            hierarchies: hierarchies,
            invalid_entries: invalidEntries,
            duplicate_edges: duplicateEdges,
            summary: {
                total_trees: totalTrees,
                total_cycles: totalCycles,
                largest_tree_root: largestTreeRoot
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

module.exports = { handleBFHL };