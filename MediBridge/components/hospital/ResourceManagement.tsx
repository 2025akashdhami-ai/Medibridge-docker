import { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, TextField, Button, Grid, Alert, Snackbar } from '@mui/material';
import { Bed, Wind, Ambulance, MapPin, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ResourceManagement() {
  const { user } = useAuth();
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    beds_available: 15,
    total_beds: 50,
    oxygen_cylinders: 25,
    ambulances_available: 3,
    total_ambulances: 5,
    address: '123 Main Street, Downtown',
    latitude: 28.6139,
    longitude: 77.2090,
    phone: '+91 11 2345 6789',
  });

  useEffect(() => {
    // Load saved data from localStorage
    const savedData = localStorage.getItem('hospitalResources');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('latitude') || name.includes('longitude') ? parseFloat(value) : parseInt(value) || value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage (in production, this would call your backend API)
    localStorage.setItem('hospitalResources', JSON.stringify(formData));
    
    setSuccessMessage('Resources updated successfully!');
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          Resource Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Update your hospital's resource availability in real-time
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          {/* Bed Information */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Bed /> Bed Availability
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Available Beds"
                  name="beds_available"
                  type="number"
                  value={formData.beds_available}
                  onChange={handleChange}
                  required
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Total Beds"
                  name="total_beds"
                  type="number"
                  value={formData.total_beds}
                  onChange={handleChange}
                  required
                  inputProps={{ min: 1 }}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Oxygen Information */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Wind /> Oxygen Cylinders
            </Typography>
            <TextField
              fullWidth
              label="Available Oxygen Cylinders"
              name="oxygen_cylinders"
              type="number"
              value={formData.oxygen_cylinders}
              onChange={handleChange}
              required
              inputProps={{ min: 0 }}
            />
          </Box>

          {/* Ambulance Information */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Ambulance /> Ambulance Availability
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Available Ambulances"
                  name="ambulances_available"
                  type="number"
                  value={formData.ambulances_available}
                  onChange={handleChange}
                  required
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Total Ambulances"
                  name="total_ambulances"
                  type="number"
                  value={formData.total_ambulances}
                  onChange={handleChange}
                  required
                  inputProps={{ min: 1 }}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Location Information */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <MapPin /> Location Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Latitude"
                  name="latitude"
                  type="number"
                  value={formData.latitude}
                  onChange={handleChange}
                  required
                  inputProps={{ step: 0.0001 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Longitude"
                  name="longitude"
                  type="number"
                  value={formData.longitude}
                  onChange={handleChange}
                  required
                  inputProps={{ step: 0.0001 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Contact Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
          </Box>

          <Alert severity="info" sx={{ mb: 3 }}>
            Updated information will be immediately visible to patients searching for hospital resources.
          </Alert>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            startIcon={<Save />}
          >
            Save Changes
          </Button>
        </form>
      </Paper>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={4000}
        onClose={() => setSuccessMessage('')}
        message={successMessage}
      />
    </Container>
  );
}
