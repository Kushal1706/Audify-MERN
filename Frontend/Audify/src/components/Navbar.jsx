import {Link} from "react-router-dom";

function Navbar(){
    return(
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                Audify
            </Link>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/browse">Browse</Link>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
}

export default Navbar;