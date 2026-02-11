import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Box, Chip, Button, TextField, InputAdornment, CircularProgress } from '@mui/material';
import { Hospital, Bed, Wind, Ambulance, MapPin, Search, Phone } from 'lucide-react';
import HospitalMap from '../common/HospitalMap';
import api from '../../services/api';

interface HospitalData {
  _id: string;
  hospital_name: string;
  location?: {
    address?: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
  };
  beds_available: number;
  oxygen_cylinders: number;
  ambulances_available: number;
}

export default function HospitalResources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHospital, setSelectedHospital] = useState<HospitalData | null>(null);
  const [hospitals, setHospitals] = useState<HospitalData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await api.get('/hospitals');
      setHospitals(response.data);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.hospital_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.location?.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAvailabilityColor = (count: number) => {
    if (count === 0) return 'error';
    if (count < 5) return 'warning';
    return 'success';
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 6, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  // Transform hospital data for map component
  const hospitalsForMap = filteredHospitals.map(h => ({
    id: h._id,
    name: h.hospital_name,
    coordinates: [h.location?.latitude || 28.6139, h.location?.longitude || 77.2090] as [number, number],
    beds_available: h.beds_available,
  }));

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          <Hospital className="inline mr-2" size={36} />
          Hospital Resources
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Find real-time availability of beds, oxygen cylinders, and ambulances
        </Typography>
      </Box>

      <TextField
        fullWidth
        placeholder="Search hospitals by name or location..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Available Hospitals ({filteredHospitals.length})
            </Typography>
          </Box>
          
          <Box sx={{ maxHeight: '70vh', overflow: 'auto', pr: 1 }}>
            <Grid container spacing={2}>
              {filteredHospitals.map((hospital) => (
                <Grid item xs={12} key={hospital._id}>
                  <Card 
                    sx={{ 
                      cursor: 'pointer',
                      border: selectedHospital?._id === hospital._id ? 2 : 0,
                      borderColor: 'primary.main',
                      transition: 'all 0.2s',
                      '&:hover': { boxShadow: 4 },
                    }}
                    onClick={() => setSelectedHospital(hospital)}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                        <Box>
                          <Typography variant="h6" gutterBottom>
                            {hospital.hospital_name}
                          </Typography>
                          {hospital.location?.address && (
                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <MapPin size={16} />
                              {hospital.location.address}
                            </Typography>
                          )}
                        </Box>
                      </Box>

                      <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={4}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Bed size={24} className="mx-auto mb-1" />
                            <Typography variant="h6">
                              {hospital.beds_available}
                            </Typography>
                            <Chip
                              label="Beds"
                              size="small"
                              color={getAvailabilityColor(hospital.beds_available)}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Wind size={24} className="mx-auto mb-1" />
                            <Typography variant="h6">
                              {hospital.oxygen_cylinders}
                            </Typography>
                            <Chip
                              label="Oxygen"
                              size="small"
                              color={getAvailabilityColor(hospital.oxygen_cylinders)}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Ambulance size={24} className="mx-auto mb-1" />
                            <Typography variant="h6">
                              {hospital.ambulances_available}
                            </Typography>
                            <Chip
                              label="Ambulance"
                              size="small"
                              color={getAvailabilityColor(hospital.ambulances_available)}
                            />
                          </Box>
                        </Grid>
                      </Grid>

                      {hospital.location?.phone && (
                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={<Phone />}
                          sx={{ mt: 2 }}
                          href={`tel:${hospital.location.phone}`}
                        >
                          {hospital.location.phone}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Box sx={{ position: 'sticky', top: 80 }}>
            <Typography variant="h5" gutterBottom>
              Hospital Locations
            </Typography>
            <HospitalMap hospitals={hospitalsForMap} selectedHospital={selectedHospital ? {
              id: selectedHospital._id,
              name: selectedHospital.hospital_name,
              coordinates: [selectedHospital.location?.latitude || 28.6139, selectedHospital.location?.longitude || 77.2090] as [number, number],
              beds_available: selectedHospital.beds_available,
            } : null} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}


