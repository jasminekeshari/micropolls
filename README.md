# MicroPolls

A minimal polls app where admins create polls and users vote once per browser with live results.

## 🚀 Deployment Instructions

### Backend (Render)

1. **Create MongoDB Atlas Database**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com/)
   - Create a new cluster
   - Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/micropolls`

2. **Deploy to Render**
   - Connect your GitHub repo to [Render](https://render.com/)
   - Create a new Web Service
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variables:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/micropolls
     ADMIN_KEY=your-secure-admin-key
     PORT=5000
     FRONTEND_URL=https://your-frontend-url.vercel.app
     ```

### Frontend (Vercel)

1. **Deploy to Vercel**
   - Connect your GitHub repo to [Vercel](https://vercel.com/)
   - Set framework preset: Vite
   - Set root directory: `frontend`
   - Add environment variable:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com
     ```

## 🔑 Admin Key

Default demo key: `admin123`
Change this in production by setting the `ADMIN_KEY` environment variable.

## 📱 Features

- ✅ Admin-only poll creation
- ✅ One vote per browser (localStorage)
- ✅ Live results with 2-second auto-refresh
- ✅ Beautiful responsive UI
- ✅ Real-time vote counting
- ✅ Shareable poll URLs

## 🛠️ Local Development

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📋 API Endpoints

- `POST /api/polls` - Create poll (admin only)
- `GET /api/polls/:id` - Get poll with results
- `POST /api/polls/:id/vote` - Vote on poll

## 🎨 Tech Stack

- **Frontend**: React 19, Vite, UnoCSS, React Router
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Deployment**: Vercel (Frontend), Render (Backend)