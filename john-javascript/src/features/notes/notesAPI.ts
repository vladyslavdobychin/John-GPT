const BASE_URL = '/api/notes';
const HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

export const fetchNotes = async () => {
    try {
        const response = await fetch(BASE_URL, { headers: HEADERS });
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch notes:", error);
        throw error;
    }
};