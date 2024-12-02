import React, { useState, useEffect } from 'react';
import './Weather.css';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('Washington'); // Default city
    const [error, setError] = useState(false);

    const API_KEY = '9505fd1df737e20152fbd78cdb289b6a';
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}`;

    const searchWeather = async (city) => {
        try {
            const response = await fetch(`${API_URL}&q=${city}`);
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
        searchWeather('Washington'); // Default search
    }, []);

    return (
        <main className={`weather-main ${error ? 'error' : ''}`}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter city"
                    autoComplete="off"
                />
                <button type="submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
            {weatherData && (
                <section className="result">
                    <figure className="name">
                        <figcaption>{weatherData.name}</figcaption>
                        <img
                            src={`https://flagsapi.com/${weatherData.sys.country}/shiny/32.png`}
                            alt={`${weatherData.sys.country} flag`}
                        />
                    </figure>
                    <figure className="temperature">
                        <img
                            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                            alt="weather icon"
                        />
                        <figcaption>
                            <span>{Math.round(weatherData.main.temp)}</span>
                            <sup>°</sup>
                        </figcaption>
                    </figure>
                    <p className="description">{weatherData.weather[0].description}</p>
                    <ul>
                        <li>
                            <span>Clouds</span>
                            <span id="clouds">{weatherData.clouds.all}%</span>
                        </li>
                        <li>
                            <span>Humidity</span>
                            <span id="humidity">{weatherData.main.humidity}%</span>
                        </li>
                        <li>
                            <span>Pressure</span>
                            <span id="pressure">{weatherData.main.pressure} hPa</span>
                        </li>
                    </ul>
                </section>
            )}
        </main>
    );
};

export default Weather;
