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
    const tempArticles = articleIds?.map(async id => {
      const response = await axios.post("/article", {
        userid: 123456,
        channel: 14,
        label: id
      })
      console.log(response.data)
      return { answer: response.data.answer, question: response.data.question, category: response.data.category, label: id }
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
    console.log(response.data)
    setArticleIds(response?.data?.results?.map(result => result.label))
  }


  const displayArticles = articles?.map(article => {
    console.log(article.label)
    return (
      <ArticleLink
        key={article.label}
        title={article.question}
        summary={article.answer}
        category={article.category}
        url={`/article/${article.label}`} />
    )
  })

  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchBar
            searchTerm={searchTerm}
            handleChange={handleSearchInput}
            handleSubmit={getArticleIds} />}>
            <Route path="/search" element={<section className="articles-wrapper">{displayArticles}</section>} />
            <Route path="/article/:articleId" element={<Article axios={axios} />} />

          </Route>
        </Routes>
      </BrowserRouter>

      {/* <SearchBar
        searchTerm={searchTerm}
        handleChange={handleSearchInput}
        handleSubmit={getArticleIds} />

      <section className="articles-wrapper">
        {displayArticles}
      </section> */}



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

