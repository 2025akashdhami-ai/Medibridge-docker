import { Injectable } from '@nestjs/common';

@Injectable()
export class MlServiceService {
  async predictDisease(symptoms: string): Promise<{
    disease: string;
    confidence: number;
    summary: string;
    recommendations: string[];
    severity: 'low' | 'moderate' | 'high';
  }> {
    // Mock ML prediction - in production, this would call your FastAPI ML service
    // For now, using keyword-based logic
    
    const symptomsLower = symptoms.toLowerCase();
    
    if (symptomsLower.includes('fever') || symptomsLower.includes('flu')) {
      return {
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
      };
    }
    
    if (symptomsLower.includes('headache') || symptomsLower.includes('migraine')) {
      return {
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
      };
    }
    
    if (symptomsLower.includes('chest') && symptomsLower.includes('pain')) {
      return {
        disease: 'Potential Cardiac Event',
        confidence: 91.2,
        summary: 'Chest pain with associated symptoms may indicate a cardiac event. This requires immediate medical attention.',
        recommendations: [
          'Seek emergency medical care immediately',
          'Do not delay treatment',
          'Call emergency services if severe',
          'Avoid physical exertion',
        ],
        severity: 'high',
      };
    }
    
    if (symptomsLower.includes('cough') && symptomsLower.includes('breathing')) {
      return {
        disease: 'Pneumonia',
        confidence: 88.7,
        summary: 'Severe cough with difficulty breathing suggests possible pneumonia, a serious lung infection that requires medical treatment.',
        recommendations: [
          'Consult a doctor immediately',
          'Get plenty of rest',
          'Stay hydrated',
          'Monitor breathing patterns',
        ],
        severity: 'high',
      };
    }
    
    // Default: Common Cold
    return {
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
  }
}


