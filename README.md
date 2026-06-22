# 📋 Job Application Tracker — MERN Stack

A full MERN (MongoDB, Express, React, Node.js) application to track job applications:
company, role, date applied, and status (Applied → Interview → Rejected → Offer).

## Project Structure

```
job-tracker-mern/
├── backend/          Express + Mongoose API
│   ├── models/Job.js
│   ├── routes/jobRoutes.js
│   ├── server.js
│   └── package.json
└── frontend/          React (Vite) app
    ├── src/
    │   ├── components/
    │   ├── App.jsx
    │   ├── api.js
    │   └── main.jsx
    └── package.json
```

## 1. MongoDB Atlas Setup

1. Go to https://www.mongodb.com/cloud/atlas and create a free account / free cluster (M0 tier).
2. In Atlas, click **Database Access** → add a new database user with a username and password.
3. Click **Network Access** → add IP address `0.0.0.0/0` (allow access from anywhere) — fine for a personal project.
4. Click **Connect** on your cluster → **Drivers** → copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/jobtracker?retryWrites=true&w=majority
   ```
   Replace `<username>` and `<password>` with the database user you created, and add a database name (e.g. `jobtracker`) before the `?`.

## 2. Backend — Local Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and paste your Atlas connection string:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/jobtracker?retryWrites=true&w=majority
PORT=5000
```

Run it:
```bash
npm run dev
```
You should see `Connected to MongoDB` and `Server running on port 5000` in the terminal.
Test it by visiting http://localhost:5000 in your browser — it should say "Job Application Tracker API is running."

## 3. Frontend — Local Setup

```bash
cd frontend
npm install
cp .env.example .env
```

`.env` should contain:
```
VITE_API_URL=http://localhost:5000/api/jobs
```

Run it:
```bash
npm run dev
```
Open http://localhost:3000 — the app should load and connect to your local backend.

## 4. Deploying the Backend (Render)

1. Push the `backend/` folder to a GitHub repo (or push the whole `job-tracker-mern` repo; Render lets you set a root directory).
2. Go to https://render.com → New → Web Service → connect your GitHub repo.
3. Settings:
   - **Root Directory**: `backend` (if using the combined repo)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variable in Render's dashboard:
   - `MONGO_URI` = your Atlas connection string
5. Deploy. Render will give you a URL like `https://job-tracker-backend.onrender.com`.
6. Test it by visiting that URL — you should see the "API is running" message.

Note: Render's free tier spins down after inactivity, so the first request after idle time may take 30-60 seconds to wake up.

## 5. Deploying the Frontend (Vercel)

1. Push the `frontend/` folder to GitHub (or use the combined repo with Vercel's root directory setting).
2. Go to https://vercel.com → New Project → import your repo.
3. Settings:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite (should auto-detect)
4. Add environment variable in Vercel's dashboard:
   - `VITE_API_URL` = `https://job-tracker-backend.onrender.com/api/jobs` (your Render backend URL + `/api/jobs`)
5. Deploy. Vercel gives you a live URL like `https://job-tracker.vercel.app`.

## API Endpoints

| Method | Endpoint          | Description                  |
|--------|-------------------|-------------------------------|
| GET    | /api/jobs         | Get all job applications      |
| POST   | /api/jobs         | Add a new job application     |
| PUT    | /api/jobs/:id     | Update a job (e.g. status)    |
| DELETE | /api/jobs/:id     | Delete a job application      |

## Tech Stack

- **Frontend**: React 18, Vite, Axios
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB Atlas
- **Deployment**: Vercel (frontend), Render (backend)
