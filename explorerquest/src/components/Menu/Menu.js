import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = ({ menuActive, toggleMenu }) => {
    const [showModal, setShowModal] = useState(false);

    const handleCommunityClick = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
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
                        <a href="#" onClick={handleCommunityClick}>Community</a>
                    </li>
                    <li>
                        <a href="#" onClick={toggleMenu}>Contatti</a>
                    </li>
                </ul>
            </div>
            <div className="hp-menu-toggle" onClick={toggleMenu}>
                <span className="hp-open-menu">☰</span>
                <span className="hp-close-menu">✖</span>
            </div>
            {showModal && (
                <div className="hp-menu-modal-overlay" onClick={closeModal}>
                    <div className="hp-menu-modal-content" onClick={(e) => e.stopPropagation()}>
                        <p>Funzionalità ancora da implementare</p>
                        <button onClick={closeModal}>Chiudi</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Menu;
