import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './pages/LandingPage';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

import ProtectedRoute from './Routes/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import PrintPrescription from './components/PrintPrescription';
import NewLandingPage from './pages/NewLandingPage';

const App = () => {
  return (
    <div className="min-h-screen ">
      <Routes>
        <Route path="/" element={<NewLandingPage />} />
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
        <Route path="/print-prescription" element={<PrintPrescription />} />
      </Routes>

      <ToastContainer />
    </div>
  );
};

export default App;
