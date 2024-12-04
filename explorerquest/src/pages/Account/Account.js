import React from 'react';
import './Account.css';
import avatar from '../../assets/AldoBaglio.jpg';

const Account = () => {
    return (
        <div className="account-container">
            {/* Profile Card */}
            <div className="account-profile-card">
                <div className="account-profile-pic">
                    <img src={avatar} alt="user avatar" />
                </div>

                <div className="account-profile-details">
                    <div className="account-intro">
                        <h2>Aldo Baglio</h2>
                        <h4>Comico</h4>
                        <div className="account-social">
                            <a href="#"><i className="fab fa-facebook" style={{ color: 'var(--account-blue)' }}></i></a>
                            <a href="#"><i className="fab fa-twitter" style={{ color: 'var(--account-skyblue)' }}></i></a>
                            <a href="#"><i className="fab fa-dribbble" style={{ color: 'var(--account-dark-pink)' }}></i></a>
                            <a href="#"><i className="fab fa-linkedin" style={{ color: 'var(--account-light-blue)' }}></i></a>
                        </div>
                    </div>

                    <div className="account-contact-info">
                        <div className="account-row">
                            <div className="account-icon">
                                <i className="fa fa-phone" style={{ color: 'var(--account-dark-magenta)' }}></i>
                            </div>
                            <div className="account-content">
                                <span>Phone</span>
                                <h5>+123 456 789</h5>
                            </div>
                        </div>

                        <div className="account-row">
                            <div className="account-icon">
                                <i className="fa fa-envelope-open" style={{ color: 'var(--account-light-green)' }}></i>
                            </div>
                            <div className="account-content">
                                <span>Email</span>
                                <h5>aldobaglio@gmail.com</h5>
                            </div>
                        </div>

                        <div className="account-row">
                            <div className="account-icon">
                                <i className="fa fa-map-marker" style={{ color: 'var(--account-light-purple)' }}></i>
                            </div>
                            <div className="account-content">
                                <span>Location</span>
                                <h5>Palermo, Italia</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="account-about">
                <h1>Chi sono?</h1>
                <p>
                    Sono Aldo Baglio, attore e comico italiano, noto per far parte dello storico trio comico Aldo, Giovanni & Giacomo.
                </p>
                <p>
                    Con anni di esperienza in cinema, teatro e televisione, porto umorismo e creatività in ogni mio lavoro. La mia passione è creare connessione con il pubblico attraverso la risata e la narrazione.
                </p>
                <h2>Cosa faccio?</h2>
                <div className="account-work">
                    <div className="account-workbox">
                        <div className="account-icon">
                        </div>
                        <div className="account-desc">
                            <h3>Comico</h3>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam euismod volutpat.</p>
                        </div>
                    </div>

                    <div className="account-workbox">
                        <div className="account-icon">
                        </div>
                        <div className="account-desc">
                            <h3>Attore</h3>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam euismod volutpat.</p>
                        </div>
                    </div>

                    <div className="account-workbox">
                        <div className="account-icon">
                        </div>
                        <div className="account-desc">
                            <h3>Obiettivi</h3>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam euismod volutpat.</p>
                        </div>
                    </div>

                    <div className="account-workbox">
                        <div className="account-icon">
                        </div>
                        <div className="account-desc">
                            <h3>Sogni</h3>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam euismod volutpat.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
