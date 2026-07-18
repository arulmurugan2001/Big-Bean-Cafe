# Big Bean Café - Development Setup

## 🚀 Development Workflow

### Quick Start

Open **two separate terminals** and run:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

---

## 📋 Development URLs

- **Backend API**: `http://localhost:5000`
- **Frontend**: `http://localhost:3000` (or port shown in terminal)
- **Admin Panel**: `http://localhost:3000/admin/login`
- **Public Website**: `http://localhost:3000`

> **Note**: If port 3000 is occupied, Next.js will automatically use 3001, 3002, etc. Always use the exact URL shown in the terminal.

---

## 🔧 Project Scripts

### Frontend (Next.js)
```bash
cd frontend

# Development with Fast Refresh
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

### Backend (Express + Nodemon)
```bash
cd backend

# Development with auto-restart
npm run dev

# Production server
npm run start

# Run tests
npm run test
```

---

## ⚡ Auto-Reload Behavior

### Frontend - Fast Refresh ✅
**NO RESTART NEEDED for these files:**
- `page.tsx` files
- `layout.tsx` files  
- React components
- CSS/Tailwind styles
- Admin dashboard design changes
- Component logic updates

**RESTART REQUIRED only for:**
- `.env.local` changes
- `next.config.js` changes
- `tailwind.config.js` changes
- `postcss.config.js` changes
- `package.json` changes
- Installing new npm packages

### Backend - Nodemon ✅
**AUTO-RESTARTS for ALL backend files when using `npm run dev`:**
- `src/server.js`
- All route files
- Middleware files
- Database connection files
- Any file in the backend directory

---

## 🛠️ When to Restart

### Frontend Restart Commands
```bash
# Stop current dev server (Ctrl+C)
# Then restart:
cd frontend
npm run dev
```

### Backend Restart Commands
```bash
# Nodemon auto-restarts, but if needed:
# Stop current dev server (Ctrl+C)
# Then restart:
cd backend
npm run dev
```

### Force Clean Restart (Windows)
```bash
# Kill all Node processes
taskkill /F /IM node.exe

# Then restart both servers:
cd backend && npm run dev
cd frontend && npm run dev
```

---

## 📁 Project Structure

```
Big-Bean-cafe/
├── backend/
│   ├── src/
│   │   ├── server.js          # Main server file
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Express middleware
│   │   └── config/           # Database config
│   └── package.json          # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── app/              # Next.js app router
│   │   ├── components/       # React components
│   │   └── public/           # Static assets
│   └── package.json          # Frontend dependencies
└── README.md                 # This file
```

---

## 🎯 Development Features

### Frontend (Next.js 14)
- ⚡ Fast Refresh - Instant updates for component changes
- 🎨 Tailwind CSS - Utility-first styling
- 📱 Responsive Design - Mobile-first approach
- 🔐 Admin Panel - Complete admin dashboard
- 🖼️ Image Optimization - Next.js Image component

### Backend (Express.js)
- 🔄 Nodemon - Auto-restart on file changes
- 🗄️ MySQL Database - Persistent data storage
- 🛡️ Security - Helmet, CORS, Rate limiting
- 📁 File Uploads - Multer for image handling
- 🔑 JWT Authentication - Secure admin access

---

## 🐛 Common Issues & Solutions

### Port Already in Use
```bash
# Error: Port 3000 is already in use
# Solution: Use the port shown in terminal (usually 3001, 3002, etc.)
# Or kill the process:
taskkill /F /IM node.exe
```

### Frontend Not Updating
```bash
# If Fast Refresh isn't working:
1. Check for syntax errors in your code
2. Restart the dev server:
   cd frontend
   npm run dev
```

### Backend Not Auto-Restarting
```bash
# If nodemon isn't detecting changes:
1. Restart the dev server:
   cd backend
   npm run dev
2. Check file permissions
```

### Database Connection Issues
```bash
# Check backend/.env file for correct database credentials
# Ensure MySQL server is running
```

---

## 📝 Development Best Practices

1. **Always run both servers** during development
2. **Use the exact port shown** in terminal (not always 3000)
3. **Save files frequently** - changes auto-reload
4. **Check terminal for errors** if something isn't working
5. **Use browser dev tools** for debugging frontend issues
6. **Check network tab** for API call issues

---

## 🔍 Testing the Setup

1. **Start both servers** using the commands above
2. **Open frontend URL** in browser
3. **Navigate to admin panel**: `/admin/login`
4. **Make a change** to any component - should auto-refresh
5. **Change a backend file** - should auto-restart server

### Expected Results:
- ✅ Backend running on port 5000
- ✅ Frontend running with Fast Refresh
- ✅ Backend auto-restarts when files change
- ✅ Frontend updates instantly for component changes
- ✅ Admin panel accessible and functional

---

## 📞 Support

If you encounter issues:
1. Check terminal error messages
2. Ensure both servers are running
3. Verify file changes are saved
4. Restart both servers if needed

Happy Coding! ☕🚀
