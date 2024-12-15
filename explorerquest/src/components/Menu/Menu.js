import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Menu.css';

const Menu = ({ menuActive, toggleMenu }) => {
    const [showModal, setShowModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();

    const handleCommunityClick = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleLogoutClick = (e) => {
        e.preventDefault();
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
        setShowLogoutModal(false);
        navigate('/landingpage', { replace: true });
    };

    const cancelLogout = () => {
        setShowLogoutModal(false);
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
                    <li>
                        <a href="#" className="logout-link" onClick={handleLogoutClick}>LogOut</a>
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
            {showLogoutModal && (
                <div className="hp-menu-modal-overlay" onClick={cancelLogout}>
                    <div className="hp-menu-modal-content" onClick={(e) => e.stopPropagation()}>
                        <p>Sei sicuro di voler effettuare il logout?</p>
                        <button className="confirm-logout" onClick={confirmLogout}>Sì, sono sicuro</button>
                        <button onClick={cancelLogout}>No</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Menu;
