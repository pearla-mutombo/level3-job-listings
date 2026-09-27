# ViaNova — Job Listings with Filtering

**Find the path to what comes next.**

ViaNova is my Level 3 Capstone project, built as a full-stack job listings application using React, Vite, Supabase, React Router, SCSS, Vitest, and React Testing Library.

The purpose of this assignment was to build a job platform where anyone can browse job opportunities and filter them without signing in, while authenticated users can securely create, edit, and delete only the job listings that belong to them.

## About ViaNova

The name **ViaNova** represents the idea behind the application.

- **Via** represents a path or way.
- **Nova** represents something new or a burst of light.

Together, ViaNova represents discovering a new path toward what comes next.

My visual concept combines the feeling of a futuristic digital environment with curiosity, discovery, and unexpected paths. I wanted the application to have some of the technological atmosphere that makes me think of _The Matrix_, combined with the sense of exploration and discovery that I associate with _Alice in Wonderland_, while still keeping ViaNova original and professional.

The design does not use characters or copyrighted imagery from those works and is not affiliated with them. They were creative references for the general ideas of technology, discovery, pathways, and stepping into something new.

The result is a professional job platform with a subtle futuristic identity, including luminous accents, portal-inspired branding, a discovery-themed hero section, and a custom 404 page.

## Features

### Public Job Listings

Visitors can use ViaNova without creating an account or signing in.

The public experience includes:

- Job listings loaded from Supabase
- Company name and job position
- Role and experience level
- Contract type and location
- Languages and tools
- NEW and FEATURED badges
- Company logos when available
- A company-initial placeholder when a logo is unavailable
- Responsive job cards for desktop and narrow/mobile screens
- Loading, error, empty-data, and no-filter-match states
- A clear Sign in option for authenticated features

### Job Filtering

Job listings can be filtered on the client by:

- Role
- Level
- Language
- Tool

Multiple filters work together. A job must match every active filter in order to remain visible.

ViaNova also shows active filter buttons so a user can remove an individual filter or clear all filters at once. When no jobs match the selected filters, the application displays a clear no-results message.

### Authentication

ViaNova uses Supabase email/password authentication.

Users can:

- Sign in
- Sign out
- Keep an authenticated session
- Access protected job-management routes after signing in

Public job browsing does not require authentication.

Registration is intentionally not included because the assignment uses manually created test users.

### Job Management

Authenticated users can:

- Create a job listing
- Edit their own job listings
- Delete their own job listings
- Confirm before deleting a listing

The job form supports:

- Company
- Position
- Role
- Level
- Contract type
- Location
- Languages
- Tools
- Optional logo URL
- NEW status
- FEATURED status

Required fields use validation, and the application provides loading, success, and error feedback where appropriate.

Edit and Delete controls are displayed only when the signed-in user owns the job listing.

## Live Demo

The deployed ViaNova application is available here:

https://vianova-job-listings.netlify.app

## Technologies

- React
- Vite
- JavaScript / JSX
- React Router
- Supabase
- PostgreSQL
- Supabase Authentication
- Row Level Security (RLS)
- SCSS / Sass
- Vitest
- React Testing Library
- Oxlint
- Git and GitHub
- GitHub Actions
- Netlify

## Application Routes

| Route            | Purpose                        | Access        |
| ---------------- | ------------------------------ | ------------- |
| `/`              | Browse and filter job listings | Public        |
| `/login`         | Sign in                        | Public        |
| `/jobs/new`      | Create a job listing           | Authenticated |
| `/jobs/:id/edit` | Edit an owned job listing      | Authenticated |
| `*`              | Custom ViaNova 404 page        | Public        |

Protected routes use React Router together with the authentication state so unauthenticated visitors are redirected to the sign-in page.

## Supabase and Database Security

ViaNova uses a Supabase PostgreSQL database with a `job_listings` table.

The database schema and Row Level Security policies are stored in:

```text
supabase/job-listings.sql
```

### Row Level Security

Row Level Security is enabled on the `job_listings` table.

The policies allow:

