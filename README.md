# Shower Flour Learning Platform

A full-stack web application for managing baking courses, enrollments, and user authentication. Built with Next.js, Prisma, and MongoDB.

## Features

- **Course Management:** View and manage baking courses.
- **User Authentication:** Secure login and registration using Auth.js.
- **Admin Dashboard:** Manage enrollments, batches, and course content.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Next.js Server Actions, API Routes
- **Database:** MongoDB with Prisma ORM
- **Authentication:** Auth.js (NextAuth.v5)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- MongoDB account and database URI

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hamsath-sim/shower-flour.git
   cd shower-flour
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL="your_mongodb_connection_string"
   AUTH_SECRET="your_auth_secret"
   ```

4. **Initialize Prisma:**
   ```bash
   npx prisma generate
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The project is configured for easy deployment on platforms like Vercel or Render.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.
