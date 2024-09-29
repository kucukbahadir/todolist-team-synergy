const navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <link to="/login"></link>
                </li>
                <li>
                    <link to="/todo"></link>
                </li>
                <li>
                    <link to="/detail"></link>
                </li>
                <li>
                    <link to="/completed"></link>
                </li>
            </ul>
        </nav>
    );
}