import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar(){
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    function handleLogout(){
        logout();
        navigate("/login");
    }

    return(
        <nav className="navbar">

            <Link to="/" className="navbar-logo">
                Audify
            </Link>

            {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}

            <div className={`sidebar ${isOpen ? "open": ""}`}>
                <button className="close-btn" onClick={toggleSidebar}>✖</button>
                <Link className="sidebar-link" to="/">Home</Link>
                <Link className="sidebar-link" to="/browse">Browse</Link>
                <Link className="sidebar-link" to="/upload">Upload</Link>
                <Link className="sidebar-link" to="/dashboard">Dashboard</Link>
                {user ?(
                    <>
                        <span className="navbar-user">Hi, {user.name.split(" ")[0]}</span>
                        <button className="btn-logout" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <Link className="sidebar-link" to="/login">Login</Link>
                )}
            </div>
            {/* Hamburger only visible on small screens */}
            <button className="hamburger" onClick={toggleSidebar}>
                ☰
            </button>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/browse">Browse</Link>
                <Link to="/upload">Upload</Link>
                <Link to="/dashboard">Dashboard</Link>
                {user ?(
                    <>
                        <span className="navbar-user">Hi, {user.name.split(" ")[0]}</span>
                        <button className="btn-logout" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;