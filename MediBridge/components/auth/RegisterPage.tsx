import { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, Alert, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Building2 } from 'lucide-react';

export default function RegisterPage() {
  const [role, setRole] = useState<'user' | 'hospital'>('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    hospital_name: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      await register({ ...formData, role });
      navigate(role === 'user' ? '/user/dashboard' : '/hospital/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create Account
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Join MediBridge today
        </Typography>

        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
          <ToggleButtonGroup
            value={role}
            exclusive
            onChange={(_, newRole) => newRole && setRole(newRole)}
            aria-label="user role"
            color="primary"
          >
            <ToggleButton value="user" aria-label="user">
              <User size={18} className="mr-2" />
              Patient
            </ToggleButton>
            <ToggleButton value="hospital" aria-label="hospital">
              <Building2 size={18} className="mr-2" />
              Hospital
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {role === 'user' ? (
            <>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                margin="normal"
                required
              />
            </>
          ) : (
            <>
              <TextField
                fullWidth
                label="Hospital Name"
                name="hospital_name"
                value={formData.hospital_name}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Admin Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
              />
            </>
          )}
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>
            Login here
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
