import "./Article.css"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export default function Article({ axios }) {
    const [article, setArticle] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const { articleId } = useParams()

    useEffect(() => {
        const getArticle = async () => {
            const response = await axios.post("/article", {
                userid: 123456,
                channel: 14,
                label: articleId
            })
            setArticle({ title: response.data.question, content: response.data.answer })
        }
        getArticle()
    }, [])

    const displayArticle = (<div>
        <h2>{article?.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: article?.content }} />
    </div>
    )

    const displayLoading = (<h2>Loading...</h2>)

    return (
        <section className="article-wrapper">
            <article>
                {isLoading ? displayLoading : displayArticle}
                {isLoading && Object.keys(article).length > 0 ? setIsLoading(false) : ""}
            </article>
        </section>

    )
}
