# Quick Setup Guide

## Prerequisites
- MySQL Server running
- Node.js 18+ installed

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create environment file**
   Create `.env.local` in the root directory:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=school_management
   DB_PORT=3306
   ```

3. **Initialize database**
   ```bash
   npm run init-db
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Setup
The `npm run init-db` command will:
- Create the `school_management` database
- Create the `schools` table with proper schema
- Insert sample data (optional)

## Troubleshooting
- **Database connection error**: Check MySQL server is running and credentials are correct
- **Port already in use**: Change the port in `.env.local` or stop other services using port 3000
- **Image upload issues**: Ensure the `public/schoolImages` directory has write permissions

## Features to Test
1. **Add School Page** (`/addSchool`): Test form validation and image upload
2. **Show Schools Page** (`/showSchools`): Test search, filter, and responsive design
3. **Navigation**: Test responsive navigation between pages

## Deployment
- **Vercel**: Connect GitHub repo and set environment variables
- **Netlify**: Connect GitHub repo and set environment variables
- **Other**: Any platform supporting Next.js
