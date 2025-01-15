import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );

  const [allDoctors, setAllDoctor] = useState([]);

  const fetchAllDoctors = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/admin/get-all-doctors", {
        headers: { atoken: token },
      });
      if (data.success) {
        setAllDoctor(data.doctors);
        toast.success("Doctor fetched successfully");
      } else {
        toast.error("Error fetching error");
      }
    } catch (error) {
      toast.error("Fetch doctors error : " + error.message);
    }
  };

  const addDoctor = async (doctorData) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/admin/register-doctor",
        doctorData,
        {
          headers: { atoken: token },
        }
      );
      if (data.success) {
        setAllDoctor((prev) => [...prev, data.newDoctor]);
        navigate("/admin-dashboard/all-doctor");
        toast.success("Doctor added successfully");
      } else {
        toast.error("Error adding doctors");
      }
    } catch (error) {
      toast.error("Add doctor error : " + error.message);
    }
  };

  const editDoctor = async (doctorData) => {
    try {
      const { data } = await axios.put(
        backendUrl + "/admin/update-doctor",
        doctorData,
        { headers: { atoken: token } }
      );
      if (data.success) {
        setAllDoctor((prev) =>
          prev.map((doctor) => {
            doctor._id === doctorData._id
              ? { ...doctor, ...doctorData }
              : doctor;
          })
        );
        navigate("/admin-dashboard/all-doctor");
        toast.success("doctor update successfully");
      } else {
        toast.error("Error update doctor");
      }
    } catch (error) {
      toast.error("Edit doctor error : " + error.message);
    }
  };

  const deleteDoctor = async (docId) => {
    try {
      const { data } = await axios.delete(backendUrl + "/admin/delete-doctor", {
        headers: { atoken: token },
        data: { docId },
      });
      if (data.success) {
        setAllDoctor((prev) => prev.filter((doctor) => doctor._id !== docId));
        navigate("/admin-dashboard/all-doctor");
        toast.success("Doctor deleted successfully");
      } else {
        toast.error("Error deleting doctor");
      }
    } catch (error) {
      toast.error("Delete doctor error :" + error.message);
    }
  };

  const value = {
    backendUrl,
    token,
    setToken,
    allDoctors,
    fetchAllDoctors,
    addDoctor,
    editDoctor,
    deleteDoctor,
  };

  return (
    // eslint-disable-next-line react/prop-types
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
