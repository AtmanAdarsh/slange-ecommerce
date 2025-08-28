# SLANGE E-commerce Platform - Quick Start Guide

## 🚀 Get Up and Running in 5 Minutes

This guide will help you set up the SLANGE e-commerce platform locally for development.

## 📋 Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Docker & Docker Compose** - [Download here](https://www.docker.com/)
- **Git** - [Download here](https://git-scm.com/)

## ⚡ Quick Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/slange-ecommerce.git
cd slange-ecommerce
```

### 2. Start with Docker (Recommended)

```bash
# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

**That's it!** Your platform will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database Admin**: http://localhost:8080

### 3. Alternative: Manual Setup

If you prefer to run services manually:

```bash
# Install dependencies
npm run setup

# Start frontend
npm run dev:frontend

# Start backend (in another terminal)
npm run dev:backend
```

## 🗄️ Database Setup

### MongoDB
- **Port**: 27017
- **Database**: slange
- **Username**: admin
- **Password**: admin123

### PostgreSQL
- **Port**: 5432
- **Database**: slange
- **Username**: slange
- **Password**: slange123

### Redis
- **Port**: 6379
- **No authentication required for local development**

## 🔧 Environment Configuration

Create `.env` file in the root directory:

```env
# Application
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# Database
MONGODB_URI=mongodb://admin:admin123@localhost:27017/slange
POSTGRES_URI=postgresql://slange:slange123@localhost:5432/slange
REDIS_URI=redis://localhost:6379

# Payment (Optional for development)
RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret
STRIPE_SECRET_KEY=your-stripe-secret
```

## 🧪 Testing the Setup

### 1. Frontend Health Check

Visit http://localhost:3000 - you should see the SLANGE landing page with 3D hero section.

### 2. Backend Health Check

```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2025-01-XX...",
  "uptime": 123.45,
  "environment": "development"
}
```

### 3. Database Connection Test

```bash
# MongoDB
docker-compose exec mongodb mongosh --username admin --password admin123

# PostgreSQL
docker-compose exec postgres psql -U slange -d slange

# Redis
docker-compose exec redis redis-cli ping
```

## 📱 Available Features

### Frontend
- ✅ 3D Hero Section with Three.js
- ✅ Responsive Design with Tailwind CSS
- ✅ Product Catalog with Filters
- ✅ Shopping Cart
- ✅ User Authentication
- ✅ PWA Support
- ✅ Instagram Feed Integration

### Backend
- ✅ RESTful API with Express.js
- ✅ JWT Authentication
- ✅ User Management
- ✅ Product Management
- ✅ Order Processing
- ✅ Payment Integration
- ✅ File Upload with AWS S3
- ✅ Email Notifications

## 🛠️ Development Workflow

### 1. Code Structure

```
slange-ecommerce/
├── frontend/                 # Next.js React application
│   ├── app/                 # App router pages
│   ├── components/          # Reusable components
│   ├── public/              # Static assets
│   └── styles/              # Tailwind CSS
├── backend/                  # Node.js Express server
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── models/          # Database models
│   │   ├── middleware/      # Custom middleware
│   │   └── config/          # Configuration files
│   └── tests/               # Test files
└── docs/                     # Documentation
```

### 2. Available Scripts

```bash
# Development
npm run dev              # Start both frontend and backend
npm run dev:frontend     # Start only frontend
npm run dev:backend      # Start only backend

# Building
npm run build            # Build both applications
npm run build:frontend   # Build frontend
npm run build:backend    # Build backend

# Testing
npm run test             # Run all tests
npm run test:frontend    # Test frontend
npm run test:backend     # Test backend

# Linting
npm run lint             # Lint all code
npm run lint:frontend    # Lint frontend
npm run lint:backend     # Lint backend
```

### 3. Hot Reload

Both frontend and backend support hot reloading:
- **Frontend**: Changes automatically refresh the browser
- **Backend**: Server restarts on file changes

## 🔍 Troubleshooting

### Common Issues

#### 1. Port Already in Use

```bash
# Check what's using the port
lsof -i :3000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

#### 2. Docker Issues

```bash
# Reset Docker containers
docker-compose down -v
docker-compose up -d --build

# Check Docker logs
docker-compose logs [service-name]
```

#### 3. Database Connection Issues

```bash
# Check if databases are running
docker-compose ps

# Restart database services
docker-compose restart mongodb postgres redis
```

#### 4. Node Modules Issues

```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json
rm -rf backend/node_modules backend/package-lock.json
npm run setup
```

### Debug Mode

Enable debug logging:

```bash
# Frontend
DEBUG=* npm run dev:frontend

# Backend
DEBUG=* npm run dev:backend
```

## 📚 Next Steps

### 1. Explore the Codebase

- **Frontend**: Check out the 3D components in `frontend/components/Hero3D.tsx`
- **Backend**: Review the API routes in `backend/src/routes/`
- **Database**: Examine the models in `backend/src/models/`

### 2. Customize the Platform

- **Branding**: Update colors in `frontend/tailwind.config.js`
- **Products**: Add sample products to the database
- **Features**: Implement additional e-commerce features

### 3. Deploy to Production

- **Frontend**: Deploy to Vercel or Netlify
- **Backend**: Deploy to AWS, GCP, or Azure
- **Database**: Use managed database services

## 🆘 Need Help?

### Documentation
- **System Design**: [SYSTEM_DESIGN.md](./SYSTEM_DESIGN.md)
- **Deployment**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **API Reference**: Check the backend routes

### Support
- **Issues**: Create a GitHub issue
- **Discussions**: Use GitHub Discussions
- **Email**: support@slange.com

## 🎯 Quick Demo

Want to see the platform in action? After starting the services:

1. **Visit**: http://localhost:3000
2. **Explore**: Navigate through the different sections
3. **Test**: Try the 3D hero section and product catalog
4. **API**: Test the backend at http://localhost:5000/health

---

**Happy Coding! 🚀**

The SLANGE platform is now ready for development and customization. 