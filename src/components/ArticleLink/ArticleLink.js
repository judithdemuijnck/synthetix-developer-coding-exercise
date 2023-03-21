import "./ArticleLink.css"
import { Link } from "react-router-dom";


export default function Article(props) {


    return (
        <div className="article-li">
            <h2>{props.title}</h2>
            <p>{props.category}</p>
            {/* <p>{convert(props.summary, options)}</p>
            <div dangerouslySetInnerHTML={{ __html: props.summary }} /> */}
            <Link to={props.url}>View Full Article</Link>
        </div>
    )
}