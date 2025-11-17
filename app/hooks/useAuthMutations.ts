import { useMutation } from 'react-query';
import axios from 'axios';
import { CreateUserDto } from '../type/user-role.type';

export interface AuthResponse {
    accessToken: string;
    userRole:string;
    userId:string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/administration';

const login = async (data: LoginData): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, data);
    return response.data;
};

const register = async (data: CreateUserDto): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(`${API_URL}/administration/auth/register`, data);
    return response.data;
};

export function useLogin() {
    return useMutation(login);
}

export function useRegister() {
    return useMutation(register);
}