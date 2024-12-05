import React, { useState } from 'react';
import axios from 'axios';
import './TouristSpot.css';

const TouristSpot = () => {
    const [location, setLocation] = useState('');
    const [type, setType] = useState('attractions');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.post('https://travel-advisor.p.rapidapi.com/locations/v2/list-nearby', {
                params: {
                    query: location,
                    lang: 'en_US',
                    units: 'km'
                }
            }, {
                headers: {
                    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
                    'X-RapidAPI-Key': '95a50cb7f9msh9a6170f7b8a25eap1dc406jsn1dade804b894'
                }
            });
            setResults(response.data.data.filter(item => item.category.key === type));
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    return (
        <main className="tourist-spot__main">
            <section className="tourist-spot__content">
                <h2 className="tourist-spot__title">Attrazioni Turistiche</h2>
                <div className="tourist-spot__search">
                    <input
                        type="text"
                        placeholder="Inserisci località..."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="tourist-spot__input"
                    />
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="tourist-spot__select"
                    >
                        <option value="attractions">Attrazioni</option>
                        <option value="restaurants">Ristoranti</option>
                        <option value="hotels">Hotel</option>
                    </select>
                    <button onClick={handleSearch} className="tourist-spot__button">Cerca</button>
                </div>
                <div className="tourist-spot__results">
                    {results.slice(0, 5).map((place) => (
                        <div key={place.location_id} className="tourist-spot__result">
                            <p className="tourist-spot__name">{place.name}</p>
                            {place.rating && (
                                <p className="tourist-spot__rating">Valutazione: {place.rating}</p>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default TouristSpot;
