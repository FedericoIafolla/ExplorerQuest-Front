import React, { useEffect, useState } from 'react';
import './Login.css';
import roma from '../assets/Roma.jpg';
import kamakura from '../assets/Kamakura.jpg';
import newyork from '../assets/NewYork.jpg';
import kyoto from '../assets/Kyoto.jpg';
import paris from '../assets/Parigi.jpg';
import atene from '../assets/Atene.jpg'; // Nuova città
import tajmahal from '../assets/TajMahal.jpg'; // Nuova città
import machupichu from '../assets/MachuPichu.jpg'; // Nuova città
import sanpaolo from '../assets/SanPaolo.jpg';
import londra from '../assets/Londra.jpg';

const Login = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [roma, kamakura, newyork, kyoto, paris];
    const [showSubscribeModal, setShowSubscribeModal] = useState(false);
    const [showSeeMoreModal, setShowSeeMoreModal] = useState(false);

    const handleButtonClick = (action) => {
        if (action === 'SEE MORE') {
            setShowSeeMoreModal(true);
        } else if (action === 'SUBSCRIBE') {
            setShowSubscribeModal(true);
        }
    };

    useEffect(() => {
        const carousel = document.querySelector('.carousel');
        const slider = carousel.querySelector('.list');
        const thumbnailBorder = document.querySelector('.carousel .thumbnail');
        const thumbnailItems = thumbnailBorder.querySelectorAll('.item');

        let timeRunning = 2500;
        let timeAutoNext = 7000;

        const showSlider = (type) => {
            const sliderItems = slider.querySelectorAll('.carousel .list .item');
            const thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');

            if (type === 'next') {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderItems.length);
                thumbnailBorder.appendChild(thumbnailItemsDom[0]);
                slider.appendChild(sliderItems[0]);
                carousel.classList.add('next');
            } else {
                setCurrentIndex((prevIndex) => (prevIndex - 1 + sliderItems.length) % sliderItems.length);
                thumbnailBorder.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
                slider.prepend(sliderItems[sliderItems.length - 1]);
                carousel.classList.add('prev');
            }

            setTimeout(() => {
                carousel.classList.remove('next');
                carousel.classList.remove('prev');
            }, timeRunning);
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
            <header>
                <nav>
                    <a href="">Home</a>
                    <a href="">Contacts</a>
                    <a href="">Info</a>
                </nav>
            </header>

            <div className="carousel">
                <div className="list">
                    <div className="item">
                        <img src={images[currentIndex]} alt="Roma" />
                        <div className="content">
                            <div className="author">EXPLORER QUEST</div>
                            <div className="title">ROMA</div>
                            <div className="topic">TRAVEL</div>
                            <div className="des">
                                Esplora la bellezza di Roma, una delle città più iconiche del mondo!
                            </div>
                            <div className="buttons">
                                <button onClick={() => handleButtonClick('SEE MORE')}>SEE MORE</button>
                                <button onClick={() => handleButtonClick('SUBSCRIBE')}>SUBSCRIBE</button>
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
                                Scopri Kamakura, famosa per i suoi templi e la tranquillità!
                            </div>
                            <div className="buttons">
                                <button onClick={() => handleButtonClick('SEE MORE')}>SEE MORE</button>
                                <button onClick={() => handleButtonClick('SUBSCRIBE')}>SUBSCRIBE</button>
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
                                Vivi l'energia e il dinamismo di New York City!
                            </div>
                            <div className="buttons">
                                <button onClick={() => handleButtonClick('SEE MORE')}>SEE MORE</button>
                                <button onClick={() => handleButtonClick('SUBSCRIBE')}>SUBSCRIBE</button>
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
                                Esplora Kyoto, la città dei templi e dei giardini zen!
                            </div>
                            <div className="buttons">
                                <button onClick={() => handleButtonClick('SEE MORE')}>SEE MORE</button>
                                <button onClick={() => handleButtonClick('SUBSCRIBE')}>SUBSCRIBE</button>
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
                                Scopri Parigi, la città dell'amore e delle luci!
                            </div>
                            <div className="buttons">
                                <button onClick={() => handleButtonClick('SEE MORE')}>SEE MORE</button>
                                <button onClick={() => handleButtonClick('SUBSCRIBE')}>SUBSCRIBE</button>
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
                                Scopri Parigi, la città dell'amore e delle luci!
                            </div>
                            <div className="buttons">
                                <button onClick={() => handleButtonClick('SEE MORE')}>SEE MORE</button>
                                <button onClick={() => handleButtonClick('SUBSCRIBE')}>SUBSCRIBE</button>
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
                                Scopri Kamakura, famosa per i suoi templi e la tranquillità!
                            </div>
                            <div className="buttons">
                                <button onClick={() => handleButtonClick('SEE MORE')}>SEE MORE</button>
                                <button onClick={() => handleButtonClick('SUBSCRIBE')}>SUBSCRIBE</button>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={tajmahal} alt="Taj Mahal" />
                        <div className="content">
                            <div className="author">EXPLORER QUEST</div>
                            <div className="title">TAJ MAHAL</div>
                            <div className="topic">JAPAN</div>
                            <div className="des">
                                Scopri Kamakura, famosa per i suoi templi e la tranquillità!
                            </div>
                            <div className="buttons">
                                <button onClick={() => handleButtonClick('SEE MORE')}>SEE MORE</button>
                                <button onClick={() => handleButtonClick('SUBSCRIBE')}>SUBSCRIBE</button>
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
                                Scopri Kamakura, famosa per i suoi templi e la tranquillità!
                            </div>
                            <div className="buttons">
                                <button onClick={() => handleButtonClick('SEE MORE')}>SEE MORE</button>
                                <button onClick={() => handleButtonClick('SUBSCRIBE')}>SUBSCRIBE</button>
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
                                Scopri Kamakura, famosa per i suoi templi e la tranquillità!
                            </div>
                            <div className="buttons">
                                <button onClick={() => handleButtonClick('SEE MORE')}>SEE MORE</button>
                                <button onClick={() => handleButtonClick('SUBSCRIBE')}>SUBSCRIBE</button>
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
                            <div className="description">Fascino giapponese</div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={atene} alt="Thumbnail Atene" />
                        <div className="content">
                            <div className="title">ATENE</div>
                            <div className="description">Fascino giapponese</div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={tajmahal} alt="Thumbnail Taj Mahal" />
                        <div className="content">
                            <div className="title">TAJ MAHAL</div>
                            <div className="description">Fascino giapponese</div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={sanpaolo} alt="Thumbnail San Paolo" />
                        <div className="content">
                            <div className="title">San Paolo</div>
                            <div className="description">Fascino giapponese</div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={machupichu} alt="Thumbnail Machu Pichu" />
                        <div className="content">
                            <div className="title">Machu Pichu</div>
                            <div className="description">Fascino giapponese</div>
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
        </div>
    );
};

export default Login;

