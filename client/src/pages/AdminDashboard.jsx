import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import AdminPanel from "../components/AdminPanel";
import UserList from "../components/UserList";
import EditUserDoctor from "../components/EditUserDoctor";
import AddUserForm from "../components/AddUserForm";
const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <Navbar></Navbar>
      <Routes>
          {/* <Route path="/admin-dashboard" element={} /> */}
          <Route path="/" element={<AdminPanel />} />
          <Route path="/all-doctor" element={<UserList />} />
          <Route path="/add-doctor" element={<AddUserForm />} />
          <Route path="/edit-doctor/:id" element={<EditUserDoctor />} />
        </Routes>
    </div>
  );
};

export default AdminDashboard;
