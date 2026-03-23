# MediBridge Quick Start Guide

## Prerequisites
- Node.js v18+ installed
- MongoDB running locally OR MongoDB Atlas account

## Step 1: Start MongoDB

### Option A: Local MongoDB
```bash
# Windows
net start MongoDB

# macOS/Linux  
mongod
```

### Option B: MongoDB Atlas (Cloud)
- Create account at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get connection string

## Step 2: Start Backend

```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/medibridge
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRES_IN=7d
```

Start backend:
```bash
npm run start:dev
```

Backend runs on: http://localhost:3000

## Step 3: Start Frontend

Open a new terminal:
```bash
cd ..  # Go back to root
npm install
```

Create `.env` (optional):
```env
VITE_API_URL=http://localhost:3000
```

Start frontend:
```bash
npm run dev
```

Frontend runs on: http://localhost:5173

## Step 4: Test the Application

1. Open http://localhost:5173 in your browser
2. Register a new user account
3. Try symptom analysis
4. Register a hospital account
5. Update hospital resources

## Troubleshooting

- **Backend won't start**: Check MongoDB is running and MONGODB_URI is correct
- **Frontend can't connect**: Ensure backend is running on port 3000
- **CORS errors**: Check backend CORS settings in `backend/src/main.ts`

## API Endpoints

- `POST /auth/register/user` - Register user
- `POST /auth/register/hospital` - Register hospital  
- `POST /auth/login` - Login
- `GET /hospitals` - List all hospitals
- `POST /ml/predict` - Predict disease from symptoms
- `POST /reports` - Create report (auth required)
- `PUT /hospitals/resources` - Update resources (hospital auth required)


