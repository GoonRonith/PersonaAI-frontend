# Frontend Local Setup

## Prerequisites
- Node.js 18+ recommended
- npm

## Install dependencies
```bash
cd frontend
npm install
```

## Environment variables
Create a file named `.env.local` in the frontend folder with:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

If your backend runs on a different port, update the URL accordingly.

## Run locally
```bash
npm run dev
```

The app will start at:
- http://localhost:5173

## Build for production
```bash
npm run build
```

## Optional lint check
```bash
npm run lint
```
