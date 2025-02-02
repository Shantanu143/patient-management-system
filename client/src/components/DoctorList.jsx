import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const DoctorList = () => {
  const { allDoctors, deleteDoctor, fetchAllDoctors } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  useEffect(() => {
    fetchAllDoctors();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredDoctors(allDoctors.filter((doctor) => doctor != null)); // Remove null/undefined doctors
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      setFilteredDoctors(
        allDoctors
          .filter((doctor) => doctor != null) // Remove null/undefined doctors
          .filter((doctor) =>
            doctor?.name?.toLowerCase().includes(lowercasedQuery)
          )
      );
    }
  }, [searchQuery, allDoctors]);

  if (!filteredDoctors || filteredDoctors.length === 0) {
    return <p>Loading doctors or no doctors available...</p>;
  }

  return (
    <div className="sm:ml-64 pt-20 px-10">
      <div className="flex items-center justify-start mb-6">
        <h3 className="text-2xl font-semibold">Manage Doctors</h3>
      </div>
      <div className="pb-4">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
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
            value={searchQuery} // Bind search query state
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
            className="block pt-2 ps-10 text-sm text-gray-900 border bg-transparent border-gray-300 rounded-3xl w-full max-w-80 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for a doctor"
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Availability
              </th>
              <th scope="col" className="px-6 py-3">
                Specialization
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((data, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="flex flex-col items-start justify-start">
                    <div> {data.name}</div>
                    <div className="text-xs text-gray-400 font-light">
                      {data.email}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">{data.phone}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col items-start justify-center">
                    <div>
                      {data.availability.startTime}-{data.availability.endTime}
                    </div>
                    <div>
                      {data.availability.startDay}-{data.availability.endDay}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{data.specialization}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-row md:items-center gap-2">
                    <Link
                      to={`/admin-dashboard/edit-doctor/${data._id}`}
                      className="font-medium text-[#6226EF] bg-buttonPurple px-2 py-1 rounded-md hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteDoctor(data._id)}
                      className="font-medium text-[#EF3826] bg-buttonOrange px-2 py-1 rounded-md dark:text-blue-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">{data.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorList;
