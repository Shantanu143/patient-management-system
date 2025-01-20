/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { AppContext } from "./AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const DoctorContext = createContext();
const DoctorContextProvider = (props) => {
  const { token, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [prescription, setPrescription] = useState([]);

  const fetchAllPatients = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/doctor//get-all-patients",
        { headers: { token } }
      );
      if (data.success) {
        setPatients(data.data);
        // toast.success("Patient fetched succesfully");
      } else {
        toast.error("Fetch All Patients Else Block Error: " + data.message);
      }
    } catch (error) {
      toast.error("Fetch All Patients Catch Block Error : " + error.message);
    }
  };

  const addPatient = async (patientData) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/doctor/register-patient",
        patientData,
        { headers: { token } }
      );

      if (data.success) {
        setPatients((prev) => [...prev, data.newPatient]);
        navigate("/doctor-dashboard/all-patients");
        toast.success("Patient added successfully");
      } else {
        toast.error("Add Patient Else Block Error : " + data.message);
      }
    } catch (error) {
      toast.error("Add Patient Catch Block Error : " + error.message);
    }
  };

  const updatePatient = async (patientData) => {
    try {
      const { data } = await axios.put(
        backendUrl + "/doctor/update-patient",
        patientData,
        { headers: { token } }
      );

      if (data.success) {
        setPatients((prev) => {
          prev.map((patient) => {
            patient._id === patientData._id
              ? { ...patient, ...patientData }
              : patient;
          });
        });
        navigate("/doctor-dashboard/all-patients");
        toast.success("patient updated successfully");
      } else {
        toast.error("Update Patient Else Block Error : " + data.message);
      }
    } catch (error) {
      toast.error("Update Patient Catch Block Error : " + error.message);
    }
  };

  const deletePatient = async (patientId) => {
    try {
      const { data } = await axios.delete(
        backendUrl + "/doctor/delete-patient",
        { data: { patientId }, headers: { token } }
      );
      if (data.success) {
        setPatients((prev) =>
          prev.filter((patient) => patient._id !== patientId)
        );
        navigate("/doctor-dashboard/all-patients");
        toast.success("Patient Delete succefully ");
      } else {
        toast.error("Delete Patient Else Block Error : " + data.message);
      }
    } catch (error) {
      toast.error("Delete Patient Catch Block Error : " + error.message);
    }
  };

  const fetchAllPrescription = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/doctor/get-all-prescription",
        { headers: { token } }
      );

      if (data.success) {
        setPrescription(data.data);
        toast.success("All prescription fetched ..");
      } else toast.error("error to fetch prescription");
    } catch (error) {
      toast.error(
        "Fetch all prescription catch block error : " + error.message
      );
    }
  };

  const addPrescription = async (prescriptionData) => {
    try {
      console.log(prescriptionData);
      const { data } = await axios.post(
        backendUrl + "/doctor/add-prescription",
        prescriptionData,
        { headers: { token } }
      );
      
      if (data.success) {
        setPrescription((prev) => [...prev, data.newPrescription]);

        navigate("/doctor-dashboard/print-prescription", {
          state: prescriptionData,
        });
        toast.success("prescription added ");
      }
    } catch (error) {
      toast.error("add prescription catch block error : " + error.message);
    }
  };

  const value = {
    fetchAllPatients,
    patients,
    addPatient,
    updatePatient,
    deletePatient,
    fetchAllPrescription,
    addPrescription,
    prescription,
  };
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
