const BASE_URL = 'https://challenge.crossmint.io/api';
const CANDIDATE_ID = 'd0c9ab0d-a2ea-4cbb-a0d3-43d100107852'; 


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
    }
}

// Function to reset the map by deleting all items within the expanded grid size (30x30)
async function resetExpandedMap(goalMap) {
    const expandedRows = goalMap.length; 
    const expandedColumns = goalMap[0].length;

    for (let row = 0; row < expandedRows; row++) {
        for (let col = 0; col < expandedColumns; col++) {
            if (goalMap[row] && goalMap[row][col] !== 'SPACE') { 
                await deleteItem(row, col); 
                await delay(1000); 
            }
        }
    }
}


async function deleteItem(row, column) {
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
            console.log(`Successfully deleted item at (${row}, ${column})`);
        } else {
            console.error(`Failed to delete item at (${row}, ${column}): ${response.statusText}`);
        }
    } catch (error) {
        console.error(`Error deleting item at (${row}, ${column}): ${error.message}`);
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    try {
        const goalMap = await fetchMap(); 
        await resetExpandedMap(goalMap); 
        console.log('Reset complete. Check the UI for restored 11x11 state manually.');
    } catch (error) {
        console.error('Failed to reset the map:', error.message);
    }
}
main();


