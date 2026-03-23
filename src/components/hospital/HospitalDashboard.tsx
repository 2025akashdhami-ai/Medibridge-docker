import { Container, Typography, Grid, Card, CardContent, CardActionArea, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Bed, Wind, Ambulance, FileText, Users } from 'lucide-react';

export default function HospitalDashboard() {
  const { user } = useAuth();

  const cards = [
    {
      title: 'Resource Management',
      description: 'Update bed availability, oxygen cylinders, and ambulance status',
      icon: <Bed size={48} />,
      link: '/hospital/resources',
      color: '#1976d2',
    },
    {
      title: 'Patient Reports',
      description: 'View incoming patient pre-diagnosis reports and symptom summaries',
      icon: <FileText size={48} />,
      link: '/hospital/patient-reports',
      color: '#2e7d32',
    },
  ];

  const currentResources = {
    beds_available: 15,
    total_beds: 50,
    oxygen_cylinders: 25,
    ambulances_available: 3,
    total_ambulances: 5,
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          {user?.hospital_name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your hospital resources and view patient information
        </Typography>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          Current Resource Status
        </Typography>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'primary.light', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6">
                    Beds Available
                  </Typography>
                  <Bed size={32} />
                </Box>
                <Typography variant="h3">
                  {currentResources.beds_available}
                </Typography>
                <Typography variant="body2">
                  of {currentResources.total_beds} total
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'success.light', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6">
                    Oxygen
                  </Typography>
                  <Wind size={32} />
                </Box>
                <Typography variant="h3">
                  {currentResources.oxygen_cylinders}
                </Typography>
                <Typography variant="body2">
                  cylinders available
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'warning.light', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6">
                    Ambulances
                  </Typography>
                  <Ambulance size={32} />
                </Box>
                <Typography variant="h3">
                  {currentResources.ambulances_available}
                </Typography>
                <Typography variant="body2">
                  of {currentResources.total_ambulances} available
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'secondary.light', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6">
                    Patient Reports
                  </Typography>
                  <Users size={32} />
                </Box>
                <Typography variant="h3">
                  12
                </Typography>
                <Typography variant="body2">
                  new this week
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={4} sx={{ mt: 1 }}>
          {cards.map((card, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'all 0.3s',
                  '&:hover': { 
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardActionArea 
                  component={Link} 
                  to={card.link}
                  sx={{ height: '100%', p: 3 }}
                >
                  <CardContent>
                    <Box sx={{ color: card.color, mb: 2 }}>
                      {card.icon}
                    </Box>
                    <Typography variant="h5" gutterBottom>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}



