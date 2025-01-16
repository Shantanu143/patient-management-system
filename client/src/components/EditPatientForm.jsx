import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../context/DoctorContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const EditPatientForm = () => {
  const { backendUrl, token } = useContext(AppContext);
  const { updatePatient } = useContext(DoctorContext);
  const { id } = useParams();
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    address: "",
    diagnosis: "",
  });

  const fetchPatientDetails = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/doctor/get-patient/${id}`,
        { headers: { token } }
      );

      if (data.success) {
        const patientData = data.data;

        setPatient({
          name: patientData.name,
          age: patientData.age,
          gender: patientData.gender,
          contact: patientData.contact,
          address: patientData.address,
          diagnosis: patientData.diagnosis,
        });
      } else {
        toast.error("Fetch Patient Details Else Block Error : " + data.message);
      }
    } catch (error) {
      toast.error("Fetch Patient Details Catch Block Error : " + error.message);
    }
  };

  useEffect(() => {
    fetchPatientDetails();
  }, [id]);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setPatient((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    updatePatient({ ...patient, _id: id });
  };

  return (
    <div className="sm:ml-64 pt-20 px-10">
      <div className="flex items-center justify-start mb-6">
        <h3 className="text-2xl font-semibold">Add Patient</h3>
      </div>
      <form
        onSubmit={handleFormSubmit}
        className="max-w-3xl mx-auto px-10 py-6 border-2 bg-white rounded-xl flex flex-col md:flex-row flex-wrap"
      >
        {/* Name Input */}
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
            value={patient.name}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="John Doe"
            required
          />
        </div>

        {/* Age Input */}
        <div className="p-2 md:w-1/2">
          <label
            htmlFor="age"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Age
          </label>
          <input
            type="number"
            id="age"
            value={patient.age}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter your age"
            required
          />
        </div>

        {/* Gender Input */}
        <div className="p-2 md:w-1/2">
          <label
            htmlFor="gender"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Gender
          </label>
          <select
            id="gender"
            value={patient.gender}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Contact Input */}
        <div className="p-2 md:w-1/2">
          <label
            htmlFor="contact"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Contact
          </label>
          <input
            type="tel"
            id="contact"
            value={patient.contact}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="+1234567890"
            required
          />
        </div>

        {/* Address Input */}
        <div className="p-2 md:w-1/2">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            value={patient.address}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter address"
            required
          />
        </div>
        <div className="p-2 md:w-1/2">
          <label
            htmlFor="diagnosis"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Diagnosis
          </label>
          <input
            type="text"
            id="diagnosis"
            value={patient.diagnosis}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter diagnosis"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="p-2 w-full">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Update Patient
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPatientForm;
