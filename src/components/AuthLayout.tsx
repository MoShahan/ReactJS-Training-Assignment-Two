import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
    const areQuestionsNotAnswered = false;
    return areQuestionsNotAnswered ? (
        <Navigate to="/questions" replace />
    ) : (
        <Outlet />
    )
}

export default AuthLayout