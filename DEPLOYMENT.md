# SLANGE E-commerce Platform - Deployment Guide

## 🚀 Production Deployment

This guide covers deploying the SLANGE e-commerce platform to production environments.

## 📋 Prerequisites

- **Node.js 18+** installed on your system
- **Docker & Docker Compose** for containerized deployment
- **Git** for version control
- **Domain name** configured with DNS
- **SSL certificate** (Let's Encrypt recommended)
- **Cloud provider account** (AWS, GCP, or Azure)

## 🏗️ Architecture Overview

```
Internet → Load Balancer → Frontend (Vercel/Netlify) + Backend (AWS/GCP)
                              ↓
                    Database Layer (MongoDB + PostgreSQL + Redis)
```

## 🐳 Docker Deployment (Recommended)

### 1. Build and Run with Docker Compose

```bash
# Clone the repository
git clone https://github.com/your-org/slange-ecommerce.git
cd slange-ecommerce

# Copy environment file
cp .env.example .env

# Edit environment variables
nano .env

# Build and start services
docker-compose up -d --build

# Check service status
docker-compose ps

# View logs
docker-compose logs -f
```

### 2. Production Docker Compose

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "80:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    networks:
      - slange-network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    depends_on:
      - mongodb
      - postgres
      - redis
    networks:
      - slange-network

  mongodb:
    image: mongo:7.0
    volumes:
      - mongodb_data:/data/db
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=secure_password
    restart: unless-stopped
    networks:
      - slange-network

  postgres:
    image: postgres:15-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=slange
      - POSTGRES_USER=slange
      - POSTGRES_PASSWORD=secure_password
    restart: unless-stopped
    networks:
      - slange-network

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    restart: unless-stopped
    networks:
      - slange-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend
    restart: unless-stopped
    networks:
      - slange-network

volumes:
  mongodb_data:
  postgres_data:
  redis_data:

networks:
  slange-network:
    driver: bridge
```

## ☁️ Cloud Deployment

### AWS Deployment

#### 1. Frontend (Vercel/Netlify)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
cd frontend
vercel --prod

# Or deploy to Netlify
npm run build
# Upload dist folder to Netlify
```

#### 2. Backend (AWS EC2)

```bash
# Launch EC2 instance (t3.medium recommended)
# Connect via SSH
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install dependencies
sudo apt update
sudo apt install -y nodejs npm docker.io docker-compose

# Clone repository
git clone https://github.com/your-org/slange-ecommerce.git
cd slange-ecommerce

# Start services
docker-compose -f docker-compose.prod.yml up -d
```

#### 3. Database (AWS RDS + ElastiCache)

- **PostgreSQL**: Use AWS RDS for managed PostgreSQL
- **MongoDB**: Use MongoDB Atlas or AWS DocumentDB
- **Redis**: Use AWS ElastiCache for Redis

#### 4. Load Balancer (AWS ALB)

```bash
# Create Application Load Balancer
# Configure target groups for frontend and backend
# Set up SSL certificate in ACM
```

### GCP Deployment

#### 1. Frontend (Firebase Hosting)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase project
firebase init hosting

# Build and deploy
npm run build
firebase deploy
```

#### 2. Backend (Cloud Run)

```bash
# Build and push Docker image
gcloud builds submit --tag gcr.io/PROJECT_ID/slange-backend

# Deploy to Cloud Run
gcloud run deploy slange-backend \
  --image gcr.io/PROJECT_ID/slange-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

#### 3. Database (Cloud SQL + Memorystore)

- **PostgreSQL**: Use Cloud SQL for PostgreSQL
- **MongoDB**: Use MongoDB Atlas
- **Redis**: Use Cloud Memorystore for Redis

## 🔒 SSL Configuration

### Let's Encrypt with Certbot

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Frontend
    location / {
        proxy_pass http://frontend:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Backend API
    location /api {
        proxy_pass http://backend:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 📊 Monitoring & Logging

### 1. Application Monitoring

```bash
# Install PM2 for process management
npm install -g pm2

# Start application with PM2
pm2 start ecosystem.config.js

# Monitor processes
pm2 monit
pm2 logs
```

### 2. Log Management

```bash
# View application logs
docker-compose logs -f backend

# View database logs
docker-compose logs -f mongodb postgres redis
```

### 3. Health Checks

```bash
# Backend health check
curl https://yourdomain.com/health

# Frontend health check
curl https://yourdomain.com/api/health
```

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build application
      run: npm run build
      
    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.KEY }}
        script: |
          cd /path/to/slange-ecommerce
          git pull origin main
          docker-compose -f docker-compose.prod.yml up -d --build
```

## 🚨 Security Checklist

- [ ] Change default passwords
- [ ] Enable firewall (UFW)
- [ ] Configure SSL/TLS
- [ ] Set up rate limiting
- [ ] Enable CORS properly
- [ ] Use environment variables
- [ ] Regular security updates
- [ ] Database backup strategy
- [ ] Monitor access logs
- [ ] Enable 2FA for admin

## 📈 Performance Optimization

### 1. Frontend

```bash
# Enable compression
# Use CDN for static assets
# Implement lazy loading
# Optimize images
# Enable PWA features
```

### 2. Backend

```bash
# Enable Redis caching
# Database query optimization
# Use connection pooling
# Implement rate limiting
# Enable compression
```

### 3. Database

```bash
# Create proper indexes
# Optimize queries
# Use read replicas
# Regular maintenance
# Monitor performance
```

## 🔧 Troubleshooting

### Common Issues

1. **Port conflicts**: Check if ports 80, 443, 3000, 5000 are free
2. **Database connection**: Verify connection strings and credentials
3. **SSL issues**: Check certificate validity and Nginx configuration
4. **Memory issues**: Monitor container resource usage
5. **Network issues**: Verify firewall and security group settings

### Debug Commands

```bash
# Check service status
docker-compose ps

# View logs
docker-compose logs -f [service-name]

# Access container shell
docker-compose exec [service-name] sh

# Check network connectivity
docker-compose exec backend ping mongodb

# Monitor resources
docker stats
```

## 📞 Support

For deployment issues:

1. Check the logs: `docker-compose logs -f`
2. Verify environment variables
3. Check network connectivity
4. Review security group settings
5. Contact the development team

---

**Remember**: Always test deployments in a staging environment first! 