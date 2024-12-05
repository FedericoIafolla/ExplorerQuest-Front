import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ onSave }) => {
    return (
        <header>
            <nav>
                <Link to="/homepage">Home</Link>
                <button className="navbar-button" onClick={onSave}>
                    Salva il tuo itinerario!
                </button>
            </nav>
        </header>
    );
};

export default Navbar;
