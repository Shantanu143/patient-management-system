import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AdminPanel from '../components/AdminPanel';
import EditDoctorForm from '../components/EditDoctorForm';
import AddDoctorForm from '../components/AddDoctorForm';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import DoctorList from '../components/DoctorList';

const AdminDashboard = () => {
  const { setToken } = useContext(AppContext);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    navigate('/login');
    toast.success('succefully log out ');
  };
  const adminSidebarLinks = [
    {
      text: 'Admin Dashboard',
      to: '/admin-dashboard',
    },
    {
      text: 'Add Doctor',
      to: '/admin-dashboard/add-doctor',
    },
    {
      text: 'Manage Doctors',
      to: '/admin-dashboard/all-doctor',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <Navbar
        sidebarLinks={adminSidebarLinks}
        logoText="Trackcare"
        // user={{
        //   name: 'Neil Sims',
        //   image:
        //     'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
        // }}
        handleLogout={handleLogout}
      />

      <Routes>
        {/* <Route path="/admin-dashboard" element={} /> */}
        <Route path="/" element={<AdminPanel />} />
        <Route path="/all-doctor" element={<DoctorList />} />
        <Route path="/add-doctor" element={<AddDoctorForm />} />
        <Route path="/edit-doctor/:id" element={<EditDoctorForm />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
