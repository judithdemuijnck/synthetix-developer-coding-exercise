import './App.css';
import useToken from './utils/useToken.js';
import configureAxios from './utils/configAxios';
import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import Article from './components/Article/Article';


function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [articleIds, setArticleIds] = useState([])
  const [articles, setArticles] = useState([])
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

  useEffect(() => {
    const tempArticles = articleIds.map(async id => {
      const response = await axios.post("/article", {
        userid: 123456,
        channel: 14,
        label: id
      })
      console.log(response.data)
      return { answer: response.data.answer, question: response.data.question, label: id }
    })
    // resolves array of promises
    Promise.all(tempArticles).then(data => setArticles(data))
  }, [articleIds])


  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value)
  }

  const getArticleIds = async (event) => {
    event.preventDefault()
    const response = await axios.post("/search", {
      userid: 123456,
      query: searchTerm,
      channel: 14
    })
    setArticleIds(response.data.results.map(result => result.label))
  }



  const displayArticles = articles?.map(article => {
    return (
      <Article
        key={article.label}
        title={article.question}
        summary={article.answer}
        url={`https://help.synthetix.com/article/${article.label}`} />
    )
  })

  return (
    <div className="App">
      <SearchBar
        searchTerm={searchTerm}
        handleChange={handleSearchInput}
        handleSubmit={getArticleIds} />
      {displayArticles}
    </div>
  );
}

export default App;



// ERROR HANDLING AXIOS


