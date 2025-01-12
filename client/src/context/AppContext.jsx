import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );

  const [refresh, setRefresh] = useState(false);
  const [allDoctors, setAllDoctor] = useState([]);

  const fetchAllDoctors = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/admin/get-all-doctors", {
        headers: { atoken: token },
      });
      if (data.success) {
        setAllDoctor(data.doctors);
        toast.success("doctor fetched successfully");
        console.log(data.doctors);
      } else {
        toast.error("doctor fetch api error");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useState(() => {
    fetchAllDoctors();
  }, [refresh]);

  const value = {
    backendUrl,
    token,
    setToken,
    allDoctors,
    refresh,
    setRefresh,
  };

  return (
    // eslint-disable-next-line react/prop-types
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
