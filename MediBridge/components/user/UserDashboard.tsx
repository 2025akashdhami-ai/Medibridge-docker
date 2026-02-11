import { Container, Typography, Grid, Card, CardContent, CardActionArea, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Brain, Hospital, FileText, Activity } from 'lucide-react';

export default function UserDashboard() {
  const { user } = useAuth();

  const cards = [
    {
      title: 'Symptom Analysis',
      description: 'Describe your symptoms and get AI-powered preliminary diagnosis',
      icon: <Brain size={48} />,
      link: '/user/symptom-analysis',
      color: '#1976d2',
    },
    {
      title: 'Find Hospitals',
      description: 'View real-time hospital resource availability and locations',
      icon: <Hospital size={48} />,
      link: '/user/hospitals',
      color: '#2e7d32',
    },
    {
      title: 'My Reports',
      description: 'Access your symptom analysis history and download reports',
      icon: <FileText size={48} />,
      link: '/user/reports',
      color: '#ed6c02',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Welcome back, {user?.name}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Access your health tools and hospital information from your dashboard
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {cards.map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
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

      {/* Quick Stats */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Quick Stats
        </Typography>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Total Analyses
                </Typography>
                <Typography variant="h4">
                  3
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Last Analysis
                </Typography>
                <Typography variant="h4">
                  2 days ago
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Hospitals Viewed
                </Typography>
                <Typography variant="h4">
                  5
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Reports Generated
                </Typography>
                <Typography variant="h4">
                  3
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
