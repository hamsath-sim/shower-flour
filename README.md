# Shower Flour Learning Platform

A full-stack web application for managing baking courses, enrollments, and user authentication. Built with Next.js, Prisma, and Supabase (PostgreSQL).

## Features

- **Course Management:** View and manage baking courses.
- **User Authentication:** Secure login and registration using Auth.js.
- **Admin Dashboard:** Manage enrollments, batches, and course content.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Next.js Server Actions, API Routes
- **Database:** Supabase (PostgreSQL) with Prisma ORM
- **Authentication:** Auth.js (NextAuth.v5)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Supabase account and PostgreSQL database URI

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

## Team Member Quick Start

Welcome to the team! Follow these steps to set up the project on your local machine.

### 1. Clone the repository
```bash
git clone https://github.com/hamsath-sim/shower-flour.git
cd shower-flour
```

### 2. Install Dependencies
Make sure you have [Node.js](https://nodejs.org/) installed, then run:
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory. You can copy the values from the lead developer or use this template:
```env
# Supabase PostgreSQL Connection (Ask lead for dev DB or use your own)
DATABASE_URL="postgresql://postgres:..."

# Auth.js secret (Generate one or ask lead)
AUTH_SECRET="your_secret_here"
```

### 4. Database Initialization
Generate the Prisma client:
```bash
npx prisma generate
```

### 5. Start Developing
Run the development server:
```bash
npm run dev
```
The app will be available at [http://localhost:3000](http://localhost:3000).

## Contribution Workflow

1.  **Pull latest changes:** Always run `git pull origin main` before starting.
2.  **Create a branch:** Work on a branch like `feature/your-task`.
3.  **Commit often:** Use descriptive commit messages.
4.  **Push and PR:** Push your branch and open a Pull Request for review.
