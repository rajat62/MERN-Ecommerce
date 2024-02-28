import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {

    const loggedIn = useSelector(state => state.auth.loggedIn);

    if (!loggedIn) {
        return <Navigate to="/login" />;
    }
    return children;
};