import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PatientList = () => {
  // Dummy data based on the PatientSchema
  const dummyPatients = [
    {
      _id: '1',
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      contact: '+1-123-456-7890',
      address: '123 Main Street, Springfield',
      medicalHistory: ['Diabetes', 'Hypertension'],
      doctorId: '123456789012',
      diagnosis: 'Flu',
    },
    {
      _id: '2',
      name: 'Jane Smith',
      age: 34,
      gender: 'Female',
      contact: '+1-987-654-3210',
      address: '456 Elm Street, Gotham',
      medicalHistory: ['Asthma'],
      doctorId: '098765432109',
      diagnosis: 'Bronchitis',
    },
    {
      _id: '3',
      name: 'Alice Johnson',
      age: 29,
      gender: 'Female',
      contact: '+1-456-789-0123',
      address: '789 Pine Street, Metropolis',
      medicalHistory: ['Migraine'],
      doctorId: '567890123456',
      diagnosis: 'Migraine',
    },
  ];

  // State for filtering patients (search functionality)
  const [searchQuery, setSearchQuery] = useState('');

  // Filter patients based on the search query
  const filteredPatients = dummyPatients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="sm:ml-64 pt-20 px-10">
      <div className="flex items-center justify-start mb-6">
        <h3 className="text-2xl font-semibold">Manage Patients</h3>
      </div>
      <div className="pb-4">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
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
            className="block pt-2 ps-10 text-sm text-gray-900 border bg-transparent border-gray-300 rounded-3xl w-80 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for patients"
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
              <th scope="col" className="px-6 py-3">
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                Prescription
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient, index) => (
              <tr
                key={patient._id}
                className="bg-white border-b  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  <div>{patient.name}</div>
                  <div className="flex flex-row gap-1 text-xs font-normal">
                    <span>{patient.age}</span>
                    <span>{patient.gender}</span>
                  </div>
                </td>
                {/* <td className="px-6 py-4">{patient.age}</td> */}
                {/* <td className="px-6 py-4">{patient.gender}</td> */}
                <td className="px-6 py-4">{patient.contact}</td>
                <td className="px-6 py-4">{patient.address}</td>
                <td className="px-6 py-4">{patient.diagnosis || 'N/A'}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-row md:items-center gap-2">
                    <Link
                      // to={`/admin-dashboard/edit-doctor/${data._id}`}
                      className="font-medium text-[#3A7AC0] bg-[#D6EBFF] px-2 py-1 rounded-md hover:underline hover:-translate-y-1 transition-all"
                    >
                      Edit
                    </Link>
                    <button
                      // onClick={() => deleteDoctor(data._id)}
                      className="font-medium text-[#C74312] bg-[#FFD5C7] px-2 py-1 rounded-md hover:underline hover:-translate-y-1 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-row md:items-center gap-2">
                    <Link
                      // to={`/admin-dashboard/edit-doctor/${data._id}`}
                      className="font-medium text-[#6448D6] bg-[#DDD6FF] px-2 py-1 rounded-md hover:underline hover:-translate-y-1 transition-all"
                    >
                      Add
                    </Link>
                    <button
                      // onClick={() => deleteDoctor(data._id)}
                      className="font-medium text-[#248C36] bg-[#CFF3D1] px-2 py-1 rounded-md hover:underline hover:-translate-y-1 transition-all"
                    >
                      View
                    </button>
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
