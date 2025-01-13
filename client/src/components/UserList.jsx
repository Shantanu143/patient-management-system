import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const UserList = () => {
  const { allDoctors, backendUrl, token } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on the search query
  const filteredDoctors = allDoctors.filter((allDoctors) =>
    allDoctors.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteDoctor = async (_id) => {
    try {
      const { data } = await axios.delete(backendUrl + "/admin/delete-doctor", {
        headers: { atoken: token },
        data: { docId: _id },
      });
      if (data.success) {
        toast.success("success");
      } else {
        toast.error("false");
      }
    } catch (error) {
      toast.error("delete doctor catch block error : " + error.message);
    }
  };

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
            className="block pt-2 ps-10 text-sm text-gray-900 border bg-transparent border-gray-300 rounded-3xl w-80 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for items"
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
                      {data.availability.hours.start} -
                      {data.availability.hours.end}
                    </div>
                    <div>
                      {" "}
                      {data.availability.days[0]} -{" "}
                      {
                        data.availability.days[
                          data.availability.days.length - 1
                        ]
                      }
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
