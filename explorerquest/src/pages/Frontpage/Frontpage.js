import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './Frontpage.css';
import roma from '../../assets/Roma.jpg';
import kamakura from '../../assets/Kamakura.jpg';
import newyork from '../../assets/NewYork.jpg';
import kyoto from '../../assets/Kyoto.jpg';
import paris from '../../assets/Parigi.jpg';
import atene from '../../assets/Atene.jpg';
import tajmahal from '../../assets/TajMahal.jpg';
import machupichu from '../../assets/MachuPichu.jpg';
import sanpaolo from '../../assets/SanPaolo.jpg';
import londra from '../../assets/Londra.jpg';
import LoginModal from '../../components/LoginModal/LoginModal';
import '../../components/LoginModal/LoginModal.css';

const Frontpage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [roma, kamakura, newyork, kyoto, paris, atene, tajmahal, machupichu, sanpaolo, londra];
    const [showSubscribeModal, setShowSubscribeModal] = useState(false);
    const [showSeeMoreModal, setShowSeeMoreModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const timeAutoNext = 7000;
    const timerRef = useRef(null);
    const navigate = useNavigate();

    const showSlider = (type) => {
        const carousel = document.querySelector('.carousel');
        const slider = carousel.querySelector('.list');
        const thumbnailBorder = document.querySelector('.carousel .thumbnail');
        const sliderItems = slider.querySelectorAll('.carousel .list .item');
        const thumbnailItems = document.querySelectorAll('.carousel .thumbnail .item');

        if (type === 'next') {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            slider.appendChild(sliderItems[0]);
            thumbnailBorder.appendChild(thumbnailItems[0]);
            carousel.classList.add('next');
        } else {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
            slider.prepend(sliderItems[sliderItems.length - 1]);
            thumbnailBorder.prepend(thumbnailItems[thumbnailItems.length - 1]);
            carousel.classList.add('prev');
        }

        setTimeout(() => {
            carousel.classList.remove('next');
            carousel.classList.remove('prev');
        }, 800);
    };

    const handleNext = () => {
        resetTimer();
        showSlider('next');
    };

    const handlePrev = () => {
        const content = document.querySelector('.list .item .content');
        content.classList.add('instant-hide');
        resetTimer();
        showSlider('prev');
        setTimeout(() => {
            content.classList.remove('instant-hide');
        }, 100);
    };

    const resetTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            showSlider('next');
        }, timeAutoNext);
    };

    useEffect(() => {
        resetTimer();
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);
    const handleButtonClick = (action) => {
        if (action === 'SEE MORE') {
            // Naviga alla nuova pagina
            navigate('/starttotravel');
        } else if (action === 'SUBSCRIBE') {
            setShowLoginModal(true);
        }
    };

    useEffect(() => {
        const carousel = document.querySelector('.carousel');
        const slider = carousel.querySelector('.list');
        const thumbnailBorder = document.querySelector('.carousel .thumbnail');
        const thumbnailItems = thumbnailBorder.querySelectorAll('.item');

        let timeRunning = 2000;
        let timeAutoNext = 8000;

        const showSlider = (type) => {
            const carousel = document.querySelector('.carousel');
            const slider = carousel.querySelector('.list');
            const thumbnailBorder = document.querySelector('.carousel .thumbnail');
            const sliderItems = slider.querySelectorAll('.carousel .list .item');
            const thumbnailItems = document.querySelectorAll('.carousel .thumbnail .item');

            if (type === 'next') {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
                slider.appendChild(sliderItems[0]);
                thumbnailBorder.appendChild(thumbnailItems[0]);
                carousel.classList.add('next');
            } else {
                setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
                slider.prepend(sliderItems[sliderItems.length - 1]);
                thumbnailBorder.prepend(thumbnailItems[thumbnailItems.length - 1]);
                carousel.classList.add('prev');
            }

            setTimeout(() => {
                carousel.classList.remove('next');
                carousel.classList.remove('prev');
            }, 1000);
        };

        const runNextAuto = setInterval(() => {
            showSlider('next');
        }, timeAutoNext);

        return () => {
            clearInterval(runNextAuto);
        };
    }, [currentIndex]);

    return (
        <div>
            <Navbar />
            <div className="carousel">
                <div className="arrows">
                    <button onClick={handlePrev} id="prev">&lt;</button>
                    <button onClick={handleNext} id="next">&gt;</button>
                </div>
                <div className="list">
                    <div className="item">
                        <img src={images[currentIndex]} alt="Roma" />
                        <div className="content">
                            <div className="author">EXPLORER QUEST</div>
                            <div className="title">ROMA</div>
                            <div className="topic">ITALIA</div>
                            <div className="des">
                                Scopri Roma, la città eterna dove storia e cultura si intrecciano. Passeggia tra antiche rovine come il Colosseo e il Foro Romano, ammira la maestosità della Basilica di San Pietro e goditi la magia di una città che incanta in ogni angolo.
                            </div>
                            <div className="buttons">
                                <button onClick={() => handleButtonClick('SEE MORE')}>Perché partire?</button>
                                <button onClick={() => handleButtonClick('SUBSCRIBE')}>Accedi</button>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={kamakura} alt="Kamakura" />
                        <div className="content">
                            <div className="author">EXPLORER QUEST</div>
                            <div className="title">KAMAKURA</div>
                            <div className="topic">JAPAN</div>
                            <div className="des">
                                Kamakura è un'oasi di pace e bellezza in Giappone. Celebre per il Grande Buddha e i templi Zen come il Kotoku-in, è il luogo perfetto per immergersi nella spiritualità e nella serenità della cultura giapponese.
                            </div>
                            <div className="buttons">
                                <button onClick={() => handleButtonClick('SEE MORE')}>Perché partire?</button>
                                <button onClick={() => handleButtonClick('SUBSCRIBE')}>Accedi</button>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={newyork} alt="New York" />
                        <div className="content">
                            <div className="author">EXPLORER QUEST</div>
                            <div className="title">NEW YORK</div>
                            <div className="topic">USA</div>
                            <div className="des">
                                Vivi l'energia di New York, la città che non dorme mai. Dalla Statua della Libertà a Central Park, passando per i grattacieli di Manhattan, questa metropoli è il centro pulsante di cultura, arte e innovazione.
                            </div>
                            <div className="buttons">
                                <button onClick={() => handleButtonClick('SEE MORE')}>Perché partire?</button>
                                <button onClick={() => handleButtonClick('SUBSCRIBE')}>Accedi</button>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={kyoto} alt="Kyoto" />
                        <div className="content">
                            <div className="author">EXPLORER QUEST</div>
                            <div className="title">KYOTO</div>
                            <div className="topic">JAPAN</div>
                            <div className="des">
                                Kyoto è il cuore culturale del Giappone. Famosa per i suoi templi buddisti, come il Kinkaku-ji, e i suoi giardini Zen, la città offre un viaggio nel tempo tra geisha, case da tè tradizionali e paesaggi mozzafiato.
                            </div>
                            <div className="buttons">
                                <button onClick={() => handleButtonClick('SEE MORE')}>Perché partire?</button>
                                <button onClick={() => handleButtonClick('SUBSCRIBE')}>Accedi</button>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={paris} alt="Parigi" />
                        <div className="content">
                            <div className="author">EXPLORER QUEST</div>
                            <div className="title">PARIGI</div>
                            <div className="topic">FRANCE</div>
                            <div className="des">
                                Parigi, la città dell'amore e delle luci, è un capolavoro di bellezza e romanticismo. Visita la Torre Eiffel, passeggia lungo la Senna e immergiti nell'arte del Louvre per vivere un'esperienza indimenticabile.
                            </div>
                            <div className="buttons">
                                <button onClick={() => handleButtonClick('SEE MORE')}>Perché partire?</button>
                                <button onClick={() => handleButtonClick('SUBSCRIBE')}>Accedi</button>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={londra} alt="Londra" />
                        <div className="content">
                            <div className="author">EXPLORER QUEST</div>
                            <div className="title">LONDRA</div>
                            <div className="topic">ENGLAND</div>
                            <div className="des">
                                Londra è una città vibrante dove storia e modernità convivono. Ammira il Big Ben, il Tower Bridge e Buckingham Palace, e goditi l’atmosfera unica dei mercati, dei parchi e dei quartieri cosmopoliti.
                            </div>
                            <div className="buttons">
                                <button onClick={() => handleButtonClick('SEE MORE')}>Perché partire?</button>
                                <button onClick={() => handleButtonClick('SUBSCRIBE')}>Accedi</button>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={atene} alt="Acropoli di Atene" />
                        <div className="content">
                            <div className="author">EXPLORER QUEST</div>
                            <div className="title">ATENE</div>
                            <div className="topic">GREECE</div>
                            <div className="des">
                                Atene, culla della civiltà occidentale, offre un mix di storia antica e vita moderna. Esplora l'Acropoli e il Partenone, passeggia nei vicoli del quartiere Plaka e goditi il tramonto sull'antico Agorà.
                            </div>
                            <div className="buttons">
                                <button onClick={() => handleButtonClick('SEE MORE')}>Perché partire?</button>
                                <button onClick={() => handleButtonClick('SUBSCRIBE')}>Accedi</button>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={tajmahal} alt="Taj Mahal" />
                        <div className="content">
                            <div className="author">EXPLORER QUEST</div>
                            <div className="title">TAJ MAHAL</div>
                            <div className="topic">INDIA</div>
                            <div className="des">
                                Il Taj Mahal, simbolo d'amore eterno, è uno dei monumenti più spettacolari del mondo. Situato ad Agra, in India, incanta i visitatori con la sua architettura in marmo bianco e la sua storia commovente.
                            </div>
                            <div className="buttons">
                                <button onClick={() => handleButtonClick('SEE MORE')}>Perché partire?</button>
                                <button onClick={() => handleButtonClick('SUBSCRIBE')}>Accedi</button>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={sanpaolo} alt="San Paolo" />
                        <div className="content">
                            <div className="author">EXPLORER QUEST</div>
                            <div className="title">SAN PAOLO</div>
                            <div className="topic">BRASIL</div>
                            <div className="des">
                                San Paolo, cuore pulsante del Brasile, è una metropoli cosmopolita ricca di cultura e diversità. Esplora il quartiere artistico di Vila Madalena, i musei di fama mondiale e assapora la vibrante cucina brasiliana.
                            </div>
                            <div className="buttons">
                                <button onClick={() => handleButtonClick('SEE MORE')}>Perché partire?</button>
                                <button onClick={() => handleButtonClick('SUBSCRIBE')}>Accedi</button>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={machupichu} alt="Machu Pichu" />
                        <div className="content">
                            <div className="author">EXPLORER QUEST</div>
                            <div className="title">MACHU PICHU</div>
                            <div className="topic">MEXICO</div>
                            <div className="des">
                                Machu Picchu, la città perduta degli Inca, è un sito archeologico unico nelle Ande con panorami mozzafiato e un profondo legame spirituale.
                            </div>
                            <div className="buttons">
                                <button onClick={() => handleButtonClick('SEE MORE')}>Perché partire?</button>
                                <button onClick={() => handleButtonClick('SUBSCRIBE')}>Accedi</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="thumbnail">
                    <div className="item">
                        <img src={kamakura} alt="Thumbnail Kamakura" />
                        <div className="content">
                            <div className="title">KAMAKURA</div>
                            <div className="description">Fascino giapponese</div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={newyork} alt="Thumbnail New York" />
                        <div className="content">
                            <div className="title">NEW YORK</div>
                            <div className="description">La Grande Mela</div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={kyoto} alt="Thumbnail Kyoto" />
                        <div className="content">
                            <div className="title">KYOTO</div>
                            <div className="description">Templi e giardini zen</div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={paris} alt="Thumbnail Parigi" />
                        <div className="content">
                            <div className="title">PARIGI</div>
                            <div className="description">Città dell'amore</div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={londra} alt="Thumbnail Londra" />
                        <div className="content">
                            <div className="title">LONDRA</div>
                            <div className="description">Tradizione e modernità</div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={atene} alt="Thumbnail Atene" />
                        <div className="content">
                            <div className="title">ATENE</div>
                            <div className="description">Culla della civiltà</div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={tajmahal} alt="Thumbnail Taj Mahal" />
                        <div className="content">
                            <div className="title">TAJ MAHAL</div>
                            <div className="description">Simbolo d'amore eterno</div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={sanpaolo} alt="Thumbnail San Paolo" />
                        <div className="content">
                            <div className="title">San Paolo</div>
                            <div className="description">Energia cosmopolita</div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={machupichu} alt="Thumbnail Machu Pichu" />
                        <div className="content">
                            <div className="title">Machu Pichu</div>
                            <div className="description">Meraviglia sulle Ande</div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={roma} alt="Thumbnail Roma" />
                        <div className="content">
                            <div className="title">ROMA</div>
                            <div className="description">La città eterna</div>
                        </div>
                    </div>
                </div>
            </div>

            {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
        </div>
    );
};

export default Frontpage;