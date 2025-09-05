# Free Hosting Guide for School Management App

This guide will help you deploy your school management application for free using the best available services.

## 🚀 Quick Start (Recommended: Vercel + PlanetScale)

### Step 1: Set up Free Database (PlanetScale)

1. **Create PlanetScale Account**
   - Go to [planetscale.com](https://planetscale.com)
   - Sign up with GitHub (recommended)
   - Create a new database called `school_management`

2. **Get Database Credentials**
   - In your PlanetScale dashboard, go to your database
   - Click "Connect" → "Connect with" → "Node.js"
   - Copy the connection string (it looks like this):
   ```
   mysql://username:password@aws.connect.psdb.cloud/database_name?sslaccept=strict
   ```

3. **Extract Connection Details**
   From the connection string, extract:
   - `DB_HOST`: `aws.connect.psdb.cloud`
   - `DB_USER`: `username`
   - `DB_PASSWORD`: `password`
   - `DB_NAME`: `database_name`
   - `DB_PORT`: `3306`

### Step 2: Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Add environment variables:
     - `DB_HOST`: `aws.connect.psdb.cloud`
     - `DB_USER`: `your_username`
     - `DB_PASSWORD`: `your_password`
     - `DB_NAME`: `your_database_name`
     - `DB_PORT`: `3306`
   - Click "Deploy"

3. **Initialize Database**
   - After deployment, visit: `https://your-app.vercel.app/api/init-db`
   - This will create the required tables

## 🎯 Alternative Options

### Option 2: Railway (Full-Stack)

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy Database**
   - Create new project
   - Add MySQL database
   - Copy connection details

3. **Deploy Application**
   - Add new service → "Deploy from GitHub repo"
   - Select your repository
   - Add environment variables
   - Deploy

### Option 3: Netlify + PlanetScale

1. **Set up Database** (same as Step 1 above)

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Connect GitHub repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Add environment variables
   - Deploy

## 🔧 Environment Variables

Create these environment variables in your hosting platform:

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_HOST` | Database host | `aws.connect.psdb.cloud` |
| `DB_USER` | Database username | `your_username` |
| `DB_PASSWORD` | Database password | `your_password` |
| `DB_NAME` | Database name | `school_management` |
| `DB_PORT` | Database port | `3306` |

## 📁 File Upload Considerations

**Important**: Free hosting platforms have limitations on file uploads:

1. **Vercel**: File uploads are temporary (lost on serverless functions)
2. **Netlify**: Similar limitations
3. **Railway**: Better for persistent storage

### Solutions for File Uploads:

1. **Use Cloud Storage** (Recommended)
   - Upload images to Cloudinary, AWS S3, or similar
   - Store only the URL in database

2. **Use Railway** for persistent file storage

3. **Use Vercel Blob** (paid service)

## 🚨 Important Notes

1. **Database Initialization**: Always run the init script after deployment
2. **File Storage**: Consider using cloud storage for production
3. **Environment Variables**: Never commit `.env` files to Git
4. **SSL**: All recommended services provide free SSL certificates

## 🔍 Troubleshooting

### Common Issues:

1. **Database Connection Failed**
   - Check environment variables
   - Ensure database is accessible from hosting platform
   - Verify SSL settings for PlanetScale

2. **Build Failures**
   - Check Node.js version compatibility
   - Ensure all dependencies are in `package.json`

3. **File Upload Issues**
   - Consider migrating to cloud storage
   - Check file size limits

## 📊 Free Tier Limits

| Service | Database | Storage | Bandwidth |
|---------|----------|---------|-----------|
| PlanetScale | 1 database, 1GB | - | 1 billion reads/month |
| Vercel | - | 100GB | 100GB |
| Railway | 1 database, 1GB | 1GB | 100GB |
| Netlify | - | 100GB | 100GB |

## 🎉 Success!

Once deployed, your school management app will be available at:
- Vercel: `https://your-app-name.vercel.app`
- Railway: `https://your-app-name.railway.app`
- Netlify: `https://your-app-name.netlify.app`

Remember to initialize your database by visiting the `/api/init-db` endpoint after deployment!
