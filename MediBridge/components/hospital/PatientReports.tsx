import { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, Grid, Chip, TextField, InputAdornment, Alert } from '@mui/material';
import { FileText, Search, Calendar, User } from 'lucide-react';

interface PatientReport {
  id: number;
  patient_name: string;
  patient_age: number;
  symptoms: string;
  predicted_disease: string;
  confidence: number;
  severity: string;
  timestamp: string;
}

// Mock patient reports data
const mockReports: PatientReport[] = [
  {
    id: 1,
    patient_name: 'John Doe',
    patient_age: 30,
    symptoms: 'High fever for the past 2 days, body ache, headache, and fatigue. Feeling weak and have lost appetite.',
    predicted_disease: 'Influenza (Flu)',
    confidence: 87.5,
    severity: 'moderate',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    patient_name: 'Sarah Smith',
    patient_age: 45,
    symptoms: 'Persistent headache for 3 days, sensitivity to light, nausea.',
    predicted_disease: 'Migraine',
    confidence: 82.3,
    severity: 'moderate',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    patient_name: 'Michael Johnson',
    patient_age: 55,
    symptoms: 'Chest pain, shortness of breath, sweating, dizziness.',
    predicted_disease: 'Potential Cardiac Event',
    confidence: 91.2,
    severity: 'high',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    patient_name: 'Emily Davis',
    patient_age: 28,
    symptoms: 'Runny nose, sneezing, mild sore throat, low-grade fever.',
    predicted_disease: 'Common Cold',
    confidence: 79.8,
    severity: 'low',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 5,
    patient_name: 'Robert Wilson',
    patient_age: 62,
    symptoms: 'Severe cough for 5 days, difficulty breathing, fever, chest congestion.',
    predicted_disease: 'Pneumonia',
    confidence: 88.7,
    severity: 'high',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
];

export default function PatientReports() {
  const [reports, setReports] = useState<PatientReport[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setReports(mockReports);
  }, []);

  const filteredReports = reports.filter(report =>
    report.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          <Grid item xs={12} key={report.id}>
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
                        {report.patient_name}, {report.patient_age} years
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Calendar size={16} />
                        {getTimeAgo(report.timestamp)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>
                  Patient-Reported Symptoms:
                </Typography>
                <Typography variant="body2" sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>
                  {report.symptoms}
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
