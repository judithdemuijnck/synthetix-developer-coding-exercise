import "./ArticleLink.css"
import { Link } from "react-router-dom";


export default function Article(props) {
    return (
        <div className="article-li">
            <h3><span className="category">{props.category}:</span> {props.title}</h3>
            <Link to={props.url} data-testid={props.label}>View Full Article</Link>

        </div>
    )
}