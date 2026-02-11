import { Container, Typography, Grid, Card, CardContent, Button, Box, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { Brain, Hospital, ShieldCheck, Activity, Rocket } from 'lucide-react';

const features = [
  {
    title: 'AI Symptom Analysis',
    description: 'Enter symptoms in your own words and get a quick, structured pre-diagnosis.',
    icon: <Brain size={36} />,
  },
  {
    title: 'Real-time Hospital Data',
    description: 'See nearby hospitals with available beds, oxygen cylinders, and ambulances.',
    icon: <Hospital size={36} />,
  },
  {
    title: 'Doctor-ready Reports',
    description: 'Download a PDF summary to share with clinicians before you arrive.',
    icon: <ShieldCheck size={36} />,
  },
];

export default function LandingPage() {
  return (
    <Box sx={{ py: 8, background: 'linear-gradient(135deg, #e3f2fd 0%, #f5f5f5 60%)' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="overline" color="primary" sx={{ letterSpacing: 1.2 }}>
              MediBridge
            </Typography>
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Bridge patients and hospitals with smart, real-time care
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Describe your symptoms, get an AI-powered preliminary report, and find hospitals with the right resources before you travel.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button component={Link} to="/register" variant="contained" size="large" startIcon={<Rocket />}>
                Get Started
              </Button>
              <Button component={Link} to="/login" variant="outlined" size="large" startIcon={<Activity />}>
                Login
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={4} sx={{ p: 3, backdropFilter: 'blur(4px)' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Built for rapid triage
                </Typography>
                <Stack spacing={3}>
                  {features.map((feature) => (
                    <Box key={feature.title} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <Box sx={{ color: 'primary.main' }}>{feature.icon}</Box>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {feature.description}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}



