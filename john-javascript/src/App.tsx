import {useEffect, useState} from "react";


function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('api/hello')
            .then(response => response.json())
            .then(data => setMessage(data.message));
    }, []);

    return (
    <div>
        <p>Message from backend: {message}</p>
    </div>
  )
}

export default App
