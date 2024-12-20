import { ReactNode, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CharactersContainer } from "../characters/CharactersContainer";
import { AuthContext } from "../auth/context";
import { AuthContainer } from "../auth/AuthContainer";
import { CharacterForm } from "../characters/components";
import { CharacterProvider } from "../characters/context";

const PrivateRoute = ({children}: {children: ReactNode}) => {
    const {state} = useContext(AuthContext);

    return state.isAuthenticated ? children : <Navigate to='/'/>;
};

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/*" element={<AuthContainer/>}></Route>
            <Route path="/characters" element={<PrivateRoute><CharacterProvider><CharactersContainer/></CharacterProvider></PrivateRoute>}></Route>
            <Route path="/characters/:id" element={<PrivateRoute><CharacterProvider><CharacterForm/></CharacterProvider></PrivateRoute>}></Route>
        </Routes>
    );
    
};