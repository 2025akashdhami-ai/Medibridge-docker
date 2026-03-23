# Troubleshooting Guide

## Registration Failed Error

### Common Causes:

1. **Backend Not Running**
   - Check if backend is running on port 3000
   - Look for: `🚀 MediBridge Backend running on http://localhost:3000`
   - Start backend: `cd backend && npm run start:dev`

2. **MongoDB Not Connected**
   - Check MongoDB is running
   - Windows: `net start MongoDB`
   - Check connection string in `backend/.env`
   - Should be: `MONGODB_URI=mongodb://localhost:27017/medibridge`

3. **CORS Issues**
   - Ensure frontend URL is in backend CORS settings
   - Check `backend/src/main.ts` has your frontend URL

4. **Validation Errors**
   - Age must be a number (not string)
   - Password must be at least 6 characters
   - Email must be valid format
   - All required fields must be filled

5. **Network Connection**
   - Check browser console for errors
   - Check backend terminal for error logs
   - Verify API URL in `src/services/api.ts`

### Debug Steps:

1. **Check Backend Logs**
   ```bash
   cd backend
   npm run start:dev
   ```
   Look for error messages in terminal

2. **Check Browser Console**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for error messages
   - Check Network tab for failed requests

3. **Test API Directly**
   ```bash
   curl -X POST http://localhost:3000/auth/register/user \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@test.com","password":"password123","age":25}'
   ```

4. **Check MongoDB Connection**
   ```bash
   mongosh
   use medibridge
   show collections
   ```

### Quick Fixes:

1. **Restart Backend**
   ```bash
   cd backend
   npm run start:dev
   ```

2. **Clear Browser Cache**
   - Clear localStorage
   - Hard refresh (Ctrl+Shift+R)

3. **Check Environment Variables**
   - Backend `.env` file exists
   - MongoDB URI is correct
   - JWT_SECRET is set