- Anyone to read job listings
- Authenticated users to create listings belonging to themselves
- Authenticated users to update only their own listings
- Authenticated users to delete only their own listings

The React interface also hides Edit and Delete controls for jobs that do not belong to the current user. However, hiding buttons in React is not enough for security. The RLS policies enforce ownership at the database level even if someone attempts to send a request directly.

### Two-Account RLS Test

I tested the ownership policy with two authenticated test accounts.

While signed in as **Test User #2**, I sent an authenticated client update request against a job owned by **Test User #1** using the normal Supabase browser client.

The request returned no permitted updated row. Because the application used `.single()`, this surfaced as a `406` response. After refreshing the application, the job remained unchanged.

This confirmed that the owner-only UPDATE RLS policy blocked the cross-account change at the database level, rather than relying only on the React interface.

No passwords or private credentials are included in this repository.

## Job Listing Database Structure

The `job_listings` table includes:

| Field         | Purpose                            |
| ------------- | ---------------------------------- |
| `id`          | Unique job listing ID              |
| `user_id`     | Owner of the listing               |
| `company`     | Company name                       |
| `logo_url`    | Optional company logo              |
| `position`    | Job title                          |
| `role`        | Frontend, Backend, or Fullstack    |
| `level`       | Junior, Midweight, or Senior       |
| `contract`    | Full Time, Part Time, or Contract  |
| `location`    | Job location                       |
| `languages`   | PostgreSQL text array of languages |
| `tools`       | PostgreSQL text array of tools     |
| `is_new`      | NEW status                         |
| `is_featured` | FEATURED status                    |
| `created_at`  | Creation timestamp                 |

## Testing and Code Quality

ViaNova uses **Vitest** and **React Testing Library** to test important user behavior.

The automated tests cover:

- Rendering the job filters
- Changing a filter
- Multiple filters working together
- Job form submission and conversion of languages/tools into arrays
- Required-field form validation
- Protected-route behavior for signed-out users

At the final local quality check, all **6 tests across 4 test files** were passing.

The project also uses Oxlint for linting and Vite for the production build.

GitHub Actions is configured to run:

```text
npm ci
npm run lint
npm test
npm run build
```

on pull requests, helping verify code quality before changes are merged.

## Responsive Design and Accessibility

ViaNova uses SCSS with reusable variables, partials, responsive breakpoints, and BEM-style class names.

The responsive design was manually checked at a narrow/mobile-like browser width. The header, navigation, filters, job cards, tags, Create Job form, form controls, checkboxes, and submit button remained visible without overlapping or extending outside the viewport.

Accessibility considerations include:

- Semantic HTML
- Form labels connected to their controls
- Accessible navigation labeling
- Button elements for actions
- Visible hover and focus states
- Alert and status roles for important feedback
- Descriptive company-logo alternative text
- Decorative branding imagery hidden from assistive technology

## SCSS Organization

Instead of placing all application styles into one large stylesheet, I separated the SCSS by responsibility.

```text
src/styles/
├── _auth.scss
├── _filters.scss
├── _forms.scss
├── _header.scss
├── _hero.scss
├── _jobs.scss
├── _mixins.scss
├── _not-found.scss
├── _reset.scss
├── _variables.scss
└── main.scss
```

The header, hero, filters, job listings, authentication, forms, and 404 page each have their own stylesheet. `main.scss` brings the partials together.

This makes the styles easier to find, understand, and maintain without allowing one stylesheet to become unnecessarily large.

## Project Structure

```text
level3-job-listings/
├── docs/
│   ├── design/
│   │   └── vianova-concept-board.png
│   └── sample-jobs-15.csv
├── public/
│   └── _redirects
├── src/
│   ├── assets/
│   │   └── vianova-logo.png
│   ├── components/
│   │   ├── auth/
│   │   ├── jobs/
│   │   └── layout/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── test/
│   ├── App.jsx
│   └── main.jsx
├── supabase/
│   └── job-listings.sql
├── .env.example
├── package.json
├── vite.config.js
└── vitest.config.js
```

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd level3-job-listings
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a local `.env` file based on `.env.example`:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Add your own Supabase project URL and publishable key.

