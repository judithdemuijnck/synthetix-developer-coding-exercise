import "./Header.css"

export default function Header() {
    return (
        <header>
            <a href="/">
                <img className="brand-logo"
                    alt="Synthetix Search"
                    src="https://synthetix.com/wp-content/uploads/2021/01/logo_synthetix.png" />
            </a>
        </header>
    )
}