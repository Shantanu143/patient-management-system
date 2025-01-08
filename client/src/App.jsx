import React from 'react';
import LandingPage from './pages/LandingPage';
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <div className="min-h-screen bg-custom-gradient">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
