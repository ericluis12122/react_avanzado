import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginForm, RegisterForm } from "./components";
import { AuthContext } from "./context/AuthContext";

export const AuthContainer = () => {
    const {state} = useContext(AuthContext);

    if(state.isAuthenticated) {
        return <Navigate to='/characters'></Navigate>
    }

    return (
        <Routes>
            <Route path="/" element={<LoginForm />}></Route>
            <Route path="/register" element={<RegisterForm />}></Route>
        </Routes>
    );
};