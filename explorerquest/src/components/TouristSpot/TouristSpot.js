import React, { useState } from "react";
import "./TouristSpot.css";

const TouristSpot = () => {
    const [city, setCity] = useState("");
    const [spots, setSpots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!city.trim()) {
            alert("Per favore, inserisci il nome di una città!");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Devi effettuare il login per cercare punti di interesse.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `http://localhost:8080/api/itineraries/search?city=${city}&lang=it`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("Non autorizzato. Effettua nuovamente il login.");
                }
                throw new Error("Errore durante il recupero dei punti di interesse.");
            }

            const data = await response.json();
            setSpots(data.features || []);
        } catch (error) {
            console.error("Errore durante il recupero dei punti di interesse:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDragStart = (event, spot) => {

        event.dataTransfer.setData("spot", JSON.stringify(spot));
    };

    const getLocalizedValue = (property, fallback) => {
        return property?.["it"] || property || fallback;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearch();
    };

    return (
        <div className="TouristSpot-modal">
            <form action="javascript:" className="TouristSpot-search-bar" onSubmit={handleSubmit}>
                <input
                    type="search"
                    name="search"
                    pattern=".*\S.*"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="TouristSpot-search-input"
                />
                <button className="TouristSpot-search-btn" type="submit">
                    <span>Search</span>
                </button>
            </form>

            {loading && <p className="TouristSpot-loading-message">Caricamento in corso...</p>}
            {error && <p className="TouristSpot-error-message">{error}</p>}

            <div className="TouristSpot-spots-container">
                {spots.length > 0 ? (
                    spots.map((spot, index) => (
                        <div
                            key={index}
                            className="TouristSpot-spot-card"
                            draggable
                            onDragStart={(event) => handleDragStart(event, spot)}
                        >

                            {getLocalizedValue(spot.properties?.name) && (
                                <h3>{getLocalizedValue(spot.properties.name, "Nome non disponibile")}</h3>
                            )}

                            {getLocalizedValue(spot.properties?.description) && (
                                <p>
                                    <strong>Descrizione:</strong> {getLocalizedValue(spot.properties.description)}
                                </p>
                            )}

                            {spot.properties?.formatted && (
                                <p>
                                    <strong>Indirizzo:</strong> {spot.properties.formatted}
                                </p>
                            )}
                        </div>
                    ))
                ) : (
                    !loading && <p className="TouristSpot-no-results-message">Inserisci una località e ti mostrerò le principali attrazioni!</p>
                )}
            </div>
        </div>
    );
};

export default TouristSpot;
