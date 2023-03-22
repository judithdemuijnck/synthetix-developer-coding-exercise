import "./SearchBar.css"
import { Outlet, useNavigate } from "react-router-dom"


export default function SearchBar(props) {
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        props.getSearchResults(event)
        navigate("/search")
    }

    return (
        <main>
            <form onSubmit={e => handleSubmit(e)} className="form-container">
                <h1>Search Synthetix FAQ</h1>
                <div className="search-container">
                    <input
                        className="search-input"
                        type="search"
                        placeholder="Type your question here"
                        aria-label="Type your questions here"
                        required={true}
                        aria-required={true}
                        name="search"
                        value={props.searchTerm}
                        onChange={e => props.handleChange(e)} />
                    <button className="search-btn material-symbols-outlined"
                        type="submit"
                        aria-label="Click here to search Synthetix knowledge base">search</button>
                </div>
            </form>

            {/* switches between different components */}
            <Outlet />
        </main>)
}
