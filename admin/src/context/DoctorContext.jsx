import { createContext, useState } from "react";
import axiox from "axios";
import { toast } from "react-toastify";


export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false)
  const [profileData, setProfileData] = useState(false)

  const getAppointments = async () => {
    try {
      const { data } = await axiox.get(backendUrl + "/api/doctor/appointments", {
        headers: { dToken },
      });

      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // API call for mark appointment complete
  const completeAppointment = async (appointmentId) => {
    try {

      const {data} = await axiox.post(backendUrl + "/api/doctor/complete-appointment", {appointmentId}, {headers: {dToken}})

      if (data.success) {
        toast.success(data.message)
        // updating appointments data 
        getAppointments()
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
}

  // API call for cancel appointment
const cancelAppointment = async (appointmentId) => {
  try {

    const {data} = await axiox.post(backendUrl + "/api/doctor/cancel-appointment", {appointmentId}, {headers: {dToken}})

    if (data.success) {
      toast.success(data.message)
      // updating appointments data 
      getAppointments()
    }else{
      toast.error(data.message)
    }
    
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
}

  // API call for doctor dashboard data
  const getDashData = async ()=>{

    try {

      const {data} = await axiox.get(backendUrl + "/api/doctor/dashboard", {headers: {dToken}})
      if (data.success) {
        setDashData(data.dashData)
        
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  // doctor profile data

  const getProfileData = async() => {

    try {

      const {data} = await axiox.get(backendUrl + "/api/doctor/profile", {headers:{dToken}})
      if (data.success) {
        setProfileData(data.profileData)
        console.log(data.profileData)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }


  const value = {
    dToken,
    setDToken,
    backendUrl,
    getAppointments,
    appointments,
    setAppointments,
    completeAppointment,
    cancelAppointment,
    dashData, setDashData, getDashData,
    profileData, setProfileData, getProfileData
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
