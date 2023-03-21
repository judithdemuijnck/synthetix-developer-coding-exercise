import "./SearchBar.css"

export default function SearchBar(props) {
    return (
        <form onSubmit={e => props.handleSubmit(e)} className="form-container">
            <h1>Search Synthetix FAQ</h1>
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
                <button className="search-btn material-symbols-outlined" type="submit">search</button>
            </div>
        </form>)
}