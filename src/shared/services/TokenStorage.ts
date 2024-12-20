import { jwtDecode } from "jwt-decode";
import { User } from "../../auth/models/AuthState";

const TOKEN_KEY = 'token';

export class TokenStorage {
    static getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    }

    static setToken(token: string): void {
        if(token === '') throw new Error('token is empty');
        localStorage.setItem(TOKEN_KEY, token);
    }

    static removeToken(): void {
        localStorage.removeItem(TOKEN_KEY);
    }

    static decodeToken(token: string): User {
        return jwtDecode<User>(token);
    }
}