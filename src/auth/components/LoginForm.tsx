import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../services/AuthService";
import { AuthActionType } from "../models/AuthState";
import { FormInput } from "../../shared/components";
import { AuthContext } from "../context";

const loginSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Min 6 characters')
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
    const {register, handleSubmit, formState} = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const {dispatch} = useContext(AuthContext);

    const navigate = useNavigate();

    const onSubmit = async (data: LoginFormData) => {
        try {
            const authService = new AuthService();
            const user = await authService.login(data.email,data.password);
            dispatch({type: AuthActionType.LOGIN, payload: user});
            navigate('/characters');
        } catch (error) {
            console.error(error);
            if(error instanceof Error)
                alert(error.message || 'Login error');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <FormInput label="Email" register={register('email')} error={formState.errors.email?.message}></FormInput>
                <FormInput label="Password" register={register('password')} error={formState.errors.password?.message}></FormInput>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to='/register'>Register</Link></p>
        </div>
    );
};