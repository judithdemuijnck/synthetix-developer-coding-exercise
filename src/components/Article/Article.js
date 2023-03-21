import "./Article.css"

export default function Article(props) {

    const createMarkup = () => {
        return { __html: props.summary };
    }

    return (
        <div>
            <h2>{props.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: props.summary }} />
            <a href={props.url}>Full Article</a>
        </div>
    )
}