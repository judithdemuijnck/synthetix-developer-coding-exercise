import "./ArticleLink.css"
import { Link } from "react-router-dom";


export default function Article(props) {


    return (
        <div className="article-li">
            <h3>{props.title}</h3>
            <p>{props.category}</p>
            <Link to={props.url}>View Full Article</Link>
        </div>
    )
}