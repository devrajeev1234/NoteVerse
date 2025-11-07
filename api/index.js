// Vercel Serverless Function - Main API handler
// This wraps the Express app to work with Vercel's serverless environment

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../server/src/middleware/auth.js';
import notesRouter from '../server/src/routes/notes.js';

const app = express();
let prisma;

// Initialize Prisma client (reuse connection in serverless to avoid connection exhaustion)
if (!global.prisma) {
  global.prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
}
prisma = global.prisma;

app.use(cors({ 
  origin: process.env.CLIENT_ORIGIN?.split(',') || '*', 
  credentials: true 
}));
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'noterverse', time: new Date().toISOString() });
});

// All routes below require a valid Google ID token
app.use(authMiddleware(prisma));
app.use('/notes', notesRouter(prisma));

// Export as Vercel serverless function
// Vercel will automatically handle the Express app
export default app;

