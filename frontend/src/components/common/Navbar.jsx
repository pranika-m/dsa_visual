import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

function Navbar({ onToggleSandbox }) {
    const location = useLocation();
    const isEditorial = location.pathname.startsWith('/learn/');
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar__inner">
                <Link to="/" className="navbar__brand">
                    <span className="navbar__logo">⚡</span>
                    <span className="navbar__title">DSA Visualizer</span>
                </Link>

                <div className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
                    <Link
                        to="/"
                        className={`navbar__link ${location.pathname === '/' ? 'navbar__link--active' : ''}`}
                    >
                        Home
                    </Link>
                    <a
                        href="/#categories"
                        className="navbar__link"
                    >
                        Topics
                    </a>
                </div>

                {isEditorial && (
                    <div className="navbar__actions">
                        <button className="btn btn--primary navbar__sandbox-btn" onClick={onToggleSandbox}>
                            💻 Sandbox
                        </button>
                    </div>
                )}

                <button
                    className="navbar__hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
