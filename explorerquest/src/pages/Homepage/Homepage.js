import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/Menu/Menu";

import "./Homepage.css";

const Homepage = () => {
    const [menuActive, setMenuActive] = useState(false);
    const [days, setDays] = useState(1); // Stato per il numero di giorni selezionati
    const [tripName, setTripName] = useState(""); // Stato per il nome del viaggio
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuActive((prev) => !prev);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 500) {
                document.getElementById("hp-col-left").classList.add("hp-fade-in-left");
                setTimeout(() => {
                    document.getElementById("hp-col-right").classList.add("hp-fade-in-bottom");
                }, 500);
            }
        };

        const scrollDown = () => {
            let scrollCount = window.pageYOffset;
            const scrollStep = () => {
                scrollCount += 25;
                if (scrollCount < document.getElementById("hp-hero").clientHeight) {
                    window.scrollTo(0, scrollCount);
                    requestAnimationFrame(scrollStep);
                }
            };
            requestAnimationFrame(scrollStep);
        };

        const scrollIcon = document.getElementById("hp-scroll-icon");
        const scrollButton = document.getElementById("hp-scroll-button");

        scrollIcon?.addEventListener("click", scrollDown);
        scrollButton?.addEventListener("click", scrollDown);
        window.addEventListener("scroll", handleScroll);

        return () => {
            scrollIcon?.removeEventListener("click", scrollDown);
            scrollButton?.removeEventListener("click", scrollDown);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const navigateToItinerary = () => {
        navigate("/itinerary", { state: { days, tripName } }); // Passa numero di giorni e nome del viaggio come stato
    };

    return (
        <div className={`hp-container ${menuActive ? "hp-menu-open" : ""}`} id="hp-container">
            <Menu menuActive={menuActive} toggleMenu={toggleMenu} />
            <div className="hp-hero" id="hp-hero">
                <div className="hp-hero-content">
                    <h1>
                        NON TUTTI COLORO CHE VAGANO SONO <span className="hp-highlight">PERDUTI</span>.
                        <br />
                        <span>
                            LA TUA <span className="hp-highlight">AVVENTURA</span> INIZIA QUI.
                        </span>
                    </h1>
                    <div className="hp-description">
                        Immagina un viaggio che ti rispecchi completamente, un'avventura che nasca dalla tua immaginazione
                        e dai tuoi sogni. Che tu voglia scoprire terre lontane, esplorare culture affascinanti o
                        semplicemente perderti in un paesaggio mozzafiato, siamo qui per aiutarti a rendere reale la tua
                        visione.
                    </div>
                    <div className="hp-buttons">
                        <button className="hp-button" id="hp-scroll-button">
                            INIZIA A ESPLORARE
                        </button>
                    </div>
                </div>
                <i className="fa fa-angle-double-down hp-fa-angle-double-down" id="hp-scroll-icon"></i>
                <div className="hp-gradient-overlay"></div>
            </div>
            <div className="hp-flex-wrapper">
                <div className="hp-section">
                    <div className="hp-gradient-2-overlay"></div>
                    <div className="hp-col-left" id="hp-col-left">
                        <h2>
                            TI PIACE <span className="hp-highlight-secondary">VIAGGIARE</span>?
                        </h2>
                        <div className="hp-paragraph">
                            Noi crediamo che ogni viaggio debba essere unico, proprio come te. Lascia che le tue passioni
                            guidino il tuo percorso: che si tratti di avventure in natura, esperienze culinarie, o di una
                            ricerca di pace e serenità. Costruiamo insieme un'esperienza che racconti la tua storia.
                        </div>
                    </div>
                    <div className="hp-col-right" id="hp-col-right">
                        <div className="hp-col-right-overlay"></div>
                        Inizia qui il primo passo del tuo viaggio, dall'ispirazione iniziale alla realizzazione del tuo
                        sogno. Viaggia, condividi le tue esperienze ed esplora il mondo.
                        <div className="hp-input-container">
                            <input
                                className="hp-input"
                                type="text"
                                placeholder="Il nome del tuo viaggio"
                                value={tripName}
                                onChange={(e) => setTripName(e.target.value)}
                            />
                            <div className="hp-select-container">
                                <label htmlFor="hp-days">Numero di giorni:</label>
                                <select
                                    id="hp-days"
                                    className="hp-input"
                                    value={days}
                                    onChange={(e) => setDays(Number(e.target.value))}
                                >
                                    {[...Array(30).keys()].map((day) => (
                                        <option key={day + 1} value={day + 1}>
                                            {day + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button className="hp-button hp-full-width" onClick={navigateToItinerary}>
                                Fai il tuo primo passo!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
