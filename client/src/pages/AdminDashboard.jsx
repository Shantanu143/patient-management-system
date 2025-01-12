import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import AddUserForm from '../components/AddUserForm';
import UserList from '../components/UserList';

const AdminDashboard = () => {
  const [AdminDashboard, setAdminDashboard] = useState(true);
  const [AddUser, setAddUser] = useState(false);
  const [manageUsers, setManageUsers] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <Navbar
        setAdminDashboard={setAdminDashboard}
        setAddUser={setAddUser}
        setManageUsers={setManageUsers}
      />
      {AdminDashboard && <div>Admin</div>}
      {AddUser && <AddUserForm />}
      {manageUsers && <UserList />}
    </div>
  );
};

export default AdminDashboard;
