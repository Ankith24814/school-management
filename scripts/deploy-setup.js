#!/usr/bin/env node

/**
 * Deployment Setup Script
 * This script helps prepare your application for free hosting deployment
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

console.log('🚀 School Management App - Deployment Setup\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('⚠️  No .env.local file found. Creating template...');
  
  const envTemplate = `# Database Configuration for Free Hosting
# Replace these values with your actual database credentials

# For PlanetScale (Recommended)
DB_HOST=aws.connect.psdb.cloud
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
DB_PORT=3306

# For Railway MySQL
# DB_HOST=containers-us-west-xxx.railway.app
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=railway
# DB_PORT=3306

# For local development
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=school_management
# DB_PORT=3306
`;

  fs.writeFileSync(envPath, envTemplate);
  console.log('✅ Created .env.local template');
  console.log('📝 Please update .env.local with your actual database credentials\n');
} else {
  console.log('✅ .env.local file found\n');
}

// Check package.json scripts
const packagePath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

console.log('📦 Checking package.json scripts...');
if (!packageJson.scripts['init-db']) {
  console.log('⚠️  init-db script not found in package.json');
} else {
  console.log('✅ init-db script found');
}

console.log('\n🎯 Next Steps:');
console.log('1. Set up a free database:');
console.log('   - PlanetScale: https://planetscale.com (Recommended)');
console.log('   - Railway: https://railway.app');
console.log('2. Update .env.local with your database credentials');
console.log('3. Deploy to a free hosting platform:');
console.log('   - Vercel: https://vercel.com (Recommended)');
console.log('   - Netlify: https://netlify.com');
console.log('   - Railway: https://railway.app');
console.log('4. After deployment, initialize your database by visiting:');
console.log('   https://your-app-url.vercel.app/api/init-db');
console.log('\n📖 For detailed instructions, see DEPLOYMENT_GUIDE.md');

console.log('\n✨ Your app is ready for free hosting!');
