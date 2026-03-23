# MediBridge Backend API

NestJS backend for MediBridge healthcare platform with MongoDB.

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/medibridge
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRES_IN=7d
```

3. Start MongoDB (if running locally):
```bash
# Windows
net start MongoDB

# macOS/Linux
mongod
```

### Running the Backend

Development mode (with hot reload):
```bash
npm run start:dev
```

Production mode:
```bash
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /auth/register/user` - Register a new user
- `POST /auth/register/hospital` - Register a new hospital
- `POST /auth/login` - Login (user or hospital)
- `GET /auth/profile` - Get current user profile (requires auth)

### Hospitals
- `GET /hospitals` - Get all hospitals
- `GET /hospitals/:id` - Get hospital by ID
- `PUT /hospitals/resources` - Update hospital resources (hospital auth required)

### Reports
- `POST /reports` - Create a new symptom report (user auth required)
- `GET /reports/my-reports` - Get user's reports (user auth required)
- `GET /reports/all` - Get all reports (hospital auth required)
- `GET /reports/:id` - Get report by ID

### ML Service
- `POST /ml/predict` - Predict disease from symptoms

## Database Schema

### User
- name, email, password, age, role, symptoms_history

### Hospital
- hospital_name, email, password, beds_available, oxygen_cylinders, ambulances_available, location

### Report
- user_id, symptoms_text, predicted_disease, confidence, summary, recommendations, severity


