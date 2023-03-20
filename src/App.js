import './App.css';
import useToken from './utils/useToken.js';
import configureAxios from './utils/configAxios';
import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';


function App() {
  const [searchTerm, setSearchTerm] = useState("")
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

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value)
  }

  const searchArticles = async (event) => {
    event.preventDefault()
    const response = await axios.post("/search", {
      userid: 123456,
      query: searchTerm,
      channel: 14
    })
    console.log(response.data)
  }

  // axios.post("/search", {
  //   userid: 123456,
  //   query: "test",
  //   channel: 14
  // })
  //   .then(response => console.log(response))

  axios.post("/article", {
    userid: 123456,
    channel: 14,
    label: "qed554533"
  })
    .then(response => console.log("article", response))

  return (
    <div className="App">
      <SearchBar
        searchTerm={searchTerm}
        handleChange={handleSearchInput}
        handleSubmit={searchArticles} />
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


