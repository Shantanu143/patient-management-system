import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const AdminPanel = () => {
  const { allDoctors, fetchAllDoctors } = useContext(AppContext);

  useEffect(() => {
    fetchAllDoctors();
  }, []);

  return (
    <div className="sm:ml-64 px-10 pt-20">
      <div class="flex justify-between items-center gap-8 bg-white shadow-sm hover:shadow-lg p-4 border border-gray-200 rounded-lg w-fit transition-all">
        <div>
          <h5 class="mb-2 font-medium text-gray-400 text-center tracking-tight">
            Total Doctors
          </h5>
          <p class="font-bold text-gray-900 text-2xl">{allDoctors.length}</p>
        </div>
        <img src="./User-Icon.png" alt="" className="w-10" />
      </div>
    </div>
  );
};

export default AdminPanel;
