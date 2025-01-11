import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ element, requiredRole }) => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  const storedRole = localStorage.getItem('role');
  if (!token) {
    navigate('/login');
  }
  if (storedRole !== requiredRole) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="text-center bg-red-100 p-5 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-red-600">
            You do not have access to this page.
          </h1>
          <p className="mt-2 text-lg text-gray-800">
            Please login as {requiredRole} to access this page.
          </p>
        </div>
      </div>
    );
  }

  return element;
};

export default ProtectedRoute;
