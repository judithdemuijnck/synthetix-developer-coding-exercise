import "./SearchBar.css"

export default function SearchBar(props) {
    return (
        <form onSubmit={e => props.handleSubmit(e)} className="form-container">
            <h1>Search Synthetix</h1>
            <div className="search-container">
                <input
                    className="search-input"
                    type="search"
                    placeholder="Type your question here"
                    aria-label="Type your questions here"
                    name="search-input"
                    id="search-input"
                    value={props.searchTerm}
                    onChange={e => props.handleChange(e)} />
                <button type="submit">Search</button>
            </div>
        </form>)
}