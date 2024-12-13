import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

// Pagine principali
import LandingPage from './pages/LandingPage/LandingPage';
import StartToTravel from './pages/StartToTravel/StartToTravel';
import Account from './pages/Account/Account';
import Homepage from './pages/Homepage/Homepage';
import Itinerary from './pages/Itinerary/Itinerary';


import LoginModal from './components/LoginModal/LoginModal';
import Spinner from './components/Spinner/Spinner';

const App = () => {
  const [loading, setLoading] = useState(false);

  const usePageLoader = () => {
    const location = useLocation();

    useEffect(() => {
      setLoading(true);
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 500);

      return () => clearTimeout(timeout);
    }, [location]);
  };

  return (
    <Router>
      <Spinner loading={loading} />
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
