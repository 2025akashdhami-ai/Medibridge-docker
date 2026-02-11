import { useEffect, useRef } from 'react';
import { Box, Paper } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Hospital {
  id: string;
  name: string;
  coordinates: [number, number];
  beds_available: number;
}

interface HospitalMapProps {
  hospitals: Hospital[];
  selectedHospital: Hospital | null;
}

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function HospitalMap({ hospitals, selectedHospital }: HospitalMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('hospital-map').setView([28.6139, 77.2090], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapRef.current);
    }

    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    hospitals.forEach(hospital => {
      const marker = L.marker(hospital.coordinates).addTo(mapRef.current!);
      
      const popupContent = `
        <div style="min-width: 200px;">
          <strong style="font-size: 14px;">${hospital.name}</strong><br/>
          <span style="color: ${hospital.beds_available > 0 ? 'green' : 'red'};">
            ${hospital.beds_available} beds available
          </span>
        </div>
      `;
      
      marker.bindPopup(popupContent);
      markersRef.current[hospital.id] = marker;
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [hospitals]);

  useEffect(() => {
    if (selectedHospital && markersRef.current[selectedHospital.id]) {
      const marker = markersRef.current[selectedHospital.id];
      mapRef.current?.setView(selectedHospital.coordinates, 14);
      marker.openPopup();
    }
  }, [selectedHospital]);

  return (
    <Paper elevation={2}>
      <Box 
        id="hospital-map" 
        sx={{ 
          height: '70vh', 
          width: '100%',
          borderRadius: 1,
          overflow: 'hidden',
        }}
      />
    </Paper>
  );
}



