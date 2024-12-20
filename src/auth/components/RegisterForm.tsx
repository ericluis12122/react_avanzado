import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { FormInput } from "../../shared/components";
import { AuthService } from "../services/AuthService";

const registerSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Min 6 characters'),
    confirmPassword: z.string().min(6, 'Min 6 characters')
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Invalid Password Confirm',
    path: ['confirmPassword']
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
    const {register, handleSubmit, formState} = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema)
    });
    const navigate = useNavigate();
    const onSubmit = async (data: RegisterFormData) => {
        try {
            const authService = new AuthService();
            await authService.register(data.email,data.password);
            alert('Registered success, now you can login');
            navigate('/');
        } catch (error) {
            console.error(error);
            if(error instanceof Error)
                alert(error.message || 'Register error');
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <FormInput label="Email" register={register('email')} error={formState.errors.email?.message}></FormInput>
                <FormInput label="Password" register={register('password')} error={formState.errors.password?.message}></FormInput>
                <FormInput label="Confirm Password" register={register('confirmPassword')} error={formState.errors.confirmPassword?.message}></FormInput>
                <button type="submit">Register</button>
            </form>
            <p>Do you have an account? <Link to='/'>Login</Link></p>
        </div>
    );
};