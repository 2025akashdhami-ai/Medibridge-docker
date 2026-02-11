# MediBridge - Healthcare Platform

A web-based healthcare platform that streamlines early patient assessment and improves access to real-time hospital resource information.

## Features

- **AI-Powered Symptom Analysis**: Users describe symptoms in natural language and receive preliminary disease predictions
- **Hospital Resource Management**: Real-time visibility into bed, oxygen cylinder, and ambulance availability
- **Patient Reports**: Generate and download structured PDF reports for doctors
- **Role-Based Access**: Separate dashboards for patients and hospitals

## Tech Stack

### Frontend
- React 18 + Vite
- Material-UI (MUI)
- React Router
- Axios
- jsPDF
- Leaflet Maps

### Backend
- NestJS
- MongoDB + Mongoose
- JWT Authentication
- Passport.js

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/medibridge
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRES_IN=7d
```

4. Start MongoDB (if running locally)

5. Start the backend:
```bash
npm run start:dev
```

Backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to root directory:
```bash
cd ..
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional):
```env
VITE_API_URL=http://localhost:3000
```

4. Start the frontend:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## Usage

1. **Register/Login**: Create an account as a patient or hospital
2. **Patients**: 
   - Enter symptoms for AI analysis
   - View hospital resources and locations
   - Download PDF reports
3. **Hospitals**:
   - Update resource availability (beds, oxygen, ambulances)
   - View incoming patient pre-diagnosis reports

## Project Structure

```
MediBridge/
├── backend/          # NestJS backend API
│   ├── src/
│   │   ├── auth/     # Authentication module
│   │   ├── hospitals/ # Hospital management
│   │   ├── reports/   # Report management
│   │   └── ml-service/ # ML prediction service
│   └── package.json
├── src/              # React frontend
│   ├── components/  # React components
│   ├── context/     # Auth context
│   └── services/    # API services
└── package.json
```

## Development

- Backend: `cd backend && npm run start:dev`
- Frontend: `npm run dev`
- Build: `npm run build` (both frontend and backend)

## License

MIT


