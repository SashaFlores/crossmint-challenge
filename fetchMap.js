const BASE_URL = 'https://challenge.crossmint.io/api';
const CANDIDATE_ID = 'd0c9ab0d-a2ea-4cbb-a0d3-43d100107852';
const fs = require('fs');


async function fetchMap() {
    try {
        const response = await fetch(`${BASE_URL}/map/${CANDIDATE_ID}/goal`, {
            method: 'GET'
        });
        
        if (!response.ok) {
            throw new Error(`Error Fetching Map: ${response.statusText} (HTTP ${response.status})`);
        }
        
        const data = await response.json();
        console.log('Fetched Goal Map:', data);

        fs.writeFileSync('data.json', JSON.stringify(data, null, 2), 'utf8');
        console.log('Map data saved to data.json');
        
        return data;
    } catch (error) {
        console.error(`Error Fetching Map: ${error.message}`);
    }
}
fetchMap();