import { useEffect, useState, useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import api from "../utils/axiosInstance";
import { useUserContext } from "../UserContext";

function ProtectedPages() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setUsername } = useUserContext();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await api.get("/verify");
        setLoggedIn(response.status === 200);
        setUsername(response?.data?.username);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setLoggedIn(false);
      }
      setLoading(false);
    };
    checkAuthentication();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedPages;
