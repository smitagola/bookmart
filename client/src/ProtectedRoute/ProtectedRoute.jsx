import { Navigate } from "react-router-dom";

export const Protected = ({ isLoggedIn, children }) => {
    if (isLoggedIn)
        return <Navigate to={"/"} replace />
    else if(!isLoggedIn)
        return children;
}

export const Authorize = ({ userType, children }) => {
    if (userType === "admin") {
        return children;
    }
    return <Navigate to={"/"} replace />
}