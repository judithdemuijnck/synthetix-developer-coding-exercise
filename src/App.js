import './App.css';
import useToken from './utils/useToken.js';
import configureAxios from './utils/configAxios';
import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import ArticleLink from './components/ArticleLink/ArticleLink';
import Article from './components/Article/Article';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [articleData, setArticleData] = useState([])
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
    setIsLoading(true)
    const response = await axios.post("/search", {
      userid: 123456,
      query: searchTerm,
      channel: 14
    })
    setArticleData(response?.data?.results?.map(result => {
      return { id: result.label, title: result.faq, category: result.taxonomy.category[0] }
    }))
  }

  const allSearchResults = articleData?.map(article => {
    return (
      <ArticleLink
        key={article.id}
        title={article.title}
        // summary={article.answer}
        category={article.category}
        url={`/article/${article.id}`} />
    )
  })

  const displaySearchResults = (
    <section className="articles-wrapper">
      {isLoading ? <h2>Loading Search Results...</h2> : allSearchResults}
      {isLoading && allSearchResults.length > 0 ? setIsLoading(false) : ""}
    </section>
  )

  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchBar
            searchTerm={searchTerm}
            handleChange={handleSearchInput}
            handleSubmit={getSearchResults} />}>
            <Route path="/search" element={displaySearchResults} />
            <Route path="/article/:articleId" element={<Article axios={axios} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;



// ERROR HANDLING AXIOS

// add loading state
// add checking in if token has expired every few minutes
// handle what happens when no search items are returned

// testing
// accessibility

// check which font is unused and get rid
// error route

//redirect to error routarticle/undefined

