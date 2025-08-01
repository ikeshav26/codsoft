import { createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";



const AppContext=createContext();


export const ContextProvider=({children})=>{
    const [user, setuser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
    const [employer, setemployer] = useState(localStorage.getItem('employer') ? JSON.parse(localStorage.getItem('employer')) : null);
    const [token, settoken] = useState(localStorage.getItem('token') || null);
    const [jobs, setjobs] = useState([])
    const navigate=useNavigate();
    const location=useLocation();
    const value={user,setuser,employer,setemployer,navigate,jobs,setjobs,location,token,settoken};
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;