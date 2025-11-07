# Vercel Deployment Guide

## Overview
This document explains the Vercel NOT_FOUND error fix and how to deploy this monorepo to Vercel.

## What Was Fixed

### The Problem
Vercel was returning NOT_FOUND errors because:
1. **No Vercel configuration**: Missing `vercel.json` file
2. **Monorepo structure**: Vercel didn't know how to handle the separate `client/` and `server/` directories
3. **API routing**: Express server wasn't configured as Vercel Serverless Functions
4. **Build configuration**: No instructions for building the client or generating Prisma client

### The Solution

#### 1. Created `vercel.json`
- Configured build commands for the client
- Set up API routing to `/api`
- Configured rewrites for SPA routing
- Added Prisma client generation to install command

#### 2. Created `api/index.js`
- Converted Express server to Vercel Serverless Function
- Maintained all existing routes and middleware
- Optimized Prisma client initialization for serverless

#### 3. Created `api/package.json`
- Listed all required dependencies for the API function

## Environment Variables

Set these in your Vercel project settings:

```
DATABASE_URL=your_mysql_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
SERVER_ENCRYPTION_SECRET=your_encryption_secret
CLIENT_ORIGIN=https://your-app.vercel.app
VITE_API_BASE=/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## Deployment Steps

1. **Push to Git** (Vercel auto-deploys from Git)
2. **Set Environment Variables** in Vercel dashboard
3. **Deploy** - Vercel will:
   - Install dependencies
   - Generate Prisma client
   - Build the React app
   - Deploy API as serverless functions

## Testing

After deployment:
- Frontend: `https://your-app.vercel.app`
- API Health: `https://your-app.vercel.app/api/health`
- API Notes: `https://your-app.vercel.app/api/notes`

