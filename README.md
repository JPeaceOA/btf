# SNITIS Event Registration

A full-stack, Next.js registration portal for the Nigeria Sub-National Investment and Tourism Information Summit (SNITIS). It includes a public registration form, sponsorship information page, admin login, registration management dashboard, and Excel export support.

## Key Features

- Public attendee registration form with validation
- Country/state/city address selection using `country-state-city`
- Backend registration storage via Prisma + PostgreSQL
- Admin login page with cookie-based auth
- Admin dashboard showing registrations in a table
- Excel export of registrations using `exceljs`
- Sponsorship information page for event partners

## Project Structure

- `app/page.tsx` - main public registration page
- `app/sponsorship/page.tsx` - sponsorship details page
- `app/admin/login/page.tsx` - admin sign-in page
- `app/admin/dashboard/page.tsx` - admin dashboard and export UI
- `app/api/registration/route.ts` - create and fetch registrations
- `app/api/admin/login/route.ts` - admin authentication endpoint
- `app/api/admin/logout/route.ts` - admin logout endpoint
- `app/api/admin/export/route.ts` - registration Excel export endpoint
- `prisma/schema.prisma` - Prisma schema for registration data

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Prisma ORM
- PostgreSQL
- ExcelJS
- country-state-city

## Setup

### 1. Install dependencies

```bash
npm install
```

> `postinstall` runs `prisma generate` automatically.

### 2. Configure environment variables

Create a `.env` file at the repository root with:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
ADMIN_USERNAME=
ADMIN_PASSWORD=
NODE_ENV=development
```

Update the values for your database and admin credentials.

### 3. Run database migrations

```bash
npx prisma migrate dev --name init
```

If your database schema already exists, you can also use:

```bash
npx prisma db push
```

### 4. Start the app

```bash
npm run dev
```

Open `http://localhost:3000` to view the registration form.

## Usage

### Public registration

- Visit `/` to fill out the event registration form
- Form data is submitted to `/api/registration`
- Required fields include name, position, organisation, contact, address, and guest count

### Sponsorship page

- Visit `/sponsorship` for event sponsorship details and payment information

### Admin flow

- Visit `/admin/login` to sign in with `ADMIN_USERNAME` and `ADMIN_PASSWORD`
- After login, you will be redirected to `/admin/dashboard`
- The dashboard lists registrations and allows Excel export
- Export requests are handled by `/api/admin/export`

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `ADMIN_USERNAME` - admin login username
- `ADMIN_PASSWORD` - admin login password
- `NODE_ENV` - environment mode (`development` or `production`)

## Scripts

- `npm run dev` - start development server
- `npm run build` - build production app
- `npm run start` - run production server
- `npm run lint` - run ESLint

## Database Schema

The application stores registrations in a single `Registration` model with the following fields:

- `id`
- `firstName`
- `lastName`
- `position`
- `organisation`
- `country`
- `state`
- `city`
- `buildingApart`
- `street`
- `phone`
- `email`
- `numberOfGuests`
- `createdAt`
- `updatedAt`

## Deployment

This app can be deployed on Vercel or any platform that supports Next.js and PostgreSQL.

### Recommended deployment steps

1. Set environment variables in your hosting platform
2. Run Prisma migrations or push schema
3. Build with `npm run build`
4. Start with `npm run start`

## Notes

- The admin section currently uses a simple cookie-based auth token and should be hardened before production use.
- The registration export generates an `.xlsx` file with all stored registration records.

## License

This repository does not include a license file. Add one if you want to open source the project.
