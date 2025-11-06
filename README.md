Noterverse

Secure, taggable, searchable notes with Google Sign-In, AES-GCM encryption at rest, OCR (image to text), and a clean React UI backed by a MySQL database.

Monorepo structure
- server: Node/Express API, Prisma ORM, MySQL, Google ID token verification, encryption
- client: React app (Vite), Google Sign-In, notes UI, OCR via tesseract.js

Quick start
1) Prereqs: Node 18+, npm, local MySQL running
2) Copy env files:
   - server/.env.example -> server/.env (fill values)
   - client/.env.example -> client/.env (fill values)
3) Install deps:
   - npm install --prefix server
   - npm install --prefix client
4) DB setup (first time):
   - npx prisma migrate dev --schema server/prisma/schema.prisma
   - npx prisma generate --schema server/prisma/schema.prisma
5) Run:
   - npm run dev --prefix server
   - npm run dev --prefix client

Security model
- Authentication: Google ID tokens are verified by the API each request
- Encryption at rest: Note content is encrypted with AES-256-GCM using a per-user key derived via HKDF from a server secret and Google user id
- Future enhancement: Optional user passphrase for zero-knowledge encryption

OCR
- Client-side OCR with tesseract.js; extracted text is editable before saving


