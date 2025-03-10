import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';

const PatientList = () => {
  const { fetchAllPatients, patients, deletePatient } =
    useContext(DoctorContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    fetchAllPatients();
  }, []);

  useEffect(() => {
    if (!patients || patients.length === 0) {
      setFilteredPatients([]);
      return;
    }
    if (searchQuery === '') {
      setFilteredPatients(patients.filter((patient) => patient != null));
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      setFilteredPatients(
        patients
          .filter((patient) => patient != null)
          .filter((patient) =>
            patient?.name?.toLowerCase().includes(lowercasedQuery)
          )
      );
    }
  }, [searchQuery, patients]);

  if (!patients || patients.length === 0) {
    return <p>Loading patients or no patients available...</p>;
  }

  return (
    <div className="sm:ml-64 px-10 pt-20">
      <div className="flex justify-start items-center mb-6">
        <h3 className="font-semibold text-2xl">Manage Patients</h3>
      </div>
      <div className="pb-4">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 flex items-center ps-3 pointer-events-none start-0">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block bg-transparent ps-10 pt-2 border border-gray-300 focus:border-blue-500 rounded-3xl focus:ring-blue-500 w-full max-w-80 text-gray-900 text-sm"
            placeholder="Search for a patient"
          />
        </div>
      </div>
      <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
        <table className="w-full text-gray-500 dark:text-gray-400 text-sm text-left">
          <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400 text-xs uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Contact
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Diagnosis
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                Prescription
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr
                key={patient._id}
                className="bg-white hover:bg-gray-50 dark:hover:bg-gray-600 dark:bg-gray-800 dark:border-gray-700 border-b"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  <div>{patient.name}</div>
                  <div className="flex flex-row gap-1 font-normal text-xs">
                    <span>{patient.age}</span>
                    <span>{patient.gender}</span>
                  </div>
                </td>

                <td className="px-6 py-4">{patient.contact}</td>
                <td className="px-6 py-4">{patient.address}</td>
                <td className="px-6 py-4">{patient.diagnosis || 'N/A'}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-row md:items-center gap-2">
                    <Link
                      to={`/doctor-dashboard/edit-patient/${patient._id}`}
                      className="bg-[#D6EBFF] px-2 py-1 rounded-md font-medium text-[#3A7AC0] hover:underline transition-all hover:-translate-y-1"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deletePatient(patient._id)}
                      className="bg-[#FFD5C7] px-2 py-1 rounded-md font-medium text-[#C74312] hover:underline transition-all hover:-translate-y-1"
                    >
                      Delete
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-row justify-center md:items-center gap-2">
                    {/* <Link
      
                      className="bg-[#DDD6FF] px-2 py-1 rounded-md font-medium text-[#6448D6] hover:underline transition-all hover:-translate-y-1"
                    >
                      Add
                    </Link> */}
                    <Link
                      to={`/doctor-dashboard/prescription-history/${patient._id}`}
                      className="bg-[#CFF3D1] px-2 py-1 rounded-md font-medium text-[#248C36] hover:underline transition-all hover:-translate-y-1"
                    >
                      View
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;
