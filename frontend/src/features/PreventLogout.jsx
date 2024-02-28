import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PreventLogout = ({ children }) => {

    const loggedIn = useSelector(state => state.auth.loggedIn);
    const user = useSelector(state => state.auth.user);

    if (loggedIn) {
        if(user === 'admin')    
            <Navigate to="/admin"/>
        else 
            <Navigate to="/"/>
    }
        return children
    
};