const BASE_URL = 'https://challenge.crossmint.io/api';
const CANDIDATE_ID = 'd0c9ab0d-a2ea-4cbb-a0d3-43d100107852';
const GOAL = 'polyanets';
const GRID_SIZE = 11;


async function createXShape() {
    for (let i = 0; i < GRID_SIZE; i++) {
        try {
            // Create Polyanet at top-left to bottom-right diagonal
            let response = await fetch(`${BASE_URL}/${GOAL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    candidateId: CANDIDATE_ID,
                    row: i,
                    column: i
                })
            });

            if (response.ok) {
                console.log(`Successfully created Polyanet at (${i}, ${i})`);
            } else {
                console.error(`Failed to create Polyanet at (${i}, ${i}): ${response.statusText}`);
            }

            // Create Polyanet at top-right to bottom-left diagonal
            response = await fetch(`${BASE_URL}/${GOAL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    candidateId: CANDIDATE_ID,
                    row: i,
                    column: GRID_SIZE - 1 - i
                })
            });

            if (response.ok) {
                console.log(`Successfully created Polyanet at (${i}, ${GRID_SIZE - 1 - i})`);
            } else {
                console.error(`Failed to create Polyanet at (${i}, ${GRID_SIZE - 1 - i}): ${response.statusText}`);
            }

        } catch (error) {
            console.error(`Error creating Polyanet: ${error.message}`);
        }
    }
}
createXShape();