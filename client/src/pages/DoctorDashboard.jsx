import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AppContext);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    navigate('/login');
    toast.success('succefully log out ');
  };
  return (
    <div>
      <h1>Doctor Dashboard</h1>
      <button
        onClick={handleLogout}
        className="md:px-4 md:py-2 px-2 py-1 text-sm md:text-base rounded-xl border border-[#2DFF52] hover:text-[#2DFF52] transition-all hover:-translate-y-1"
      >
        logout
      </button>
    </div>
  );
};

export default DoctorDashboard;
