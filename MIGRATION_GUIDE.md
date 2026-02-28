# Migration Guide: SQLite → PostgreSQL

## Overview
This guide walks you through migrating your university social network from SQLite to PostgreSQL, the recommended database for production environments.

## Prerequisites
- PostgreSQL installed locally or a cloud PostgreSQL service (Neon, Supabase, Railway, etc.)
- Access to your current SQLite database (`dev.db`)

## Step 1: Set Up PostgreSQL Database

### Option A: Local PostgreSQL
```bash
# Create a new database
createdb university_network
```

### Option B: Cloud PostgreSQL (Recommended for Vercel)
- **Neon**: https://neon.tech - Free tier available
- **Supabase**: https://supabase.com - PostgreSQL with built-in auth
- **Railway**: https://railway.app - Easy deployment

After creating your cloud database, get the connection string and add it to `.env.local`:

```
DATABASE_URL="postgresql://user:password@host:port/database_name"
```

## Step 2: Update Environment Variables

```bash
cp .env.example .env.local
```

Update `.env.local` with your PostgreSQL connection string:
```
DATABASE_URL="postgresql://username:password@localhost:5432/university_network"
```

## Step 3: Run Prisma Migration

```bash
# Install dependencies
npm install

# Create the PostgreSQL schema from Prisma schema
npx prisma migrate dev --name init

# This will:
# - Create all tables with proper indexes
# - Set up relationships and constraints
# - Generate Prisma client
```

## Step 4: Migrate Data (Optional)

If you have existing SQLite data and want to preserve it:

```bash
# Generate a migration script to extract SQLite data
# Then use this script to import into PostgreSQL
```

### Manual Migration Steps:

1. **Export SQLite data** (as JSON or SQL)
   ```bash
   npm run export:sqlite
   ```

2. **Transform data** (if schema changed)
   - Users: All fields compatible
   - Posts, Comments, Likes: Compatible
   - New fields (role, isActive, coverUrl): Use defaults

3. **Import to PostgreSQL**
   ```bash
   npm run import:postgres
   ```

## Step 5: Verify Migration

```bash
# Check Prisma connection
npx prisma db execute --stdin < check.sql

# Run seed script (optional)
npx prisma db seed
```

## Step 6: Update Git Credentials (If Using GitHub)

```bash
# In your GitHub Actions or Vercel environment variables:
DATABASE_URL="postgresql://..." # Add to Vercel project
```

## Important Notes

### Schema Changes
The new Prisma schema includes improvements:
- ✅ `coverUrl` field for user profile covers
- ✅ `role` field for admin/student distinction
- ✅ `isActive` field for account status
- ✅ `Notification` model for notifications system
- ✅ Proper indexes on frequently queried fields
- ✅ `onDelete: Cascade` for data integrity

### Rollback (If Needed)
```bash
# Keep your SQLite database as backup
git checkout HEAD -- prisma/schema.prisma
# Restore SQLite connection in .env
DATABASE_URL="file:./dev.db"
```

## Troubleshooting

### Connection Error
```
Error: P1000 Can't reach database server at <host>:<port>
```
- Check your DATABASE_URL is correct
- Verify database is running
- Check firewall/network settings

### Migration Failed
```bash
# Reset and try again (⚠️ destroys current PostgreSQL schema)
npx prisma migrate reset

# Or view specific error
npx prisma migrate status
```

### Data Loss
Your original SQLite database is unchanged. To restore:
```bash
DATABASE_URL="file:./dev.db"
```

## Next Steps

After migration:
1. ✅ Update API routes to use new schema features
2. ✅ Build UI for notifications
3. ✅ Add admin dashboard for role management
4. ✅ Deploy to Vercel with PostgreSQL

## Support

For detailed Prisma migration docs: https://www.prisma.io/docs/orm/prisma-migrate/getting-started
