import { useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Box, Chip, Button, TextField, InputAdornment } from '@mui/material';
import { Hospital, Bed, Wind, Ambulance, MapPin, Search, Phone } from 'lucide-react';
import HospitalMap from '../common/HospitalMap';

interface HospitalData {
  id: string;
  name: string;
  location: string;
  coordinates: [number, number];
  beds_available: number;
  oxygen_cylinders: number;
  ambulances_available: number;
  phone: string;
  distance: string;
}

const mockHospitals: HospitalData[] = [
  {
    id: 'h1',
    name: 'City General Hospital',
    location: '123 Main Street, Downtown',
    coordinates: [28.6139, 77.2090],
    beds_available: 15,
    oxygen_cylinders: 25,
    ambulances_available: 3,
    phone: '+91 11 2345 6789',
    distance: '2.5 km',
  },
  {
    id: 'h2',
    name: 'St. Mary\'s Medical Center',
    location: '456 Park Avenue, Central District',
    coordinates: [28.6289, 77.2193],
    beds_available: 8,
    oxygen_cylinders: 12,
    ambulances_available: 2,
    phone: '+91 11 2345 6790',
    distance: '3.8 km',
  },
  {
    id: 'h3',
    name: 'Metro Healthcare Institute',
    location: '789 Hospital Road, East Zone',
    coordinates: [28.6400, 77.2300],
    beds_available: 0,
    oxygen_cylinders: 5,
    ambulances_available: 1,
    phone: '+91 11 2345 6791',
    distance: '5.2 km',
  },
  {
    id: 'h4',
    name: 'Apollo Multispecialty Hospital',
    location: '321 Health Boulevard, North District',
    coordinates: [28.6500, 77.2100],
    beds_available: 22,
    oxygen_cylinders: 35,
    ambulances_available: 5,
    phone: '+91 11 2345 6792',
    distance: '4.1 km',
  },
  {
    id: 'h5',
    name: 'Fortis Emergency Care',
    location: '654 Medical Plaza, South Zone',
    coordinates: [28.6000, 77.2000],
    beds_available: 5,
    oxygen_cylinders: 8,
    ambulances_available: 2,
    phone: '+91 11 2345 6793',
    distance: '6.7 km',
  },
];

export default function HospitalResources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHospital, setSelectedHospital] = useState<HospitalData | null>(null);

  const filteredHospitals = mockHospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAvailabilityColor = (count: number) => {
    if (count === 0) return 'error';
    if (count < 5) return 'warning';
    return 'success';
  };

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
                <Grid item xs={12} key={hospital.id}>
                  <Card 
                    sx={{ 
                      cursor: 'pointer',
                      border: selectedHospital?.id === hospital.id ? 2 : 0,
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
                            {hospital.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <MapPin size={16} />
                            {hospital.location}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            Distance: {hospital.distance}
                          </Typography>
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

                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Phone />}
                        sx={{ mt: 2 }}
                        href={`tel:${hospital.phone}`}
                      >
                        {hospital.phone}
                      </Button>
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
            <HospitalMap hospitals={filteredHospitals} selectedHospital={selectedHospital} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
