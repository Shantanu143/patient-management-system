import { useContext, useState } from "react";

import { AppContext } from "../context/AppContext";

const AddDoctorForm = () => {
  const { addDoctor } = useContext(AppContext);

  const [doctorData, setDoctorData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    specialization: "",
    availability: {
      startDay: "",
      endDay: "",
      startTime: "",
      endTime: "",
    },
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (
      id === "start_day" ||
      id === "end_day" ||
      id === "start-time" ||
      id === "end-time"
    ) {
      setDoctorData((prevData) => ({
        ...prevData,
        availability: {
          ...prevData.availability,
          [id === "start_day"
            ? "startDay"
            : id === "end_day"
            ? "endDay"
            : id === "start-time"
            ? "startTime"
            : "endTime"]: value,
        },
      }));
    } else {
      setDoctorData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(doctorData);
    addDoctor(doctorData);
  };

  return (
    <div className="sm:ml-64 pt-20 px-10">
      <div className="flex items-center justify-start mb-6">
        <h3 className="text-2xl font-semibold">Add Doctor</h3>
      </div>
      <form
        onSubmit={handleFormSubmit}
        className="max-w-3xl mx-auto px-10 py-6 border-2 bg-white rounded-xl flex flex-col md:flex-row flex-wrap"
      >
        <div className="p-2 md:w-1/2">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={doctorData.name}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John Doe"
            required
          />
        </div>
        <div className="p-2 md:w-1/2">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={doctorData.email}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="doctor@gmail.com"
            required
          />
        </div>
        <div className="p-2 md:w-1/2">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={doctorData.password}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="********"
            required
          />
        </div>
        <div className="p-2 md:w-1/2">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={doctorData.phone}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="+1234567894"
            required
          />
        </div>
        <div className="p-2 md:w-1/2">
          <label
            htmlFor="specialization"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Specialization
          </label>
          <input
            type="text"
            id="specialization"
            value={doctorData.specialization}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Psychiatrist"
            required
          />
        </div>
        <div className="p-2 w-full">
          <p className="w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Availability
          </p>
          <div className="w-full flex flex-row flex-wrap items-center justify-center">
            {/* Day selectors */}
            <div className="w-full md:w-1/2 flex flex-row gap-2 items-start justify-start p-2">
              <div className="w-1/2">
                <label
                  htmlFor="start_day"
                  className="block mb-2 text-sm text-gray-600 font-normal dark:text-white"
                >
                  Start Day
                </label>
                <select
                  id="start_day"
                  value={doctorData.availability.startDay}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  {[
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ].map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="end_day"
                  className="block mb-2 text-sm text-gray-600 font-normal dark:text-white"
                >
                  End Day
                </label>
                <select
                  id="end_day"
                  value={doctorData.availability.endDay}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  {[
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ].map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Time selectors */}
            <div className="w-full md:w-1/2 flex flex-row gap-2 items-start justify-start p-2">
              <div className="w-1/2">
                <label
                  htmlFor="start-time"
                  className="block mb-2 text-sm text-gray-600 font-normal dark:text-white"
                >
                  Start time
                </label>
                <input
                  type="time"
                  id="start-time"
                  value={doctorData.availability.startTime}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="end-time"
                  className="block mb-2 text-sm text-gray-600 font-normal dark:text-white"
                >
                  End time
                </label>
                <input
                  type="time"
                  id="end-time"
                  value={doctorData.availability.endTime}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-2 w-full">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-1"
          >
            Add Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctorForm;
