import { useState } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/submit', { name });
            alert(response.data.message);
        } catch (error) {
            alert('Error submitting form. Please try again.');
            console.error(error);
        }
    };

  return (
    <>
      hello solar rooftop calculator
      <div style={{ margin: '2rem', fontFamily: 'Arial, sans-serif' }}>
            <h1>Simple MERN Form</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ margin: '0.5rem', padding: '0.3rem' }}
                        required
                    />
                </label>
                <button
                    type="submit"
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Submit
                </button>
            </form>
        </div>
    </>
  )
}

export default App
