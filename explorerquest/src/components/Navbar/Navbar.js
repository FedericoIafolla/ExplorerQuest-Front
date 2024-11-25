/* Navbar.js */
import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/contacts">Contacts</Link>
                <Link to="/info">Info</Link>
            </nav>
        </header>
    );
};

export default Navbar;
