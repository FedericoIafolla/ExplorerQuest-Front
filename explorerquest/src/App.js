import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import StartToTravel from './pages/StartToTravel/StartToTravel';
import Account from './pages/Account/Account';
import Homepage from './pages/Homepage/Homepage';
import Itinerary from './pages/Itinerary/Itinerary';
import Other from './pages/Other/Other';

import LoginModal from './components/LoginModal/LoginModal';


const PrivateRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  return isAuthenticated ? element : <Navigate to="/" replace />;
};

const AppRoutes = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 50);

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/login" element={<LoginModal />} />
        <Route path="/other" element={<Other />} /> {/* Aggiunta route per Other.js */}
        <Route path="/starttotravel" element={<PrivateRoute element={<StartToTravel />} />} />
        <Route path="/account" element={<PrivateRoute element={<Account />} />} />
        <Route path="/homepage" element={<PrivateRoute element={<Homepage />} />} />
        <Route path="/itinerary" element={<PrivateRoute element={<Itinerary />} />} />
        <Route path="*" element={<h1>Pagina non trovata</h1>} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
