# UniNetwork - University Social Network

A modern, secure, and scalable social networking platform designed specifically for university students to connect, collaborate, and share their academic experiences.

## Overview

UniNetwork is a full-stack web application built with cutting-edge technologies, designed to transform how university students interact and build community. It features a clean, modern interface combined with robust backend security and scalability.

## Key Features

### Core Functionality
- **User Authentication**: Secure registration and login with bcrypt password hashing
- **Social Feed**: Real-time posts with likes, comments, and engagement tracking
- **User Profiles**: Customizable profiles with bio, major, and academic information
- **Follow System**: Connect with classmates and build your academic network
- **Search & Discovery**: Find classmates by name, major, or student ID
- **Notifications**: Real-time notifications for likes, comments, and follows

### Advanced Features
- **File Uploads**: Share photos and documents with built-in validation
- **Admin Dashboard**: Moderation tools for platform management
- **Dark Mode**: Automatic theme switching based on system preference
- **Mobile Responsive**: Fully optimized for all device sizes
- **Security**: CSRF protection, input validation, secure session management

## Tech Stack

### Frontend
- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS + Shadcn UI components
- **Animations**: Framer Motion for smooth interactions
- **HTTP Client**: SWR for data fetching and caching
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js with Next.js API Routes
- **Database**: PostgreSQL (production) / SQLite (development)
- **ORM**: Prisma for type-safe database operations
- **Authentication**: Custom JWT/session-based auth with bcrypt
- **Validation**: Zod for runtime type validation
- **File Storage**: UploadThing integration

### DevOps & Infrastructure
- **Hosting**: Vercel (recommended)
- **Database**: Neon PostgreSQL (recommended for Vercel)
- **Environment**: Node.js 18+
- **Package Manager**: npm/pnpm/yarn/bun

## Project Structure

```
src/
├── app/                      # Next.js app directory
│   ├── (auth)/              # Authentication pages
│   │   ├── login/           # Login page
│   │   ├── register/        # Registration page
│   │   └── layout.tsx       # Auth layout wrapper
│   ├── api/                 # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── posts/           # Post management
│   │   ├── users/           # User management
│   │   └── upload/          # File upload handler
│   ├── profile/             # User profile pages
│   ├── admin/               # Admin dashboard
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home feed page
├── components/              # Reusable React components
├── lib/                     # Utility functions & helpers
│   ├── auth.ts              # Authentication utilities
│   ├── validations.ts       # Zod schemas
│   ├── api-helpers.ts       # API route helpers
│   ├── errors.ts            # Error handling
│   └── upload.ts            # File upload utilities
├── styles/                  # Global styles
└── middleware.ts            # Next.js middleware for auth

prisma/
├── schema.prisma            # Database schema
└── migrations/              # Database migrations

public/                       # Static assets
scripts/                      # Database & utility scripts
```

## Getting Started

### Prerequisites
- Node.js 18 or higher
- PostgreSQL database (or SQLite for development)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd university-social-network
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```
   DATABASE_URL="file:./dev.db"
   NEXT_PUBLIC_UPLOADTHING_APP_ID="your_app_id"
   UPLOADTHING_SECRET="your_secret"
   NODE_ENV="development"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## API Documentation

### Authentication

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@university.edu",
  "password": "securepassword"
}
```

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@university.edu",
  "password": "securepassword",
  "studentId": "STU123456",
  "major": "Computer Science"
}
```

## Database Schema

### Models

**User**
- Stores user account information and profile data
- Fields: id, name, email, password (hashed), studentId, major, bio, avatarUrl, coverUrl, role, isActive
- Relationships: posts, likes, comments, followers, following, notifications

**Post**
- User-generated content with optional file attachments
- Fields: id, content, fileUrl, fileType, authorId, createdAt, updatedAt
- Relationships: author (User), likes, comments

**Like**
- Tracks posts that users have liked
- Unique constraint: (userId, postId)

**Comment**
- User comments on posts
- Fields: id, content, userId, postId, createdAt, updatedAt

**Follow**
- User following relationships
- Unique constraint: (followerId, followingId)

**Notification**
- System notifications for user activity
- Types: like, comment, follow

## Security Features

### Authentication & Authorization
- Passwords hashed with bcrypt (10 rounds)
- Session-based authentication with HTTP-only cookies
- Protected API routes with authentication checks
- Role-based access control (STUDENT/ADMIN)

### Input Validation & Sanitization
- Zod schemas for all API inputs
- Type-safe database operations with Prisma
- SQL injection prevention via parameterized queries
- XSS prevention through React's built-in escaping

### Additional Security
- CSRF protection headers in middleware
- Secure cookie flags (httpOnly, sameSite, secure)
- Content Security Policy headers
- CORS configuration for API endpoints

## Deployment to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository

3. **Configure Environment Variables**
   - `DATABASE_URL`: PostgreSQL connection string (use Neon)
   - `UPLOADTHING_SECRET`: Your UploadThing secret
   - `NEXT_PUBLIC_UPLOADTHING_APP_ID`: Your UploadThing app ID

4. **Deploy**
   - Vercel automatically builds and deploys on push to main

## Database Setup for Production

### Using Neon PostgreSQL (Recommended)

1. Create account at https://neon.tech
2. Create a PostgreSQL project
3. Copy connection string to `DATABASE_URL`
4. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

## Development Workflow

### Database Migrations
```bash
npx prisma migrate dev --name migration_name
```

### Code Quality
```bash
npm run lint
npx tsc --noEmit
```

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Database connection string | Yes |
| `NODE_ENV` | Environment mode | No |
| `NEXT_PUBLIC_APP_URL` | Application URL | No |
| `NEXT_PUBLIC_UPLOADTHING_APP_ID` | UploadThing app ID | Optional |
| `UPLOADTHING_SECRET` | UploadThing secret | Optional |

## Support & Documentation

- See `MIGRATION_GUIDE.md` for SQLite → PostgreSQL migration
- See `IMPLEMENTATION_PLAN.md` for detailed implementation details
- Check GitHub Issues for bug reports and feature requests

## License

MIT License

---

**Version**: 1.0.0
**Last Updated**: February 2026
