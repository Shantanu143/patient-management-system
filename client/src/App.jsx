import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './pages/LandingPage';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

import ProtectedRoute from './Routes/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard';

const App = () => {
  return (
    <div className="min-h-screen ">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* protected routes  */}
        <Route
          path="/admin-dashboard/*"
          element={
            <ProtectedRoute requiredRole="admin" element={<AdminDashboard />} />
          }
        />
        <Route
          path="/doctor-dashboard/*"
          element={
            <ProtectedRoute
              requiredRole="doctor"
              element={<DoctorDashboard />}
            />
          }
        />
      </Routes>

      <ToastContainer />
    </div>
  );
};

export default App;
