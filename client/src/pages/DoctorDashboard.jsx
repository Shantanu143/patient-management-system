import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AdminPanel from '../components/AdminPanel';
import EditDoctorForm from '../components/EditDoctorForm';
import PatientForm from '../components/PatientForm';
import PatientList from '../components/PatientList';
import EditPatientForm from '../components/EditPatientForm';

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

  const doctorSidebarLinks = [
    {
      text: 'Doctor Dashboard',
      to: '/doctor-dashboard',
    },
    {
      text: 'Add Patient',
      to: '/doctor-dashboard/add-patient',
    },
    {
      text: 'Manage Patients',
      to: '/doctor-dashboard/all-patients',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <Navbar
        sidebarLinks={doctorSidebarLinks}
        logoText="Trackcare"
        user={{
          name: 'Dr. Sarah',
          image:
            'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
        }}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<AdminPanel />} />
        <Route path="/all-patients" element={<PatientList />} />
        <Route path="/add-patient" element={<PatientForm />} />
        <Route path="/edit-patient/:id" element={<EditPatientForm />} />
      </Routes>
    </div>
  );
};

export default DoctorDashboard;
