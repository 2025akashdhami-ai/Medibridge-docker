import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('mediBridgeUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string, role: 'user' | 'hospital') => {
    // Mock login - in production, this would call your backend API
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockUser: User = role === 'user' 
      ? {
          id: '1',
          name: 'John Doe',
          email,
          role: 'user',
          age: 30,
        }
      : {
          id: 'h1',
          name: 'Admin',
          email,
          role: 'hospital',
          hospital_name: 'City General Hospital',
        };

    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('mediBridgeUser', JSON.stringify(mockUser));
  };

  const register = async (data: any) => {
    // Mock registration - in production, this would call your backend API
    await new Promise(resolve => setTimeout(resolve, 500));

    const newUser: User = data.role === 'user'
      ? {
          id: Date.now().toString(),
          name: data.name,
          email: data.email,
          role: 'user',
          age: data.age,
        }
      : {
          id: 'h' + Date.now().toString(),
          name: 'Admin',
          email: data.email,
          role: 'hospital',
          hospital_name: data.hospital_name,
        };

    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('mediBridgeUser', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('mediBridgeUser');
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
