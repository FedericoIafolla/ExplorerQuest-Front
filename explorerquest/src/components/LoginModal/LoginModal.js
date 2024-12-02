import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginModal.css';
import 'remixicon/fonts/remixicon.css';

const LoginModal = ({ onClose }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);

    const [mouseDownTarget, setMouseDownTarget] = useState(null); // Aggiungi questo stato

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleMouseDown = (e) => {
        setMouseDownTarget(e.target); // Registra l'elemento dove è avvenuto il mousedown
    };

    const handleMouseUp = (e) => {
        // Chiudi il modal solo se il mousedown e il mouseup sono sull'overlay
        if (mouseDownTarget === e.target && e.target.classList.contains('login-modal-overlay')) {
            onClose();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (isRegistering && password !== confirmPassword) {
            setErrorMessage('Le password non coincidono');
            return;
        }

        const payload = isRegistering
            ? { username: username, email: email, password: password }
            : { usernameOrEmail: usernameOrEmail, password: password };

        const url = isRegistering
            ? "http://localhost:8080/api/user/register"
            : "http://localhost:8080/api/user/login";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                if (!isRegistering) {
                    localStorage.setItem("token", data.token);
                    navigate('/homepage');
                    onClose();
                } else {
                    setIsRegistering(false);
                    setUsername('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    alert('Registrazione avvenuta con successo! Ora puoi effettuare il login.');
                    navigate('/homepage');
                }
            } else {
                const error = await response.text();
                setErrorMessage(`${isRegistering ? "Registrazione" : "Login"} fallito: ${error}`);
            }
        } catch (error) {
            setErrorMessage(`Errore di connessione: ${error.message}`);
        }
    };

    const handleToggleRegister = () => {
        setIsFlipped(true);
        setTimeout(() => {
            setIsRegistering((prev) => !prev);
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setIsFlipped(false);
        }, 300);
    };

    return (
        <div
            className="login-modal-overlay"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <div className={`login-modal ${isFlipped ? 'flipped' : ''}`}>
                <button className="close-button" onClick={onClose}>&times;</button>
                <h1 className="login__title">{isRegistering ? 'Register' : 'Login'}</h1>
                <form onSubmit={handleSubmit}>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    {!isRegistering && (
                        <div className="login__box">
                            <i className="ri-user-3-line login__icon"></i>
                            <div className="login__box-input">
                                <input
                                    type="text"
                                    required
                                    className="login__input"
                                    id="login-username-email"
                                    placeholder=" "
                                    value={usernameOrEmail}
                                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                                />
                                <label htmlFor="login-username-email" className="login__label">Username or Email</label>
                            </div>
                        </div>
                    )}
                    {isRegistering && (
                        <div className="login__box">
                            <i className="ri-user-3-line login__icon"></i>
                            <div className="login__box-input">
                                <input
                                    type="text"
                                    required
                                    className="login__input"
                                    id="register-username"
                                    placeholder=" "
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <label htmlFor="register-username" className="login__label">Username</label>
                            </div>
                        </div>
                    )}
                    {isRegistering && (
                        <div className="login__box">
                            <i className="ri-mail-line login__icon"></i>
                            <div className="login__box-input">
                                <input
                                    type="email"
                                    required
                                    className="login__input"
                                    id="register-email"
                                    placeholder=" "
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label htmlFor="register-email" className="login__label">Email</label>
                            </div>
                        </div>
                    )}
                    <div className="login__box">
                        <i className="ri-lock-2-line login__icon"></i>
                        <div className="login__box-input">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                className="login__input"
                                id="login-pass"
                                placeholder=" "
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="login-pass" className="login__label">Password</label>
                            <i
                                className={showPassword ? "ri-eye-line login__eye" : "ri-eye-off-line login__eye"}
                                id="login-eye"
                                onClick={togglePasswordVisibility}
                            ></i>
                        </div>
                    </div>
                    {isRegistering && (
                        <div className="login__box">
                            <i className="ri-lock-2-line login__icon"></i>
                            <div className="login__box-input">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="login__input"
                                    id="confirm-pass"
                                    placeholder=" "
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <label htmlFor="confirm-pass" className="login__label">Confirm Password</label>
                                <i
                                    className={showPassword ? "ri-eye-line login__eye" : "ri-eye-off-line login__eye"}
                                    id="confirm-eye"
                                    onClick={togglePasswordVisibility}
                                ></i>
                            </div>
                        </div>
                    )}
                    {!isRegistering && (
                        <div className="login__socials">
                            <p>Or login with:</p>
                            <div className="login__social-icons">
                                <i className="ri-google-line login__social-icon" title="Login with Google"></i>
                                <i className="ri-facebook-circle-line login__social-icon" title="Login with Facebook"></i>
                                <i className="ri-twitter-line login__social-icon" title="Login with Twitter"></i>
                            </div>
                        </div>
                    )}
                    <button type="submit" className="login__button">
                        {isRegistering ? 'Create Account' : 'Login'}
                    </button>
                    <p className="login__register">
                        {isRegistering ? (
                            <>Already have an account? <a href="#" onClick={handleToggleRegister}>Login</a></>
                        ) : (
                            <>Don't have an account? <a href="#" onClick={handleToggleRegister}>Register</a></>
                        )}
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
