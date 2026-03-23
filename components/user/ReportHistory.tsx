import { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, Button, Grid, Chip, Alert } from '@mui/material';
import { FileText, Download, Calendar } from 'lucide-react';
import jsPDF from 'jspdf';

interface Report {
  id: number;
  symptoms: string;
  result: {
    disease: string;
    confidence: number;
    summary: string;
    recommendations: string[];
    severity: string;
  };
  timestamp: string;
}

export default function ReportHistory() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const savedReports = JSON.parse(localStorage.getItem('symptomReports') || '[]');
    setReports(savedReports.reverse()); // Show newest first
  }, []);

  const downloadReport = (report: Report) => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('MediBridge Symptom Analysis Report', 20, 20);
    
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date(report.timestamp).toLocaleDateString()}`, 20, 30);
    
    doc.setFontSize(14);
    doc.text('Symptoms Described:', 20, 45);
    doc.setFontSize(10);
    const splitSymptoms = doc.splitTextToSize(report.symptoms, 170);
    doc.text(splitSymptoms, 20, 55);
    
    doc.setFontSize(14);
    doc.text('Preliminary Diagnosis:', 20, 80);
    doc.setFontSize(12);
    doc.text(report.result.disease, 20, 90);
    doc.setFontSize(10);
    doc.text(`Confidence: ${report.result.confidence}%`, 20, 97);
    
    doc.setFontSize(14);
    doc.text('Summary:', 20, 110);
    doc.setFontSize(10);
    const splitSummary = doc.splitTextToSize(report.result.summary, 170);
    doc.text(splitSummary, 20, 120);
    
    doc.setFontSize(14);
    doc.text('Recommendations:', 20, 150);
    doc.setFontSize(10);
    report.result.recommendations.forEach((rec, index) => {
      doc.text(`${index + 1}. ${rec}`, 20, 160 + (index * 7));
    });
    
    doc.setFontSize(8);
    doc.text('Disclaimer: This is a preliminary assessment and not a substitute for professional medical advice.', 20, 280);
    
    doc.save(`symptom-report-${report.id}.pdf`);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'success';
      case 'moderate': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  if (reports.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" gutterBottom>
            <FileText className="inline mr-2" size={36} />
            Report History
          </Typography>
          <Typography variant="body1" color="text.secondary">
            View and download your past symptom analysis reports
          </Typography>
        </Box>

        <Alert severity="info">
          You haven't generated any reports yet. Start by analyzing your symptoms.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          <FileText className="inline mr-2" size={36} />
          Report History
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and download your past symptom analysis reports ({reports.length} total)
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {reports.map((report) => (
          <Grid item xs={12} key={report.id}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Typography variant="h5">
                        {report.result.disease}
                      </Typography>
                      <Chip 
                        label={report.result.severity.toUpperCase()}
                        color={getSeverityColor(report.result.severity)}
                        size="small"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Calendar size={16} />
                      {new Date(report.timestamp).toLocaleString()}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<Download />}
                    onClick={() => downloadReport(report)}
                  >
                    Download
                  </Button>
                </Box>

                <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                  Symptoms:
                </Typography>
                <Typography variant="body2" paragraph sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>
                  {report.symptoms}
                </Typography>

                <Typography variant="subtitle2" gutterBottom>
                  Summary:
                </Typography>
                <Typography variant="body2" paragraph>
                  {report.result.summary}
                </Typography>

                <Typography variant="subtitle2" gutterBottom>
                  Confidence: {report.result.confidence}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
