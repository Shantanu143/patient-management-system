import { useContext, useEffect } from 'react';
import { DoctorContext } from '../context/DoctorContext';

const DoctorPanel = () => {
  const { fetchAllPatients, patients } = useContext(DoctorContext);

  useEffect(() => {
    fetchAllPatients();
  }, []);

  if (!patients || patients.length === 0) {
    return <p>Loading patients or no patients available...</p>;
  }
  return (
    <div className="sm:ml-64 px-10 pt-20">
      <div className="flex justify-between items-center gap-8 bg-white shadow-sm hover:shadow-lg p-4 border border-gray-200 rounded-lg w-fit transition-all">
        <div>
          <h5 className="mb-2 font-medium text-gray-400 text-center tracking-tight">
            Total Patients
          </h5>
          <p className="font-bold text-gray-900 text-2xl">{patients.length}</p>
        </div>
        <img src="./User-Icon.png" alt="" className="w-10" />
      </div>
    </div>
  );
};

export default DoctorPanel;
