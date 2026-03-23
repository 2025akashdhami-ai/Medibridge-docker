import { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, Alert, CircularProgress, Card, CardContent, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Brain, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import api from '../../services/api';

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
    
    try {
      // Call ML prediction API
      const predictionResponse = await api.post('/ml/predict', { symptoms });
      const predictionResult = predictionResponse.data;

      setResult(predictionResult);

      // Save report to database
      await api.post('/reports', {
        symptoms_text: symptoms,
        predicted_disease: predictionResult.disease,
        confidence: predictionResult.confidence,
        summary: predictionResult.summary,
        recommendations: predictionResult.recommendations,
        severity: predictionResult.severity,
      });
    } catch (error: any) {
      console.error('Error analyzing symptoms:', error);
      alert(error.response?.data?.message || 'Failed to analyze symptoms');
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    if (!result) return;

    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('MediBridge Symptom Analysis Report', 20, 20);
    
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 30);
    
    doc.setFontSize(14);
    doc.text('Symptoms Described:', 20, 45);
    doc.setFontSize(10);
    const splitSymptoms = doc.splitTextToSize(symptoms, 170);
    doc.text(splitSymptoms, 20, 55);
    
    doc.setFontSize(14);
    doc.text('Preliminary Diagnosis:', 20, 80);
    doc.setFontSize(12);
    doc.text(result.disease, 20, 90);
    doc.setFontSize(10);
    doc.text(`Confidence: ${result.confidence}%`, 20, 97);
    
    doc.setFontSize(14);
    doc.text('Summary:', 20, 110);
    doc.setFontSize(10);
    const splitSummary = doc.splitTextToSize(result.summary, 170);
    doc.text(splitSummary, 20, 120);
    
    doc.setFontSize(14);
    doc.text('Recommendations:', 20, 150);
    doc.setFontSize(10);
    result.recommendations.forEach((rec, index) => {
      doc.text(`${index + 1}. ${rec}`, 20, 160 + (index * 7));
    });
    
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


