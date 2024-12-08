# SurgeLink

SurgeLink is a social networking platform built with Next.js and Supabase. It allows users to connect, share moments, and discover exciting content.

## Features

- User authentication and authorization
- Profile management
- Post creation and interaction
- Responsive design

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.io/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Jest](https://jestjs.io/) for testing

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v6 or later)
- Supabase account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/supunsathsara/SurgeLink.git
   cd SurgeLink
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root of your project and add the following variables:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   RESEND_API=your-resend-api-key
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-turnstile-site-key
   TURNSTILE_SECRET=your-turnstile-secret-key
   ```

4. Start the development server:

   ```bash
   pnpm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Running Tests

To run the tests, use the following command:

```bash
pnpm test
```

### Docker Setup

To run the application using Docker, follow these steps:

1. Build and run the containers:

   ```bash
   docker-compose up --build
   ```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Deployment

This project is set up to be deployed on Vercel. Follow the Vercel documentation to deploy your Next.js application.

### CI/CD Pipeline

A GitHub Actions workflow is set up to build the application, run tests, and apply Supabase migrations. To manually trigger the workflow, go to the "Actions" tab in your GitHub repository and select the "CI" workflow.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

### Acknowledgements

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Jest](https://jestjs.io/)