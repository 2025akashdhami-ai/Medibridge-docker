import { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, Alert, CircularProgress, Card, CardContent, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Brain, Download, CheckCircle2 } from 'lucide-react';
import jsPDF from 'jspdf';

interface PredictionResult {
  disease: string;
  confidence: number;
  summary: string;
  recommendations: string[];
  severity: 'low' | 'moderate' | 'high';
}

export default function SymptomAnalysis() {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return;

    setLoading(true);
    
    // Mock ML prediction - in production, this calls your FastAPI ML service
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock response based on keywords
    const mockResult: PredictionResult = symptoms.toLowerCase().includes('fever')
      ? {
          disease: 'Influenza (Flu)',
          confidence: 87.5,
          summary: 'Based on the symptoms described (fever, body ache, fatigue), the preliminary analysis suggests a possible case of Influenza. This is a common viral infection affecting the respiratory system.',
          recommendations: [
            'Rest and stay hydrated',
            'Monitor temperature regularly',
            'Consult a doctor if symptoms worsen',
            'Avoid contact with others to prevent spread',
          ],
          severity: 'moderate',
        }
      : symptoms.toLowerCase().includes('headache')
      ? {
          disease: 'Tension Headache',
          confidence: 82.3,
          summary: 'The symptoms indicate a tension-type headache, commonly caused by stress, poor posture, or muscle tension. This is generally not a serious condition but should be monitored.',
          recommendations: [
            'Take over-the-counter pain relievers if needed',
            'Practice relaxation techniques',
            'Ensure adequate sleep and hydration',
            'Consult a doctor if headaches persist or worsen',
          ],
          severity: 'low',
        }
      : {
          disease: 'Common Cold',
          confidence: 79.8,
          summary: 'The symptoms suggest a common cold, a viral infection of the upper respiratory tract. This is typically a mild condition that resolves on its own.',
          recommendations: [
            'Get plenty of rest',
            'Drink warm fluids',
            'Use saline nasal drops if needed',
            'Seek medical attention if symptoms persist beyond 7-10 days',
          ],
          severity: 'low',
        };

    setResult(mockResult);
    setLoading(false);

    // Save to local storage (mock database)
    const reports = JSON.parse(localStorage.getItem('symptomReports') || '[]');
    reports.push({
      id: Date.now(),
      symptoms,
      result: mockResult,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('symptomReports', JSON.stringify(reports));
  };

  const downloadReport = () => {
    if (!result) return;

    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('MediBridge Symptom Analysis Report', 20, 20);
    
    // Date
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 30);
    
    // Symptoms
    doc.setFontSize(14);
    doc.text('Symptoms Described:', 20, 45);
    doc.setFontSize(10);
    const splitSymptoms = doc.splitTextToSize(symptoms, 170);
    doc.text(splitSymptoms, 20, 55);
    
    // Prediction
    doc.setFontSize(14);
    doc.text('Preliminary Diagnosis:', 20, 80);
    doc.setFontSize(12);
    doc.text(result.disease, 20, 90);
    doc.setFontSize(10);
    doc.text(`Confidence: ${result.confidence}%`, 20, 97);
    
    // Summary
    doc.setFontSize(14);
    doc.text('Summary:', 20, 110);
    doc.setFontSize(10);
    const splitSummary = doc.splitTextToSize(result.summary, 170);
    doc.text(splitSummary, 20, 120);
    
    // Recommendations
    doc.setFontSize(14);
    doc.text('Recommendations:', 20, 150);
    doc.setFontSize(10);
    result.recommendations.forEach((rec, index) => {
      doc.text(`${index + 1}. ${rec}`, 20, 160 + (index * 7));
    });
    
    // Disclaimer
    doc.setFontSize(8);
    doc.text('Disclaimer: This is a preliminary assessment and not a substitute for professional medical advice.', 20, 280);
    
    doc.save('symptom-analysis-report.pdf');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'success';
      case 'moderate': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          <Brain className="inline mr-2" size={36} />
          Symptom Analysis
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Describe your symptoms in detail and our AI will provide a preliminary assessment
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <TextField
          fullWidth
          multiline
          rows={6}
          label="Describe Your Symptoms"
          placeholder="Example: I have been experiencing high fever for the past 2 days, along with body ache, headache, and fatigue. I also feel weak and have lost my appetite."
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          helperText="Be as detailed as possible. Include duration, intensity, and any other relevant information."
        />
        
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleAnalyze}
          disabled={!symptoms.trim() || loading}
          sx={{ mt: 3 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Analyze Symptoms'}
        </Button>

        <Alert severity="info" sx={{ mt: 3 }}>
          This is a preliminary assessment tool and does not replace professional medical diagnosis. 
          Please consult a doctor for accurate diagnosis and treatment.
        </Alert>
      </Paper>

      {result && (
        <Card elevation={3}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5">
                Analysis Result
              </Typography>
              <Chip 
                label={`${result.severity.toUpperCase()} SEVERITY`}
                color={getSeverityColor(result.severity)}
                size="small"
              />
            </Box>

            <Box sx={{ mb: 3, p: 3, bgcolor: 'primary.light', color: 'white', borderRadius: 2 }}>
              <Typography variant="h4" gutterBottom>
                {result.disease}
              </Typography>
              <Typography variant="body2">
                Confidence: {result.confidence}%
              </Typography>
            </Box>

            <Typography variant="h6" gutterBottom>
              Summary
            </Typography>
            <Typography variant="body1" paragraph>
              {result.summary}
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Recommendations
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              {result.recommendations.map((rec, index) => (
                <li key={index}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {rec}
                  </Typography>
                </li>
              ))}
            </Box>

            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={downloadReport}
              >
                Download Report
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/user/hospitals')}
              >
                Find Hospitals
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
