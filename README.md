# Kash Blog

> A full-stack blogging platform (React + Vite frontend, Node/Express backend) built for creators. This README documents current setup, running instructions, environment variables and a forward-looking roadmap of planned social and AI features.

## Table of contents

- Project overview
- Tech stack
- Repository structure
- Quick start (local)
- Environment variables
- Development notes
- Roadmap (future features)
- Contributing
- License & contact

## Project overview

Kash Blog is a creator-first blogging platform that lets users write, publish and discover posts, interact with each other, and manage profiles. The project is split into two parts:

- `api/` — Node.js + Express backend with MongoDB (Mongoose), authentication and file uploads (Cloudinary).
- `client/` — React application bootstrapped with Vite and Tailwind (UI components, routes, and pages).

This README covers how to run the project locally and the planned feature roadmap (Deep Social Layer, Personalized Reader Experience, Creative AI Features).

## Tech stack

- Frontend: React, Vite, TailwindCSS
- Backend: Node.js, Express, Mongoose (MongoDB)
- Auth: JWT stored in cookies
- File uploads: Multer + Cloudinary
- Dev tooling: nodemon, eslint

Dependencies (high level):

- `api/package.json` lists: express, mongoose, dotenv, jsonwebtoken, bcryptjs, cloudinary, multer, cors, cookie-parser, nodemon (dev)
- `client/package.json` lists: react, react-dom, react-router-dom, vite, tailwindcss, axios

## Repository structure

Top-level folders:

- `api/` — backend source and config

  - `src/app.js` — Express app setup and middleware
  - `src/index.js` — server start, DB connect
  - `src/controllers/` — route handlers
  - `src/models/` — Mongoose models
  - `src/routes/` — API routes
  - `src/db/index.js` — MongoDB connection
  - `src/utilis/cloudinary.js` — cloud upload helper

- `client/` — frontend source (Vite + React)
  - `src/` — React components, pages and context
  - `src/compoents/` — UI components
  - `src/pages/` — pages (Home, Post, Profile, etc.)

Use this README as the primary developer onboarding doc.

## Quick start (local)

Prerequisites:

- Node.js (recommended v18+)
- npm or yarn
- A MongoDB connection (Atlas or local)
- Cloudinary account (optional if you want image uploads working)

Start the backend (API):

```powershell
cd api
npm install
# create a .env file (see Environment variables below)
npm run start
```

Start the frontend (Client):

```powershell
cd client
npm install
npm run dev
```

Open the client URL from Vite (typically http://localhost:5173) and ensure the API is reachable at the URL configured by your client (update the API base URL in the client if needed).

Notes:

- `api`'s `start` script currently uses `nodemon src/index.js` (dev-friendly).
- The client runs with Vite's dev server (`npm run dev`).

## Environment variables

Create a `.env` file in `api/` with at least the following entries (the project uses the names found in source code):

```
MONODB_URI=mongodb+srv://<user>:<pass>@cluster.example.mongodb.net/kashlog
PORT=5000
JWT_SECRET=your_jwt_secret_here
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
```

Notes about variable names:

- The backend expects `MONODB_URI` (see `src/db/index.js`). If you prefer a different name (e.g. `MONGODB_URI`), update `src/db/index.js` accordingly.

## Development notes

- Database: The server uses Mongoose to connect to MongoDB. Ensure your `MONODB_URI` is valid.
- Auth: The API uses JWT tokens signed with `JWT_SECRET`. Tokens are expected in a cookie named `token`.
- File uploads: Images are uploaded via a local multer middleware then forwarded to Cloudinary (see `src/utilis/cloudinary.js`). Provide your Cloudinary credentials above.

Quick troubleshooting:

- If server fails to start check the console logs for a DB connection error or missing `.env` entries.
- If image uploads fail, verify Cloudinary credentials and that the app has permission to unlink temporary files.

## Roadmap — Planned / Future Features

Below are the next-wave features for Kash Blog. These are design goals and prototypes you asked to include; they are described here so contributors know the product direction.

- Deep Social Layer — A more immersive community experience:

  - Writer Circles — private mini-communities for feedback before publishing.
  - Reactions — more expressive reactions beyond likes (❤️ ✨ 💭 🔥).
  - Live Writing Mode — see when someone’s typing a new post.
  - Chat & Threads — threaded, persistent creator-to-creator discussions.

- Personalized Reader Experience — Tailor the reading experience with emotion and personalization:

  - Mood-based Feed — filter posts by moods like “Calm,” “Inspired,” “Romantic,” or “Technical.”
  - AI Recommendation Engine — match users by writing style, tone, and emotion.
  - Ambient Reading Mode — optional soft background sounds while reading.
  - Writer Themes — each user selects profile color palettes, fonts, or layout presets.

- Creative AI Features — AI tools to accelerate creativity:
  - AI Title, Tag & Summary Generator
  - Poetry Completion Assistant
  - Code Explainer / AI Pair Writer

These features will require additional systems for real-time interactions, richer activity models, and AI/ML integrations (recommendation service, content embeddings, and prompt engineering). Consider adding a dedicated `services/` layer and a message broker (Redis/Socket.io) as the roadmap advances.

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repo and create a feature branch.
2. Run the app locally and add tests for new behaviour.
3. Open a pull request describing the change and rationale.

Please follow the existing code style and add small, focused commits.

## License & contact

- The `api/package.json` currently lists `ISC` as the license. Choose and add a repository `LICENSE` file if you want a different license (MIT, Apache-2.0, etc.).

If you want help implementing any of the roadmap features (real-time writer circles, AI helpers, or Mood-based feed), open an issue or drop me a note in the repo issues with your priority list and I can help design the first concrete milestones.

---

If you'd like, I can also add a minimal `.env.example`, a LICENSE file, or a contributing template next. Want me to create those now?
