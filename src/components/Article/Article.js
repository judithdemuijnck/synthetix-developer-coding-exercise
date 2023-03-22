import "./Article.css"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export default function Article({ axios }) {
    const [article, setArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [noResult, setNoResult] = useState(false)
    const { articleId } = useParams()

    useEffect(() => {
        const getArticle = async () => {
            setNoResult(false)
            try {
                const response = await axios.post("/article", {
                    userid: 123456,
                    channel: 14,
                    label: articleId
                })
                setArticle({ title: response.data.question, content: response.data.answer })
            } catch (err) {
                console.error(err)
                setNoResult(true)
            }
        }
        getArticle()
    }, [])

    const displayArticle = noResult ?
        (<div>
            <h2>404</h2>
            <p>Sorry, couldn't find what you were looking for.</p>
        </div>) :
        (<div>
            <h2>{article?.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: article?.content }} />
        </div>
        )

    const displayLoading = (<h2>Loading...</h2>)

    return (
        <section className="article-wrapper">
            <article>
                {isLoading ? displayLoading : displayArticle}
                {isLoading && (Object.keys(article)?.length > 0 || noResult) ? setIsLoading(false) : ""}
            </article>
        </section>

    )
}
