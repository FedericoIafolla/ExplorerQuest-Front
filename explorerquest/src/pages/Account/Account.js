import React, { useState, useRef, useEffect } from 'react';
import Menu from '../../components/Menu/Menu';
import './Account.css';
import avatar from '../../assets/AldoBaglio.jpg';

const Account = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [menuActive, setMenuActive] = useState(false);

    const [bio, setBio] = useState(`Sono Aldo Baglio, attore e comico italiano, noto per far parte dello storico trio comico Aldo, Giovanni & Giacomo.

Con anni di esperienza in cinema, teatro e televisione, porto umorismo e creatività in ogni mio lavoro. La mia passione è creare connessione con il pubblico attraverso la risata e la narrazione.`);

    const [workDescriptions, setWorkDescriptions] = useState({
        comico: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam euismod volutpat.',
        attore: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam euismod volutpat.',
        obiettivi: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam euismod volutpat.',
        sogni: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam euismod volutpat.'
    });

    const [phone, setPhone] = useState('+123 456 789');
    const [location, setLocation] = useState('Palermo, Italia');
    const [role, setRole] = useState('Comico');
    const [email, setEmail] = useState('Caricamento in corso...');

    const bioRef = useRef(null);
    const workRefs = {
        comico: useRef(null),
        attore: useRef(null),
        obiettivi: useRef(null),
        sogni: useRef(null),
    };

    const phoneRef = useRef(null);
    const locationRef = useRef(null);
    const roleRef = useRef(null);

    const toggleMenu = () => {
        setMenuActive((prev) => !prev);
    };

    const loadUserData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setEmail('Token non trovato. Eseguire il login.');
            return;
        }

        try {
            const response = await fetch('/api/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setEmail(data.email || 'Email non disponibile');
            } else {
                setEmail('Errore nel caricamento dei dati utente');
            }
        } catch (error) {
            setEmail('Errore di rete');
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        const newBio = bioRef.current.innerText;
        const newWorkDescriptions = {
            comico: workRefs.comico.current.innerText,
            attore: workRefs.attore.current.innerText,
            obiettivi: workRefs.obiettivi.current.innerText,
            sogni: workRefs.sogni.current.innerText,
        };

        const newPhone = phoneRef.current.innerText;
        const newLocation = locationRef.current.innerText;
        const newRole = roleRef.current.innerText;

        setBio(newBio);
        setWorkDescriptions(newWorkDescriptions);
        setPhone(newPhone);
        setLocation(newLocation);
        setRole(newRole);
        setIsEditing(false);
    };

    return (
        <div className={`acc-container ${menuActive ? 'acc-menu-open' : ''}`} id="acc-container">
            <Menu menuActive={menuActive} toggleMenu={toggleMenu} />
            <div className="acc-content">
                <div className="acc-profile-card">
                    <div className="acc-profile-pic">
                        <img src={avatar} alt="user avatar" />
                    </div>

                    <div className="acc-profile-details">
                        <div className="acc-intro">
                            {isEditing ? (
                                <div
                                    className="acc-editable-text"
                                    contentEditable="true"
                                    ref={roleRef}
                                    suppressContentEditableWarning={true}
                                >
                                    {role}
                                </div>
                            ) : (
                                <h4>{role}</h4>
                            )}
                        </div>
                        <div className="acc-contact-info">
                            <div className="acc-row">
                                <div className="acc-icon">
                                    <i className="fa fa-phone" style={{ color: 'var(--acc-dark-magenta)' }}></i>
                                </div>
                                <div className="acc-content">
                                    <span>Phone</span>
                                    {isEditing ? (
                                        <div
                                            className="acc-editable-text"
                                            contentEditable="true"
                                            ref={phoneRef}
                                            suppressContentEditableWarning={true}
                                        >
                                            {phone}
                                        </div>
                                    ) : (
                                        <h5>{phone}</h5>
                                    )}
                                </div>
                            </div>

                            <div className="acc-row">
                                <div className="acc-icon">
                                    <i className="fa fa-envelope-open" style={{ color: 'var(--acc-light-green)' }}></i>
                                </div>
                                <div className="acc-content">
                                    <span>Email</span>
                                    <h5>{email}</h5>
                                </div>
                            </div>

                            <div className="acc-row">
                                <div className="acc-icon">
                                    <i className="fa fa-map-marker" style={{ color: 'var(--acc-light-purple)' }}></i>
                                </div>
                                <div className="acc-content">
                                    <span>Location</span>
                                    {isEditing ? (
                                        <div
                                            className="acc-editable-text"
                                            contentEditable="true"
                                            ref={locationRef}
                                            suppressContentEditableWarning={true}
                                        >
                                            {location}
                                        </div>
                                    ) : (
                                        <h5>{location}</h5>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="acc-about">
                    <div className="acc-about-header">
                        <h1>Chi sono?</h1>
                    </div>
                    <div className="acc-bio-section">
                        {isEditing ? (
                            <div
                                className="acc-editable-text"
                                contentEditable="true"
                                ref={bioRef}
                                suppressContentEditableWarning={true}
                            >
                                {bio}
                            </div>
                        ) : (
                            <p>{bio}</p>
                        )}
                    </div>
                    <h2>Cosa faccio?</h2>
                    <div className="acc-work">
                        {Object.keys(workDescriptions).map((key) => (
                            <div className="acc-workbox" key={key}>
                                <div className="acc-desc">
                                    <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
                                    {isEditing ? (
                                        <div
                                            className="acc-editable-text"
                                            contentEditable="true"
                                            ref={workRefs[key]}
                                            suppressContentEditableWarning={true}
                                        >
                                            {workDescriptions[key]}
                                        </div>
                                    ) : (
                                        <p>{workDescriptions[key]}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '2rem' }}>
                        {!isEditing ? (
                            <button className="acc-button" onClick={handleEditToggle}>Modifica profilo</button>
                        ) : (
                            <button className="acc-button" onClick={handleSave}>Salva modifiche</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
