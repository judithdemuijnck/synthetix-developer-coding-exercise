import './App.css';

import configureAxios from './utils/configAxios';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useToken from './utils/useToken.js';

import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import ArticleLink from './components/ArticleLink/ArticleLink';
import Article from './components/Article/Article';
import ErrorPage from './components/ErrorPage/ErrorPage';

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [noResults, setNoResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { token, initializeSession, verifySession } = useToken()
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

  const getSearchResults = async (event) => {
    event.preventDefault()
    setNoResults(false)
    setIsLoading(true)
    try {
      const response = await axios.post("/search", {
        userid: 123456,
        query: searchTerm,
        channel: 14
      })
      if (response.data.results) {
        setSearchResults(response?.data?.results?.map(result => {
          return { id: result.label, title: result.faq, category: result.taxonomy.category[0] }
        }))
      } else {
        setSearchResults([])
        setNoResults(true)
      }
    } catch (err) { console.error(err) }
  }

  const allSearchResults = noResults ?
    <h3 key="no-id">No Search Results Found</h3> :
    searchResults.map(article => {
      return (
        <ArticleLink
          key={article.id}
          title={article.title}
          category={article.category}
          url={`/article/${article.id}`} />
      )
    })

  const displaySearchResults = (
    <section className="search-results">
      <div className="search-results-wrapper">
        <h2>Search Results</h2>
        {isLoading ? <h3>Loading Search Results...</h3> : allSearchResults}
        {isLoading && (allSearchResults?.length > 0 || noResults) ? setIsLoading(false) : ""}
      </div>
    </section>
  )

  const displayNotFound = (
    <div>
      <h2>Not Found</h2>
      <p>Sorry, nothing here.</p>
    </div>
  )

  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchBar
            searchTerm={searchTerm}
            handleChange={handleSearchInput}
            getSearchResults={getSearchResults} />}>
            <Route path="/search" element={displaySearchResults} errorElement={<ErrorPage />} />
            <Route path="/article/:articleId" element={<Article axios={axios} />} errorElement={<ErrorPage />} />
            <Route path="*" element={displayNotFound} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;



// NEXT
// testing & accessibility
// AWS deploy


