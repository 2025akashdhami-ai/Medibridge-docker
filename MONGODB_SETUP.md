# MongoDB Connection Setup Guide

## Option 1: Local MongoDB (Recommended for Development)

### Step 1: Install MongoDB

**Windows:**
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Run the installer
3. Choose "Complete" installation
4. Install as Windows Service (recommended)
5. Install MongoDB Compass (GUI tool) - optional but helpful

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install mongodb
```

### Step 2: Start MongoDB Service

**Windows:**
```bash
# Start MongoDB service
net start MongoDB

# Or if installed manually:
mongod --dbpath "C:\data\db"
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
# Enable auto-start on boot:
sudo systemctl enable mongod
```

### Step 3: Verify MongoDB is Running

Open a new terminal and run:
```bash
mongosh
# or older versions:
mongo
```

If you see the MongoDB shell prompt, it's working!

### Step 4: Create .env File

Create `backend/.env` file:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/medibridge
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRES_IN=7d
```

### Step 5: Test Connection

Start your backend:
```bash
cd backend
npm run start:dev
```

You should see:
```
🚀 MediBridge Backend running on http://localhost:3000
```

If MongoDB is connected, you won't see connection errors.

---

## Option 2: MongoDB Atlas (Cloud - Free Tier Available)

### Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account
3. Verify your email

### Step 2: Create a Cluster

1. Click "Build a Database"
2. Choose **FREE** tier (M0)
3. Select a cloud provider and region (choose closest to you)
4. Click "Create"
5. Wait 3-5 minutes for cluster to be created

### Step 3: Create Database User

1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter username and password (save these!)
5. Set privileges to "Atlas admin" or "Read and write to any database"
6. Click "Add User"

### Step 4: Whitelist Your IP Address

1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
   - Or add your specific IP: `0.0.0.0/0`
4. Click "Confirm"

### Step 5: Get Connection String

1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

### Step 6: Update .env File

Create `backend/.env` file:
```env
PORT=3000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/medibridge?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRES_IN=7d
```

**Important:** Replace:
- `YOUR_USERNAME` with your database username
- `YOUR_PASSWORD` with your database password
- `cluster0.xxxxx` with your actual cluster name
- Add `/medibridge` before the `?` to specify database name

### Step 7: Test Connection

Start your backend:
```bash
cd backend
npm run start:dev
```

---

## Troubleshooting

### Connection Refused Error

**Local MongoDB:**
- Check if MongoDB service is running: `net start MongoDB` (Windows)
- Verify MongoDB is listening on port 27017
- Check firewall settings

**MongoDB Atlas:**
- Verify IP address is whitelisted
- Check username/password are correct
- Ensure connection string includes database name

### Authentication Failed

- Double-check username and password
- Make sure special characters in password are URL-encoded
- Verify database user has correct permissions

### Timeout Errors

- Check internet connection (for Atlas)
- Verify IP whitelist includes your current IP
- Try connecting from MongoDB Compass to test

### Test Connection Manually

**Using MongoDB Compass:**
1. Download: https://www.mongodb.com/products/compass
2. Enter connection string
3. Click "Connect"

**Using mongosh:**
```bash
mongosh "mongodb://localhost:27017/medibridge"
# or for Atlas:
mongosh "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/medibridge"
```

---

## Quick Start Commands

**Local MongoDB:**
```bash
# Start MongoDB
net start MongoDB  # Windows
brew services start mongodb-community  # macOS
sudo systemctl start mongod  # Linux

# Create .env file
cd backend
echo PORT=3000 > .env
echo MONGODB_URI=mongodb://localhost:27017/medibridge >> .env
echo JWT_SECRET=your-secret-key-change-this-in-production >> .env
echo JWT_EXPIRES_IN=7d >> .env

# Start backend
npm run start:dev
```

---

## Recommended: MongoDB Compass (GUI Tool)

Download MongoDB Compass to visually manage your database:
- View collections and documents
- Run queries
- Monitor database performance
- Download: https://www.mongodb.com/products/compass


