import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../App";

const AuthResults = () => {

    const [authValues, setAuthValues] = useContext(AuthContext)

    return !authValues.submitted ? (
        <Navigate to="/questions" replace />
    ) : (
        <Outlet />
    )
}

export default AuthResults