import { createContext, ReactNode, useReducer, useEffect } from "react";
import { TokenStorage } from "../../shared/services";
import { AuthState, AuthAction, AuthActionType, User } from "../models";

const initialState: AuthState = {
    isAuthenticated: false,
    user: null
}

export const AuthContext = createContext<{
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>
}>({
    state: initialState,
    dispatch: () => null
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch(action.type) {
        case AuthActionType.LOGIN:
            return {isAuthenticated: true, user: action.payload};
        case AuthActionType.LOGOUT:
            return initialState;
        default: return state;
    }
};

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    useEffect(() => {
        const token = TokenStorage.getToken();
        if(token) {
            try {
                const user: User = TokenStorage.decodeToken(token);
                dispatch({type:AuthActionType.LOGIN, payload:user});
            } catch(err) {
                console.error('Token invalido', err);
                TokenStorage.removeToken();
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{state, dispatch}}>{children}</AuthContext.Provider>
    );
};