The real `.env` file should remain private and should not be committed to GitHub.

### 4. Start the development server

```bash
npm run dev
```

### 5. Run the tests

```bash
npm test
```

### 6. Run the linter

```bash
npm run lint
```

### 7. Create a production build

```bash
npm run build
```

### 8. Preview the production build

```bash
npm run preview
```

## Netlify SPA Routing

ViaNova uses React Router for client-side routing.

The project includes:

```text
public/_redirects
```

with a Netlify SPA fallback so direct navigation or refreshing a React route can return the application instead of a Netlify 404 page.

## Git Workflow

The project was developed using feature branches and pull requests.

The capstone workflow is organized around three main feature areas:

1. Public job listings
2. Authentication and job management
3. Filtering, quality, testing, and deployment

This allowed each major stage of the project to be developed and reviewed separately before being merged into the main branch.

## Personal Reflection

### What I Learned

This capstone helped me understand how the different skills I learned throughout Level 3 connect together inside one application.

One of the biggest things I learned was the difference between what the React interface allows a user to see and what the database actually allows a user to do. Before working with Row Level Security, it would have been easy for me to think that hiding an Edit or Delete button was enough. Testing with two different authenticated accounts showed me that real ownership security has to be enforced by the database.

I also gained a stronger understanding of React state through the filtering system. Each filter has its own value, but all of the selected filters have to work together. Building the filtering logic helped me understand how state, arrays, `.filter()`, `.includes()`, and conditional logic can work together to control what the user sees.

### Challenges I Encountered

One challenge was making sure that authentication and ownership worked together correctly. A user needed to be able to view all public jobs while only being allowed to manage their own jobs.

Another challenge was organizing a project that had grown beyond a small React exercise. ViaNova includes pages, reusable components, hooks, services, authentication, Supabase queries, SCSS, tests, routing, and database security. I needed the project to remain understandable instead of allowing everything to grow inside only a few large files.

Filtering was also an important challenge because selecting multiple filters should narrow the results correctly rather than allowing a job to match only one of the selected choices.

### How I Solved Those Challenges

I separated responsibilities throughout the application. Supabase database operations are kept in a service file, authentication has its own hook and components, routing is handled through React Router, and the SCSS is divided into partials based on what each stylesheet is responsible for.

For security, I used both interface-level ownership checks and Supabase RLS policies. Then I tested the RLS behavior using two authenticated accounts instead of assuming the policies worked.

For filtering, I created a match condition for each filter and combined those conditions so a listing has to satisfy every active selection.

I also added automated tests for important behaviors. This helped me see that testing is not only about checking whether code runs. It is about proving that the application behaves the way I expect it to behave.

### What I Will Take Into Future Projects

As I complete Level 3 and prepare to move into Level 4, I will take with me a much better understanding of how a frontend application communicates with a backend service and database.

Level 3 strengthened my understanding of React, routing, state, effects, reusable components, authentication, Supabase, database security, testing, Git workflows, and deployment preparation.

As I move toward Level 4 and more backend development, I want to build on this foundation by learning more about REST APIs, Express, middleware, server-side database operations, API design and status codes, protected API routes, serverless endpoints, and cloud concepts.

ViaNova helped me see that frontend and backend development are not completely separate ideas. They have to work together to create an application that is useful, organized, secure, and reliable.

### What ViaNova Represents to Me

ViaNova represents more than the final project for this level.

The idea behind the name is finding a path toward something new, and that connects closely with my own journey as a developer. Every project has introduced something that I did not completely understand at first. I have had to investigate problems, make mistakes, test solutions, ask questions, and keep moving forward until the pieces started making sense together.

With ViaNova, I can see how much more I understand about building an application from beginning to end than I did when I started.

I am finishing Level 3 with more confidence in React and full-stack application development, but I also understand that there is still much more for me to learn. That is what makes moving into Level 4 exciting to me.

For me, ViaNova represents exactly what its tagline says:

**Find the path to what comes next.**
