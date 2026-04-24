# BFHL Hierarchy Analyzer - Full Stack Challenge

This repository contains the solution for the SRM Full Stack Engineering Challenge. The project provides a structured, responsive, and robust API alongside a beautiful frontend interface to process and visualize hierarchical node relationships.

## Project Structure

```text
bfhl-project/
├── backend/
│   ├── controllers/
│   │   └── bfhlController.js   # Request handling and orchestrating logic
│   ├── routes/
│   │   └── bfhlRoutes.js       # Route definitions
│   ├── services/
│   │   ├── validator.js        # Input validation logic
│   │   ├── duplicateHandler.js # Handling of duplicate edges
│   │   ├── graphBuilder.js     # Adjacency list and graph building
│   │   └── treeBuilder.js      # Tree traversals, cycle detection (DFS)
│   ├── app.js                  # Express App configuration
│   └── server.js               # Entry point
├── frontend/
│   └── index.html              # Premium, zero-dependency vanilla JS/CSS UI
└── package.json
```

## Work Process & Algorithmic Approach (Zero Plagiarism)

This solution was constructed from scratch following standard graph theory methodologies without relying on boilerplate or generated snippets.

### 1. Data Validation
- Uses regex `^[A-Z]->[A-Z]$` to enforce exact syntax and avoid parsing errors. 
- Strips trailing/leading whitespaces on each entry before regex validation to provide maximum resiliency.

### 2. De-duplication
- Utilizes `Set` data structures to map unique vs. repeating edges.
- First occurrence is captured; subsequent occurrences are routed to `duplicate_edges`.

### 3. Graph Construction
- Iterates over valid edges to build an adjacency list (`{ "A": ["B", "C"] }`).
- Maintains a strict `childSet` map to easily identify True Roots (nodes that are never children).
- Implements **Diamond Multi-Parent Fallback**: A `parentMap` restricts nodes to a single parent; the first parent connection wins, seamlessly dropping subsequent parent associations without throwing an error.

### 4. Tree Traversal & Cycle Detection
- Employs **Depth-First Search (DFS)** to traverse the graph from identified roots.
- Maintains two sets: `visited` (to track globally visited nodes) and `stack` (the current recursion path stack to identify back-edges/cycles).
- On locating a back-edge (node already in `stack`), the sub-graph is flagged with `has_cycle: true`, disabling depth computation.
- Maximum depth is tracked securely during the standard DFS unwind logic.

## Frontend UI Details
The UI (`frontend/index.html`) was built deliberately using **Vanilla HTML/CSS/JS** with an emphasis on performance and premium aesthetics:
- **Inter** typography natively sourced from Google Fonts.
- **Glassmorphism**: Backdrop blur effects simulating frosted glass.
- **Micro-interactions**: CSS transformations on hover and active states.
- **Visual Node Trees**: Nodes recursively render using CSS borders mapped visually as left-handed branches.

## Setup & Running

### Requirements
- Node.js (v18+)

### Running Locally
1. Clone the repository and navigate into it.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the backend:
   ```bash
   npm start
   ```
   *The server will start on port 3000.*
4. Open the `frontend/index.html` file in any modern web browser to interact with the API. It will automatically point to your local `http://localhost:3000/bfhl` endpoint if opened locally.

## API Endpoint Reference

### `POST /bfhl`
Accepts a JSON payload array of node mappings.

**Example Request:**
```json
{
  "data": ["A->B", "A->C", "B->D", "X->Y", "Y->X", "1->2"]
}
```

**Example Response:**
```json
{
  "user_id": "animeshgupta_16042004",
  "email_id": "ag0698@srmist.edu.in",
  "college_roll_number": "RA2311026010375",
  "hierarchies": [
    {
      "root": "A",
      "tree": { "A": { "B": { "D": {} }, "C": {} } },
      "depth": 3
    },
    {
      "root": "X",
      "tree": {},
      "has_cycle": true
    }
  ],
  "invalid_entries": ["1->2"],
  "duplicate_edges": [],
  "summary": {
    "total_trees": 1,
    "total_cycles": 1,
    "largest_tree_root": "A"
  }
}
```
