import "./Article.css"

export default function Article(props) {

    return (
        <div>
            <h2>{props.title}</h2>
            <p>{props.category}</p>
            <div dangerouslySetInnerHTML={{ __html: props.summary }} />
            <a href={props.url}>Full Article</a>
        </div>
    )
}