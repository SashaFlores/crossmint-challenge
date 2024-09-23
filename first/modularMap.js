const BASE_URL = 'https://challenge.crossmint.io/api';
const CANDIDATE_ID = 'd0c9ab0d-a2ea-4cbb-a0d3-43d100107852'; 

// Function to place Polyanets in an X-shape for any grid size (6 or greater is the min req. as a Modular code)
async function placePolyanetsInXShape(gridSize) {
    const firstDiagonal = [];
    const secondDiagonal = [];

    // Adjust starting points based on the grid size
    // first: Top-left to bottom-right
    // second: Top-right to bottom-left
    for (let i = 2; i < gridSize - 2; i++) {
        firstDiagonal.push({ row: i, column: i });  
        secondDiagonal.push({ row: i, column: gridSize - 1 - i }); 
    }
    await postPolyanets(firstDiagonal);
    await postPolyanets(secondDiagonal);
}


async function postPolyanets(positions) {
    for (const position of positions) {
        try {
            const response = await fetch(`${BASE_URL}/polyanets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    candidateId: CANDIDATE_ID,
                    row: position.row,
                    column: position.column
                })
            });

            if (response.ok) {
                console.log(`Successfully created Polyanet at (${position.row}, ${position.column})`);
            } else {
                console.error(`Failed to create Polyanet at (${position.row}, ${position.column}): ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Error creating Polyanet at (${position.row}, ${position.column}): ${error.message}`);
        }
    }
}

// Extract the grid size from the command line arguments
const args = process.argv.slice(2);
const GRID_SIZE = parseInt(args[0], 10); 

if (!isNaN(GRID_SIZE) && GRID_SIZE >= 6) { 
    placePolyanetsInXShape(GRID_SIZE);
} else {
    console.error('Please provide a valid grid size of 6 or greater.');
}
