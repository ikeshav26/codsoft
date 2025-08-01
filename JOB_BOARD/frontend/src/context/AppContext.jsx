import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [employer, setemployer] = useState(null);
  const [token, settoken] = useState(null);
  const [jobs, setjobs] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedEmployer = localStorage.getItem("employer");
      const storedToken = localStorage.getItem("token");

      if (storedUser) setuser(JSON.parse(storedUser));
      if (storedEmployer) setemployer(JSON.parse(storedEmployer));
      if (storedToken) settoken(storedToken);
    } catch (err) {
      console.error("Error parsing localStorage:", err);
      localStorage.clear();
    }
  }, []);


  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    if (employer) localStorage.setItem("employer", JSON.stringify(employer));
    else localStorage.removeItem("employer");
  }, [employer]);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const value = {
    user,
    setuser,
    employer,
    setemployer,
    navigate,
    jobs,
    setjobs,
    location,
    token,
    settoken,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
