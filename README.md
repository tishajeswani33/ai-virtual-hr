# 🤖 AI Virtual HR Manager

A modern, full-stack **AI-powered Human Resource Management System** built with React, Vite, Express.js, MongoDB, and Supabase Authentication. Manage employees, track candidates, conduct voice interviews, and automate offer letters — all in one beautiful dashboard.

---

## 🌐 Live Demo

👉 [virtual-hr-nextjs-ai.vercel.app](https://virtual-hr-nextjs-ai.vercel.app)

---

## ✨ Features

- 📊 **Dashboard** — Real-time HR stats and KPIs
- 👥 **Employee Management** — Add, update, and delete employee records with live database sync
- 🎯 **Candidate Pipeline** — Kanban-style recruitment board to move candidates through stages (Applied → Screening → Interview → Offer → Rejected)
- 🎤 **AI Voice Interview** — Record video/audio interviews with speech-to-text answers
- 💬 **AI HR Assistant** — Chatbot to query employee stats, performance, and HR policies
- 📲 **WhatsApp Offer Letters** — One-click pre-filled WhatsApp offer letter automation for selected candidates
- 🔐 **Authentication** — Secure login for Candidates and HR Admins via Supabase
  - Email Magic Link (passwordless)
  - Google OAuth sign-in
- 🗄️ **Persistent Database** — MongoDB Atlas cloud database for all employee and candidate data

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 7, TypeScript |
| Styling | Tailwind CSS v4, Framer Motion |
| Icons | Lucide React |
| Charts | Recharts |
| Auth | Supabase (Magic Link + Google OAuth) |
| Backend | Express.js (Serverless via Vercel) |
| Database | MongoDB Atlas + Mongoose |
| Deployment | Vercel |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas URI)
- Supabase project

### 1. Clone the repository
```bash
git clone https://github.com/tishajeswani33/ai-virtual-hr.git
cd ai-virtual-hr
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create a `.env.local` file
```env
VITE_API_BASE=http://localhost:5000/api
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Start the backend server (in a separate terminal)
```bash
cd ../backend
node server.js
```

### 5. Start the frontend dev server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌍 Environment Variables for Production

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `VITE_API_BASE` | `/api` (for Vercel serverless) |
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon public key |

---

## 📁 Project Structure

```
ai-virtual-hr/
├── api/                    # Express.js serverless backend (for Vercel)
│   ├── index.js            # Main server entry point
│   ├── models/
│   │   ├── Employee.js     # Mongoose Employee schema
│   │   └── Candidate.js    # Mongoose Candidate schema
│   └── routes/
│       └── hrRoutes.js     # CRUD API routes
├── src/
│   ├── components/
│   │   └── Layout.tsx      # App shell with navigation
│   ├── context/
│   │   └── HRContext.tsx   # Global state + API integration
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Employees.tsx
│   │   ├── Candidates.tsx
│   │   ├── AIAssistant.tsx
│   │   ├── VoiceInterview.tsx
│   │   ├── UserLogin.tsx
│   │   ├── AdminLogin.tsx
│   │   └── SignUp.tsx
│   └── utils/
│       └── supabase.ts     # Supabase client
├── vercel.json             # Vercel routing config
└── vite.config.ts          # Vite build config
```

---

## 📸 Screenshots

| Dashboard | Candidates Pipeline |
|-----------|-------------------|
| Real-time stats and KPIs | Kanban board with drag-like stage movement |

---

## 📄 License

MIT © [Tisha Jeswani](https://github.com/tishajeswani33)
