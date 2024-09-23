const BASE_URL = 'https://challenge.crossmint.io/api';
const CANDIDATE_ID = 'd0c9ab0d-a2ea-4cbb-a0d3-43d100107852';


async function makePostRequest(url, body) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Failed to post at (${body.row}, ${body.column}): ${response.statusText}`);
        }
        console.log(`Successfully posted ${body.type || 'entity'} at (${body.row}, ${body.column})`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

// Helper function to add a delay to avoid too many limit issues from first challenge
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Fetch map from the API
async function fetchMap() {
    try {
        const response = await fetch(`${BASE_URL}/map/${CANDIDATE_ID}/goal`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Error Fetching Map: ${response.statusText} (HTTP ${response.status})`);
        }

        const data = await response.json();
        console.log('Fetched Goal Map:', data.goal);
        return data.goal;
    } catch (error) {
        console.error(`Error Fetching Map: ${error.message}`);
    }
}

// Function to place entities based on the parsed map automatically
async function placeEntitiesFromMap(mapData) {
    for (let row = 0; row < mapData.length; row++) {
        for (let col = 0; col < mapData[row].length; col++) {
            const entity = mapData[row][col];
            if (entity === 'SPACE') continue;

            const position = {
                candidateId: CANDIDATE_ID,
                row,
                column: col,
            };

            switch (entity) {
                case 'POLYANET':
                    await makePostRequest(`${BASE_URL}/polyanets`, position);
                    await delay(1500); // Delay to prevent rate limit issues
                    break;
                case 'WHITE_SOLOON':
                case 'RED_SOLOON':
                case 'BLUE_SOLOON':
                case 'PURPLE_SOLOON':
                    await makePostRequest(`${BASE_URL}/soloons`, {
                        ...position,
                        color: entity.split('_')[0].toLowerCase(), 
                    });
                    await delay(1500); 
                    break;
                case 'LEFT_COMETH':
                case 'RIGHT_COMETH':
                case 'UP_COMETH':
                case 'DOWN_COMETH':
                    await makePostRequest(`${BASE_URL}/comeths`, {
                        ...position,
                        direction: entity.split('_')[0].toLowerCase(), 
                    });
                    await delay(1500); 
                    break;
            }
        }
    }
}
async function main() {
    const mapData = await fetchMap(); 
    await placeEntitiesFromMap(mapData); 
}
main();
