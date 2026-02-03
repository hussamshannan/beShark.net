# Shark Plan

A full-stack MERN application with a public-facing client, an admin dashboard, and a Node.js/Express backend.

## Project Structure

```
shark-plan/
├── client/      # Public-facing React app
├── admin/       # Admin dashboard (protected routes, content management)
└── server/      # Express API server
```

## Tech Stack

- **Frontend:** React 19, React Router, Vite, GSAP, Framer Motion, Swiper
- **Backend:** Express 5, Mongoose, JWT, Bcrypt, Multer, Cloudinary, Nodemailer
- **Database:** MongoDB
- **Deployment:** Vercel (client & admin), Render (server)

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- MongoDB instance (local or cloud)
- Cloudinary account
- Gmail or SMTP provider (for Nodemailer)

### 1. Server

```bash
cd server
cp .env.example .env   # fill in your values
npm install
npm run dev            # runs on port 5005
```

**Required `.env` variables:**

| Variable | Description |
|---|---|
| `MONGOODB` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `EMAIL_USER` | SMTP email address |
| `EMAIL_PASS` | SMTP email password |

### 2. Client

```bash
cd client
cp .env.example .env   # set VITE_API_URL
npm install
npm run dev
```

### 3. Admin

```bash
cd admin
cp .env.example .env   # set VITE_API_URL
npm install
npm run dev
```

**Both client and admin require:**

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the server (e.g., `http://localhost:5005`) |

## Available Scripts

| Directory | Script | Description |
|---|---|---|
| server | `npm run dev` | Start server with Nodemon (auto-reload) |
| server | `npm start` | Start server in production mode |
| client | `npm run dev` | Start Vite dev server |
| client | `npm run build` | Build for production |
| admin | `npm run dev` | Start Vite dev server |
| admin | `npm run build` | Build for production |

## Deployment

### Server → Render

- **Root directory:** `server`
- **Build command:** `npm install`
- **Start command:** `npm start`
- Add all server `.env` variables in the Render dashboard

### Client & Admin → Vercel

- Set **root directory** to `client` or `admin` respectively
- Vercel auto-detects Vite (build: `npm run build`, output: `dist`)
- Add `VITE_API_URL` env variable pointing to your Render server URL
