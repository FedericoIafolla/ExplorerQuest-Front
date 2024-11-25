import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Frontpage from './pages/Frontpage/Frontpage';
import LoginModal from './components/LoginModal/LoginModal';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/login" element={<LoginModal />} />
      </Routes>
    </Router>
  );
};

export default App;
