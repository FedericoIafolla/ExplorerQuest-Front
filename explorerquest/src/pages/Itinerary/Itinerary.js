import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Weather from "../../components/Weather/Weather";
import TouristSpot from "../../components/TouristSpot/TouristSpot";
import Navbar from "../../components/Navbar/Navbar";
import "./Itinerary.css";

const Itinerary = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const tripName = location.state?.tripName || "Itinerario";
    const initialDays = location.state?.days || 1;

    const [items, setItems] = useState([]);
    const [showWeatherModal, setShowWeatherModal] = useState(false);
    const [showTouristSpotModal, setShowTouristSpotModal] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const [isNavbarVisible, setIsNavbarVisible] = useState(false);

    const timelineRef = useRef(null); // Reference to the timeline container

    const toggleMenu = () => {
        setMenuActive((prev) => !prev);
    };

    useEffect(() => {
        const updateNavbarVisibility = () => {
            setIsNavbarVisible(window.innerWidth >= 1627);
        };

        updateNavbarVisibility();
        window.addEventListener("resize", updateNavbarVisibility);

        return () => {
            window.removeEventListener("resize", updateNavbarVisibility);
        };
    }, []);

    useEffect(() => {
        const initialItems = Array.from({ length: initialDays }, (_, index) => ({
            title: `Giorno ${index + 1}`,
            description: `Questo è il contenuto del giorno ${index + 1}.`,
            isPlaceholder: true,
        }));
        setItems(initialItems);
    }, [initialDays]);

    useEffect(() => {
        const itineraryListElement = document.querySelector(".itinerary-list");
        if (itineraryListElement) {
            itineraryListElement.style.setProperty("--total-items", items.length * 2);
        }
    }, [items]);

    const handleEdit = (index, field, value) => {
        setItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index] = { ...updatedItems[index], [field]: value };
            return updatedItems;
        });
    };

    const addDay = () => {
        setItems((prevItems) => [
            ...prevItems,
            {
                title: `Giorno ${prevItems.length + 1}`,
                description: `Questo è il contenuto del giorno ${prevItems.length + 1}.`,
                isPlaceholder: true,
            },
        ]);
    };

    const deleteDay = (index) => {
        setItems((prevItems) => prevItems.filter((_, i) => i !== index));
    };

    const handleDrop = (event, index) => {
        event.preventDefault();
        const spot = JSON.parse(event.dataTransfer.getData("spot"));

        const visitText = `Visitare ${spot.properties?.name || "Nome non disponibile"}, ${spot.properties?.formatted || "Indirizzo non disponibile"}.\n`;

        setItems((prevItems) =>
            prevItems.map((item, i) =>
                i === index
                    ? {
                        ...item,
                        description: item.isPlaceholder
                            ? visitText
                            : item.description + visitText,
                        isPlaceholder: false,
                    }
                    : item
            )
        );
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const closeModal = (e, setShowModal) => {
        if (e.target.classList.contains("modal-overlay")) {
            setShowModal(false);
        }
    };

    const handleSaveAsPDF = async () => {
        const timelineElement = timelineRef.current;

        if (timelineElement) {
            // Nascondi elementi non necessari
            const bottomBar = document.querySelector(".itinerary-bottom-bar");
            if (bottomBar) bottomBar.style.display = "none";

            try {
                // Crea un canvas dall'elemento timeline
                const canvas = await html2canvas(timelineElement, {
                    scale: 3, // Aumenta il valore per una qualità migliore
                    useCORS: true,
                    scrollX: -window.scrollX, // Evita problemi con lo scroll
                    scrollY: -window.scrollY,
                });

                const imgData = canvas.toDataURL("image/png");

                // Configura il PDF
                const pdf = new jsPDF("p", "mm", "a4");
                const imgWidth = 210; // Larghezza della pagina A4
                const pageHeight = 297; // Altezza della pagina A4
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                let heightLeft = imgHeight;
                let position = 0;

                // Aggiunge pagine al PDF se necessario
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft > 0) {
                    position -= pageHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                // Salva il PDF
                pdf.save(`${tripName}.pdf`);
            } catch (error) {
                console.error("Errore durante la generazione del PDF:", error);
            }

            // Ripristina visibilità della bottom bar
            if (bottomBar) bottomBar.style.display = "flex";
        }
    };



    const handleSave = () => {
        alert("Itinerario salvato con successo!");
    };

    return (
        <div className="itinerary-container">
            {isNavbarVisible && <Navbar />}

            {showWeatherModal && (
                <div
                    className="modal-overlay"
                    onClick={(e) => closeModal(e, setShowWeatherModal)}
                >
                    <Weather />
                </div>
            )}

            {showTouristSpotModal && (
                <div
                    className="modal-overlay"
                    onClick={(e) => closeModal(e, setShowTouristSpotModal)}
                >
                    <TouristSpot />
                </div>
            )}

            <div className="itinerary-sticky-modals">
                <div className="itinerary-left-modal">
                    <Weather />
                </div>
                <div className="itinerary-right-modal">
                    <TouristSpot />
                </div>
            </div>

            <h1 className="itinerary-title">{tripName}</h1>
            <ul className="itinerary-list" ref={timelineRef}>
                {items.map((item, index) => (
                    <li
                        key={index}
                        className="itinerary-item"
                        style={{
                            "--accent-color": [
                                "#41516C",
                                "#FBCA3E",
                                "#E24A68",
                                "#1B5F8C",
                                "#4CADAD",
                            ][index % 5],
                        }}
                        onDragOver={handleDragOver}
                        onDrop={(event) => handleDrop(event, index)}
                    >
                        <div className="itinerary-date">
                            Giorno {index + 1}
                            <button
                                className="delete-day-button"
                                onClick={() => deleteDay(index)}
                                aria-label={`Elimina giorno ${index + 1}`}
                            >
                                ✖
                            </button>
                        </div>
                        <input
                            type="text"
                            className="itinerary-title-input"
                            value={item.title || ""}
                            onChange={(e) => handleEdit(index, "title", e.target.value)}
                        />
                        <textarea
                            className="itinerary-descr-input"
                            value={item.description || ""}
                            onChange={(e) => handleEdit(index, "description", e.target.value)}
                        />
                    </li>
                ))}
            </ul>

            <div className="itinerary-bottom-bar">
                <div className="itinerary-flex h-full max-w-lg justify-between mx-auto">
                    <button
                        type="button"
                        onClick={() => navigate("/homepage")}
                        className="itinerary-inline-flex itinerary-flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                    >
                        <svg
                            className="itinerary-icon w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                        >
                            <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                        </svg>
                        <span className="sr-only">Home</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowWeatherModal(true)}
                        className="itinerary-inline-flex itinerary-flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                    >
                        <svg
                            className="itinerary-icon w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                        >
                            <path d="M160 64c-26.5 0-48 21.5-48 48l0 164.5c0 17.3-7.1 31.9-15.3 42.5C86.2 332.6 80 349.5 80 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9c-8.2-10.6-15.3-25.2-15.3-42.5L208 112c0-26.5-21.5-48-48-48zM48 112C48 50.2 98.1 0 160 0s112 50.1 112 112l0 164.4c0 .1 .1 .3 .2 .6c.2 .6 .8 1.6 1.7 2.8c18.9 24.4 30.1 55 30.1 88.1c0 79.5-64.5 144-144 144S16 447.5 16 368c0-33.2 11.2-63.8 30.1-88.1c.9-1.2 1.5-2.2 1.7-2.8c.1-.3 .2-.5 .2-.6L48 112zM208 368c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3L144 208c0-8.8 7.2-16 16-16s16 7.2 16 16l0 114.7c18.6 6.6 32 24.4 32 45.3z" />
                        </svg>
                        <span className="sr-only">Meteo</span>
                    </button>
                    <button
                        type="button"
                        onClick={addDay}
                        className="itinerary-inline-flex itinerary-flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                    >
                        <svg
                            className="itinerary-icon w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 1v16M1 9h16"
                            />
                        </svg>
                        <span className="sr-only">Aggiungi Giorno</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowTouristSpotModal(true)}
                        className="itinerary-inline-flex itinerary-flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                    >
                        <svg
                            className="itinerary-icon w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                        </svg>
                        <span className="sr-only">Attrazioni</span>
                    </button>
                    <button
                        type="button"
                        onClick={handleSaveAsPDF}
                        className="itinerary-inline-flex itinerary-flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                    >
                        <svg
                            className="itinerary-icon w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                        >
                            <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                        </svg>
                        <span className="sr-only">Salva</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Itinerary;
