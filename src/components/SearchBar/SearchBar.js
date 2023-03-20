import "./SearchBar.css"



export default function SearchBar(props) {
    return (
        <form onSubmit={e => props.handleSubmit(e)}>
            <input
                type="search"
                placeholder="Type your question here"
                aria-label="Type your questions here"
                name="search-input"
                id="search-input"
                value={props.searchTerm}
                onChange={e => props.handleChange(e)} />
            <button type="submit">Search</button>
        </form>)
}