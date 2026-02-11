import { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, Grid, Chip, TextField, InputAdornment, Alert, CircularProgress } from '@mui/material';
import { FileText, Search, Calendar, User } from 'lucide-react';
import api from '../../services/api';

interface PatientReport {
  _id: string;
  user_id: {
    name: string;
    age: number;
    email: string;
  };
  symptoms_text: string;
  predicted_disease: string;
  confidence: number;
  severity: string;
  createdAt: string;
}

export default function PatientReports() {
  const [reports, setReports] = useState<PatientReport[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await api.get('/reports/all');
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = reports.filter(report =>
    report.user_id?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.predicted_disease.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'success';
      case 'moderate': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than 1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          <FileText className="inline mr-2" size={36} />
          Patient Pre-Diagnosis Reports
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View symptom analysis reports submitted by patients before their visit
        </Typography>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        These are preliminary AI-generated assessments. Always conduct thorough examination and diagnosis.
      </Alert>

      <TextField
        fullWidth
        placeholder="Search by patient name or disease..."
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

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredReports.length} report{filteredReports.length !== 1 ? 's' : ''}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {filteredReports.map((report) => (
          <Grid item xs={12} key={report._id}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Typography variant="h5">
                        {report.predicted_disease}
                      </Typography>
                      <Chip 
                        label={report.severity.toUpperCase()}
                        color={getSeverityColor(report.severity)}
                        size="small"
                      />
                      <Chip
                        label={`${report.confidence}% confidence`}
                        variant="outlined"
                        size="small"
                      />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 3, mt: 1 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <User size={16} />
                        {report.user_id?.name || 'Unknown'}, {report.user_id?.age || 'N/A'} years
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Calendar size={16} />
                        {getTimeAgo(report.createdAt)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>
                  Patient-Reported Symptoms:
                </Typography>
                <Typography variant="body2" sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>
                  {report.symptoms_text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredReports.length === 0 && (
        <Alert severity="info" sx={{ mt: 3 }}>
          No reports found matching your search criteria.
        </Alert>
      )}
    </Container>
  );
}


