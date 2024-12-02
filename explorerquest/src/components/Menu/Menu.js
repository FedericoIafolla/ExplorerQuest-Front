import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = ({ menuActive, toggleMenu }) => {
    return (
        <>
            {/* Sidebar Menu */}
            <div className={`hp-menu ${menuActive ? "hp-active" : ""}`}>
                <ul>
                    <li>
                        <Link to="/account" onClick={toggleMenu}>Il mio profilo</Link>
                    </li>
                    <li>
                        <a href="#" onClick={toggleMenu}>Novità</a>
                    </li>
                    <li>
                        <a href="#" onClick={toggleMenu}>Destinazioni</a>
                    </li>
                    <li>
                        <a href="#" onClick={toggleMenu}>Community</a>
                    </li>
                    <li>
                        <a href="#" onClick={toggleMenu}>Contatti</a>
                    </li>
                </ul>
            </div>

            {/* Menu Toggle Button */}
            <div className="hp-menu-toggle" onClick={toggleMenu}>
                <span className="hp-open-menu">☰</span>
                <span className="hp-close-menu">✖</span>
            </div>
        </>
    );
};

export default Menu;
