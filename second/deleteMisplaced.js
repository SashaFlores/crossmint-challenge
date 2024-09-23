const BASE_URL = 'https://challenge.crossmint.io/api';
const CANDIDATE_ID = 'd0c9ab0d-a2ea-4cbb-a0d3-43d100107852';

// Helper function to delete misplaced Polyanets from first challenge
async function deletePolyanet(row, column) {
    try {
        const response = await fetch(`${BASE_URL}/polyanets`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                candidateId: CANDIDATE_ID,
                row,
                column,
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to delete Polyanet at (${row}, ${column}): ${response.statusText}`);
        }
        console.log(`Successfully deleted Polyanet at (${row}, ${column})`);
    } catch (error) {
        console.error(`Error deleting Polyanet at (${row}, ${column}): ${error.message}`);
    }
}

// Coordinates of misplaced Polyanets from mixing up first challenge with second challenge
const misplacedPolyanets = [
    { row: 2, column: 8 },
    { row: 3, column: 7 },
];

// Function to delete only the specified Polyanets
async function deleteMisplacedPolyanets() {
    for (const { row, column } of misplacedPolyanets) {
        await deletePolyanet(row, column);
        await delay(1500); 
    }
}

// Helper function to add a delay to accommodate rate limit
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

deleteMisplacedPolyanets();
