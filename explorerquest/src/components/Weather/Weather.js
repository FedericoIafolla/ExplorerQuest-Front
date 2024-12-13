import React, { useState, useEffect } from 'react';
import './Weather.css';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [error, setError] = useState(false);

    const API_KEY = '9505fd1df737e20152fbd78cdb289b6a';
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=it&appid=${API_KEY}`;


    const searchWeather = async (city) => {
        try {
            const cityWithCountry = city.toLowerCase() === 'roma' ? 'Roma, IT' : city;
            const response = await fetch(`${API_URL}&q=${cityWithCountry}`);
            const data = await response.json();

            if (data.cod === 200) {
                setWeatherData(data);
                setError(false);
            } else {
                setError(true);
                setTimeout(() => setError(false), 1000);
            }
        } catch {
            setError(true);
            setTimeout(() => setError(false), 1000);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== '') {
            searchWeather(searchTerm);
            setSearchTerm('');
        }
    };

    useEffect(() => {
        searchWeather('Roma, IT');
    }, []);

    return (
        <main className={`weather-main ${error ? 'error' : ''}`}>
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    id="name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Inserisci città"
                    autoComplete="off"
                />
                <button type="submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
            <form className="date-form">
                <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </form>
            {weatherData && (
                <section className="result">
                    <figure className="name">
                        <figcaption>{weatherData.name}</figcaption>
                        <img
                            src={`https://flagsapi.com/${weatherData.sys.country}/shiny/32.png`}
                            alt={`Bandiera di ${weatherData.sys.country}`}
                        />
                    </figure>
                    <figure className="temperature">
                        <img
                            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                            alt="icona meteo"
                        />
                        <figcaption>
                            <span>{Math.round(weatherData.main.temp)}</span>
                            <sup>°</sup>
                        </figcaption>
                    </figure>
                    <p className="description">{weatherData.weather[0].description}</p>
                    <ul>
                        <li>
                            <span>Nuvole</span>
                            <span id="clouds">{weatherData.clouds.all}%</span>
                        </li>
                        <li>
                            <span>Umidità</span>
                            <span id="humidity">{weatherData.main.humidity}%</span>
                        </li>
                        <li>
                            <span>Pressione</span>
                            <span id="pressure">{weatherData.main.pressure} hPa</span>
                        </li>
                    </ul>
                </section>
            )}
        </main>
    );
};

export default Weather;
