import './App.css';
import Routes from './routes';
import React, { useState, useEffect } from 'react';
import Spinner from './Components/Spinner';


function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 500)
  }, [])
  return (
    <div className="App">
      {loading === false ? (
        <Routes />
        ) : (
          <Spinner />
        )}
    </div> 
  );
}

export default App;
