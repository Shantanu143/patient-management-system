import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { DoctorContext } from '../context/DoctorContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AddPatientForm from '../components/AddPatientForm';
import PatientList from '../components/PatientList';
import EditPatientForm from '../components/EditPatientForm';
import PrescriptionHistory from '../components/PrescriptionHistory';
import AddPrescription from '../components/AddPrescription';
import DoctorPanel from '../components/DoctorPanel';
// import PrintPrescription from "../components/PrintPrescription";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AppContext);
  const { getDoctor, doctor } = useContext(DoctorContext);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    navigate('/login');
    toast.success('succefully log out ');
  };

  useEffect(() => {
    getDoctor();
  }, []);

  console.log(doctor);

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
    <div className="bg-[#F5F6FA] min-h-screen">
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
        <Route path="/" element={<DoctorPanel />} />
        <Route path="/all-patients" element={<PatientList />} />
        <Route path="/add-patient" element={<AddPatientForm />} />
        <Route path="/edit-patient/:id" element={<EditPatientForm />} />
        <Route
          path="/prescription-history/:patientId"
          element={<PrescriptionHistory />}
        />
        <Route
          path="/add-prescription/:patientId"
          element={<AddPrescription />}
        />
      </Routes>
    </div>
  );
};

export default DoctorDashboard;
