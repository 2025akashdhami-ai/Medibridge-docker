import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'hospital';
  age?: number;
  hospital_name?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: 'user' | 'hospital') => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('mediBridgeUser');
    const storedToken = localStorage.getItem('mediBridgeToken');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string, role: 'user' | 'hospital') => {
    try {
      const response = await api.post('/auth/login', { email, password, role });
      const { access_token, user: userData } = response.data;
      
      localStorage.setItem('mediBridgeToken', access_token);
      localStorage.setItem('mediBridgeUser', JSON.stringify(userData));
      
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (data: any) => {
    try {
      const endpoint = data.role === 'user' ? '/auth/register/user' : '/auth/register/hospital';
      
      // Prepare data for API - remove role and confirmPassword, ensure age is number
      const apiData = data.role === 'user' 
        ? {
            name: data.name,
            email: data.email,
            password: data.password,
            age: typeof data.age === 'string' ? parseInt(data.age) : data.age,
          }
        : {
            hospital_name: data.hospital_name,
            email: data.email,
            password: data.password,
          };
      
      const response = await api.post(endpoint, apiData);
      const { access_token, user: userData } = response.data;
      
      localStorage.setItem('mediBridgeToken', access_token);
      localStorage.setItem('mediBridgeUser', JSON.stringify(userData));
      
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error: any) {
      // Error is already formatted by axios interceptor
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('mediBridgeUser');
    localStorage.removeItem('mediBridgeToken');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}


