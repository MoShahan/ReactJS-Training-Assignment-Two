import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../App";

const AuthQuestions = () => {

    const [authValues, setAuthValues] = useContext(AuthContext)

    return !authValues.registered ? (
        <Navigate to="/" replace />
    ) : (
        <Outlet />
    )
}

export default AuthQuestions