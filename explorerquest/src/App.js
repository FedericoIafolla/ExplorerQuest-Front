import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Pagine principali
import LandingPage from './pages/LandingPage/LandingPage';
import StartToTravel from './pages/StartToTravel/StartToTravel';
import Account from './pages/Account/Account';
import Homepage from './pages/Homepage/Homepage';
import Itinerary from './pages/Itinerary/Itinerary';

// Componenti comuni
import LoginModal from './components/LoginModal/LoginModal';

const App = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive((prev) => !prev);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginModal />} />
        <Route path="/starttotravel" element={<StartToTravel />} />
        <Route path="/account" element={<Account />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="*" element={<h1>Pagina non trovata</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
