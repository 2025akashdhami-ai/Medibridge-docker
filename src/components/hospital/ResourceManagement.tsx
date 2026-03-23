import { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, TextField, Button, Grid, Alert, Snackbar, CircularProgress } from '@mui/material';
import { Bed, Wind, Ambulance, MapPin, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export default function ResourceManagement() {
  const { user } = useAuth();
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    beds_available: 0,
    total_beds: 0,
    oxygen_cylinders: 0,
    ambulances_available: 0,
    total_ambulances: 0,
    address: '',
    latitude: 28.6139,
    longitude: 77.2090,
    phone: '',
  });

  useEffect(() => {
    fetchHospitalData();
  }, []);

  const fetchHospitalData = async () => {
    try {
      const response = await api.get('/hospitals');
      const hospital = response.data.find((h: any) => h._id === user?.id) || response.data[0];
      if (hospital) {
        setFormData({
          beds_available: hospital.beds_available || 0,
          total_beds: hospital.total_beds || 0,
          oxygen_cylinders: hospital.oxygen_cylinders || 0,
          ambulances_available: hospital.ambulances_available || 0,
          total_ambulances: hospital.total_ambulances || 0,
          address: hospital.location?.address || '',
          latitude: hospital.location?.latitude || 28.6139,
          longitude: hospital.location?.longitude || 77.2090,
          phone: hospital.location?.phone || '',
        });
      }
    } catch (error) {
      console.error('Error fetching hospital data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('latitude') || name.includes('longitude') ? parseFloat(value) : parseInt(value) || value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put('/hospitals/resources', {
        beds_available: formData.beds_available,
        total_beds: formData.total_beds,
        oxygen_cylinders: formData.oxygen_cylinders,
        ambulances_available: formData.ambulances_available,
        total_ambulances: formData.total_ambulances,
        location: {
          address: formData.address,
          latitude: formData.latitude,
          longitude: formData.longitude,
          phone: formData.phone,
        },
      });
      setSuccessMessage('Resources updated successfully!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to update resources');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 6, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

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


