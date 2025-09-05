# School Management Platform

A comprehensive web application for managing school information built with Next.js, TypeScript, Tailwind CSS, and MySQL.

## Features

- **Add Schools**: Comprehensive form with validation for adding new schools
- **View Schools**: E-commerce style display of all schools with search and filter capabilities
- **Image Upload**: Store school images in the `schoolImages` folder
- **Responsive Design**: Works seamlessly on both desktop and mobile devices
- **Form Validation**: Built-in validation using react-hook-form and Zod
- **Modern UI/UX**: Beautiful interface with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: react-hook-form with Zod validation
- **Database**: MySQL
- **Image Handling**: File upload with server-side storage

## Prerequisites

- Node.js 18+ 
- MySQL Server
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd school-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=school_management
   DB_PORT=3306
   ```

4. **Set up MySQL Database**
   - Start your MySQL server
   - Create a database named `school_management` (or update the DB_NAME in .env.local)
   - The application will automatically create the required table structure

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

The application automatically creates a `schools` table with the following structure:

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact BIGINT NOT NULL,
  image TEXT NOT NULL,
  email_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Project Structure

```
school-management/
├── src/
│   ├── app/
│   │   ├── addSchool/          # Add school form page
│   │   ├── showSchools/        # Display schools page
│   │   ├── api/
│   │   │   └── schools/        # API endpoints
│   │   └── page.tsx            # Home page
│   └── lib/
│       └── db.ts               # Database configuration
├── public/
│   └── schoolImages/           # Uploaded school images
└── package.json
```

## API Endpoints

- `POST /api/schools` - Add a new school
- `GET /api/schools` - Fetch all schools

## Pages

### 1. Add School (`/addSchool`)
- Form with validation for all required fields
- Image upload functionality
- Responsive design for mobile and desktop
- Success/error message handling

### 2. Show Schools (`/showSchools`)
- Grid layout displaying schools in e-commerce style
- Search functionality by school name or city
- Filter by city
- Responsive card design
- Loading and error states

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Netlify
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set environment variables in Netlify dashboard
4. Deploy

### Other Platforms
The application can be deployed to any platform that supports Next.js.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | MySQL host | localhost |
| `DB_USER` | MySQL username | root |
| `DB_PASSWORD` | MySQL password | (empty) |
| `DB_NAME` | Database name | school_management |
| `DB_PORT` | MySQL port | 3306 |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Note**: Make sure to update the database credentials in your `.env.local` file before running the application.
# school-management
