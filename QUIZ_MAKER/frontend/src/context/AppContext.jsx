import { createContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


const AppContext=createContext();


const AppProvider=({children})=>{
    const [user, setuser] = useState(null);
    const navigate=useNavigate();
    const location=useLocation();

    useEffect(() => {
        const storeduser = localStorage.getItem('user');
        if (storeduser) {
            try {
                setuser(JSON.parse(storeduser));
            } catch (error) {
                console.error('Error parsing stored user:', error);
                localStorage.removeItem('user');
                setuser(null);
            }
        } else {
            setuser(null);
        }
    }, []);

    const value={
        user,
        setuser,
        navigate,
        location
    }
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContext,AppProvider};