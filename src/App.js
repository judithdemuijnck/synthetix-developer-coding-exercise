import './App.css';
import useToken from './utils/useToken.js';
import configureAxios from './utils/configAxios';
import { useEffect, useState } from 'react';


function App() {
  const { token, initializeSession, verifySession, deleteSession } = useToken()
  const axios = configureAxios(token)

  useEffect(() => {
    const getSession = async () => {
      if (token) {
        await verifySession()
      } else {
        await initializeSession()
      }
    }
    getSession()
  }, [])



  return (
    <div className="App">

    </div>
  );
}

export default App;




// make api call & check if anything else is needed
// create search bar
// display articles based on search terms
// link to articles

// components:
// search bar
// article

//issues api
// what channel to use
// do i need a userid?



// ERROR HANDLING AXIOS


