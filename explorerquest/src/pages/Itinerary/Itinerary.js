import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Weather from '../../components/Weather/Weather';
import TouristSpot from '../../components/TouristSpot/TouristSpot';
import './Itinerary.css';

const Itinerary = () => {
    const location = useLocation();
    const tripName = location.state?.tripName || "Itinerario";
    const initialDays = location.state?.days || 1;
    const [items, setItems] = useState([]);

    useEffect(() => {
        const initialItems = Array.from({ length: initialDays }, (_, index) => ({
            year: 2000 + index + 1,
            title: `Title ${index + 1}`,
            description: `Questo è il contenuto del giorno ${index + 1}.`,
        }));
        setItems(initialItems);
    }, [initialDays]);

    const handleEdit = (index, field, value) => {
        setItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index] = { ...updatedItems[index], [field]: value };
            return updatedItems;
        });
    };

    return (
        <div className="itinerary-container">
            <div className="itinerary-sticky-modals">
                <div className="itinerary-sticky-modal itinerary-left-modal">
                    <Weather />
                </div>
                <div className="itinerary-sticky-modal itinerary-right-modal">
                    <TouristSpot />
                </div>
            </div>

            <h1 className="itinerary-title">{tripName}</h1>
            <ul className="itinerary-list">
                {items.map((item, index) => (
                    <li
                        key={index}
                        className="itinerary-item"
                        style={{
                            '--accent-color': ['#41516C', '#FBCA3E', '#E24A68', '#1B5F8C', '#4CADAD'][index % 5],
                        }}
                    >
                        <div className="itinerary-date">Giorno {index + 1}</div>
                        <input
                            type="text"
                            className="itinerary-title-input"
                            value={item.title || ''}
                            onChange={(e) => handleEdit(index, 'title', e.target.value)}
                        />
                        <textarea
                            className="itinerary-descr-input"
                            value={item.description || ''}
                            onChange={(e) => handleEdit(index, 'description', e.target.value)}
                        />
                    </li>
                ))}
            </ul>

            {/* Bottom Bar con 5 icone */}
            <div className="itinerary-bottom-bar">
                <div className="itinerary-flex h-full max-w-lg justify-between mx-auto">
                    <button type="button" className="itinerary-inline-flex itinerary-flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <svg className="itinerary-icon w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 1 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                        </svg>
                        <span className="sr-only">Home</span>
                    </button>
                    <button type="button" className="itinerary-inline-flex itinerary-flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <svg className="itinerary-icon w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
                            <path d="M13 20a1 1 0 0 1-.64-.231L7 15.3l-5.36 4.469A1 1 0 0 1 0 19V2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v17a1 1 0 0 1-1 1Z" />
                        </svg>
                        <span className="sr-only">Bookmark</span>
                    </button>
                    <button type="button" className="itinerary-inline-flex itinerary-flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <svg className="itinerary-icon w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                        </svg>
                        <span className="sr-only">New post</span>
                    </button>
                    <button type="button" className="itinerary-inline-flex itinerary-flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <svg className="itinerary-icon w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                    <button type="button" className="itinerary-inline-flex itinerary-flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <svg className="itinerary-icon w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
                        </svg>
                        <span className="sr-only">Settings</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Itinerary;
