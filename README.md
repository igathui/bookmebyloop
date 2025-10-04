# BookMeByLoop Customer Portal

This is the customer portal for BookMeByLoop, a business management and booking platform built with [Next.js](https://nextjs.org). Customer can login and/or sign in to an account select businesses, and book an appointment .

## Features

- Account registration and login
- Secure authentication
- Add appointments with service-based businesses
- Dashboard for appointment
- Built with Prisma ORM and PostgreSQL

## Getting Started

First, run the development server:

```bash
pnpm dev
```

> [! IMPORTANT]
> NB: Node.js v19 or high is required! We recommend using the Node.js LTS version for the best developer experience

## Database Setup

This project uses [Prisma](https://www.prisma.io/) and PostgreSQL.  
To apply schema changes and set up your database, run:

```bash
pnpm exec prisma migrate dev
```

## Project Structure

- `src/app/(protected)/signup` – Customer registration page
- `src/app/(protected)/login` – Customer login page
- `src/app/businesses` – Browse and select businesses
- `src/app/appointments` – Manage and view appointments
- `src/app/api/auth/signup` – Registration API
- `src/app/api/auth/login` – Login API
- `prisma/schema.prisma` – Database schema

## Reflections

The scope of this application was too ambitious for the allotted time during the Hackathon. As a result, this repository represents a working concept and prototype rather than a fully polished product. Key features and improvements remain as future work.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NeonDB Documentation](https://neon.tech/docs/introduction)

## Deployment

You can deploy this app on [Vercel](https://vercel.com/) or any platform supporting Next.js and PostgreSQL.

---
