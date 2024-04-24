import Layout from "./components/Layout";
import { useEffect, useState} from "react";


function App() {
    const [notes, setNotes] = useState('');

    useEffect(() => {
        fetch('/api/notes')  // Adjust the URL as necessary, might need full path if different domain
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error('Fetching error:', data.error);
                } else {
                    setNotes(data);  // Assuming the data is the array directly
                }
            })
            .catch(error => console.error('Error fetching notes:', error));
    }, []);

    return (
        <>
            <Layout>
                {notes.length > 0 ? (
                    notes.map(note => (
                        <div key={note.id}>
                            <h2>{note.title}</h2>
                            <p>{note.content}</p>
                            <small>Updated: {new Date(note.updated_at).toLocaleString()}</small>
                        </div>
                    ))
                ) : (
                    <p>No notes available.</p>
                )}
            </Layout>
        </>
    );
}

export default App;
