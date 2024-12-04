import React, { useEffect, useState } from 'react';
import './LandingPage.css';
import LoginModal from '../../components/LoginModal/LoginModal';

const LandingPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const nextButton = document.getElementById('landingpage-next');
        const prevButton = document.getElementById('landingpage-prev');

        const carousel = document.querySelector('.landingpage-carousel');
        const slider = carousel.querySelector('.landingpage-carousel .landingpage-list');
        const thumbnailBorder = document.querySelector('.landingpage-carousel .landingpage-thumbnail');

        const timeRunning = 3000;
        const timeAutoNext = 7000;
        let autoNext;
        let clickTimeout = false;

        const showSlider = (type) => {
            clearInterval(autoNext);

            const sliderItems = slider.querySelectorAll('.landingpage-carousel .landingpage-list .landingpage-item');
            const thumbnailItems = document.querySelectorAll('.landingpage-carousel .landingpage-thumbnail .landingpage-item');

            if (type === 'next') {
                slider.appendChild(sliderItems[0]);
                thumbnailBorder.appendChild(thumbnailItems[0]);
                carousel.classList.add('landingpage-next');
            } else {
                slider.prepend(sliderItems[sliderItems.length - 1]);
                thumbnailBorder.prepend(thumbnailItems[thumbnailItems.length - 1]);
                carousel.classList.add('landingpage-prev');
            }

            setTimeout(() => {
                carousel.classList.remove('landingpage-next');
                carousel.classList.remove('landingpage-prev');
            }, timeRunning);

            resetAutoNext();
        };

        const resetAutoNext = () => {
            clearInterval(autoNext);
            autoNext = setInterval(() => {
                nextButton.click();
            }, timeAutoNext);
        };

        nextButton.onclick = () => {
            if (clickTimeout) return;
            clickTimeout = true;
            showSlider('next');
            setTimeout(() => {
                clickTimeout = false;
            }, 1800);
        };

        prevButton.onclick = () => {
            if (clickTimeout) return;
            clickTimeout = true;
            showSlider('prev');
            setTimeout(() => {
                clickTimeout = false;
            }, 200);
        };

        autoNext = setInterval(() => {
            nextButton.click();
        }, timeAutoNext);

        return () => clearInterval(autoNext);
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const cityDescriptions = {
        Roma: "Roma, la città eterna, è ricca di antiche rovine e monumenti iconici come il Colosseo. Perditi tra le stradine di Trastevere e assapora l'autenticità della vita romana. Visita i Musei Vaticani e ammira la magnificenza della Cappella Sistina, un capolavoro senza tempo..",
        Kamakura: "Kamakura, un gioiello del Giappone, è famosa per i templi mozzafiato e il Buddha gigante. Goditi la bellezza naturale e la spiritualità di questa città storica. Passeggia lungo il sentiero di Daibutsu e scopri il fascino della cultura giapponese in ogni angolo.",
        NewYork: "New York, la città che non dorme mai, offre cultura, moda e intrattenimento. Dalla vivace Manhattan ai quartieri artistici di Brooklyn, c'è sempre qualcosa da scoprire. Visita Central Park, il polmone verde della città, e lasciati conquistare dalle luci sfavillanti di Times Square.",
        Londra: "Londra fonde storia e modernità. Visita il Palazzo di Westminster e i mercati vivaci di Camden, oppure esplora musei e teatri che rendono unica questa metropoli cosmopolita. Passeggia lungo il Tamigi e ammira la bellezza della Tower Bridge illuminata di notte.",
        Parigi: "Parigi incanta con la sua architettura elegante e la Torre Eiffel. Passeggia lungo la Senna, visita il Louvre e lasciati affascinare dall'atmosfera romantica della città dell'amore. Non dimenticare di gustare un croissant in un tipico café parigino mentre ammiri la vita cittadina che scorre.",
        SanPaolo: "San Paolo è una metropoli dinamica nota per la diversità culturale e l'energia vibrante. Scopri i quartieri storici, l'arte moderna e la vivace vita notturna della città. Visita Avenida Paulista, il cuore pulsante della città, dove tradizione e innovazione convivono in perfetta armonia.",
        Kyoto: "Kyoto, l'antica capitale giapponese, è famosa per i suoi templi storici e giardini zen. Esplora i vicoli di Gion e immergiti nella cultura e nella serenità di questa città magica. Ammira il Fushimi Inari Taisha con le sue migliaia di torii rossi e scopri la vera essenza del Giappone.",
        TajMahal: "Il Taj Mahal ad Agra, India, è un simbolo di amore eterno. Questo splendido mausoleo di marmo bianco riflette la maestria dell'architettura moghul. Visitalo all'alba per vedere il marmo cambiare colore e lasciati travolgere dall'atmosfera romantica che lo circonda.",
        MachuPichu: "Machu Picchu, tra le Ande del Perù, offre uno sguardo unico sulla cultura Inca. Percorri il Cammino Inca e scopri questo luogo mistico avvolto nella nebbia delle montagne. Ammira la vista mozzafiato dalle antiche terrazze e senti l'energia che emana da questa cittadella storica.",
        Atene: "Atene, la culla della civiltà occidentale, fonde storia e modernità. Visita l'Acropoli, scopri i mercati locali e gusta la cucina tradizionale greca. Goditi una serata a Monastiraki con una vista spettacolare sul Partenone illuminato e vivi l'ospitalità greca autentica.",
    };

    const initialCityOrder = ["Roma", "Kamakura", "NewYork", "Londra", "Parigi", "SanPaolo", "Kyoto", "TajMahal", "MachuPichu", "Atene"];

    return (
        <div className="landingpage-page">
            <header className="landingpage-header">

            </header>
            <div className="landingpage-carousel">
                <div className="landingpage-list">
                    {initialCityOrder.map((city, index) => (
                        <div className="landingpage-item" key={index}>
                            <img src={require(`../../assets/${city}.jpg`)} alt={city} />
                            <div className="landingpage-content">
                                <div className="landingpage-author">Explorer Quest</div>
                                <div className="landingpage-title">{city.toUpperCase()}</div>
                                <div className="landingpage-topic">TRAVEL</div>
                                <div className="landingpage-des">
                                    {cityDescriptions[city]}
                                </div>
                                <div className="landingpage-buttons">
                                    <button>SEE MORE</button>
                                    <button onClick={openModal} className="landingpage-subscribe-button">SUBSCRIBE</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="landingpage-thumbnail">
                    {initialCityOrder.slice(1).concat(initialCityOrder[0]).map((city, index) => (
                        <div className="landingpage-item" key={index}>
                            <img src={require(`../../assets/${city}.jpg`)} alt={`Thumbnail of ${city}`} />
                            <div className="landingpage-content">
                                <div className="landingpage-title">{city}</div>
                                <div className="landingpage-description">Scopri la bellezza di {city}.</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="landingpage-arrows">
                    <button id="landingpage-prev">&lt;</button>
                    <button id="landingpage-next">&gt;</button>
                </div>
            </div>

            {isModalOpen && <LoginModal onClose={closeModal} />}
        </div>
    );
};

export default LandingPage;
