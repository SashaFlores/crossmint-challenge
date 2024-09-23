const BASE_URL = 'https://challenge.crossmint.io/api';
const CANDIDATE_ID = 'd0c9ab0d-a2ea-4cbb-a0d3-43d100107852'; 

// Function to fetch the current map state
async function fetchMap() {
    try {
        const response = await fetch(`${BASE_URL}/map/${CANDIDATE_ID}/goal`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`Error Fetching Map: ${response.statusText} (HTTP ${response.status})`);
        }

        const data = await response.json();
        return data.goal; 
    } catch (error) {
        console.error(`Error Fetching Map: ${error.message}`);
        throw error;
    }
}

// Function to delete a Polyanet at a specific position
async function deletePolyanet(row, column) {
    try {
        const response = await fetch(`${BASE_URL}/polyanets`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                candidateId: CANDIDATE_ID,
                row: row,
                column: column
            })
        });

        if (response.ok) {
            console.log(`Successfully deleted Polyanet at (${row}, ${column})`);
        } else {
            console.error(`Failed to delete Polyanet at (${row}, ${column}): ${response.statusText}`);
        }
    } catch (error) {
        console.error(`Error deleting Polyanet at (${row}, ${column}): ${error.message}`);
    }
}

// Function to clear all Polyanets from the current map
async function clearPolyanets(goalMap) {
    const rows = goalMap.length;
    const columns = goalMap[0].length;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            if (goalMap[row][col] === 'POLYANET') { 
                await deletePolyanet(row, col); 
                await delay(500); 
            }
        }
    }
}

// Helper function to add delay between requests
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Main function to execute the deletion process
async function main() {
    try {
        const goalMap = await fetchMap(); 
        await clearPolyanets(goalMap); 
        console.log('Clearing of Polyanets complete. Please verify the map state.');
    } catch (error) {
        console.error('Failed to clear Polyanets:', error.message);
    }
}
main();
