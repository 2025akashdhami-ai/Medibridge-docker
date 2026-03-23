import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import LandingPage from './components/LandingPage';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import UserDashboard from './components/user/UserDashboard';
import SymptomAnalysis from './components/user/SymptomAnalysis';
import HospitalResources from './components/user/HospitalResources';
import ReportHistory from './components/user/ReportHistory';
import HospitalDashboard from './components/hospital/HospitalDashboard';
import ResourceManagement from './components/hospital/ResourceManagement';
import PatientReports from './components/hospital/PatientReports';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode; allowedRole?: 'user' | 'hospital' }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={isAuthenticated ? (user?.role === 'hospital' ? <Navigate to="/hospital/dashboard" /> : <Navigate to="/user/dashboard" />) : <LandingPage />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />} />
        
        {/* User Routes */}
        <Route path="/user/dashboard" element={<ProtectedRoute allowedRole="user"><UserDashboard /></ProtectedRoute>} />
        <Route path="/user/symptom-analysis" element={<ProtectedRoute allowedRole="user"><SymptomAnalysis /></ProtectedRoute>} />
        <Route path="/user/hospitals" element={<ProtectedRoute allowedRole="user"><HospitalResources /></ProtectedRoute>} />
        <Route path="/user/reports" element={<ProtectedRoute allowedRole="user"><ReportHistory /></ProtectedRoute>} />
        
        {/* Hospital Routes */}
        <Route path="/hospital/dashboard" element={<ProtectedRoute allowedRole="hospital"><HospitalDashboard /></ProtectedRoute>} />
        <Route path="/hospital/resources" element={<ProtectedRoute allowedRole="hospital"><ResourceManagement /></ProtectedRoute>} />
        <Route path="/hospital/patient-reports" element={<ProtectedRoute allowedRole="hospital"><PatientReports /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Router>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}



