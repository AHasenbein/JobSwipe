# SwipeHire

Swipe-style candidate screening for hiring teams. Upload a batch of resumes, let an LLM pipeline turn each one into a short scored profile, then swipe yes/no. The app drafts interview emails for the candidates you accept.

Built in a weekend at **NexHacks 2026** (Carnegie Mellon) by Darren Wang, Aron Peng, Alex Hasenbein and Vitaliy Pikalo.

**Live demo:** https://nexhacks.netlify.app

## How it works

A three-step agent pipeline: **Extract → Score → Email**

1. **Extract:** PDF/DOCX resumes are converted to text (`pdf-parse`, `mammoth`), compressed with The Token Company's bear-1 API to cut token usage, then parsed into structured profiles with Cerebras-hosted LLMs.
2. **Score:** each candidate is ranked against the parsed job description plus the recruiter's own preferences. Swipe feedback is fed back in, so ranking learns what the recruiter actually wants.
3. **Email:** Gemini drafts personalized interview emails for accepted candidates, sent over SMTP.

The pipeline is traced end-to-end with OpenTelemetry and Arize Phoenix. Candidates can also arrive from an ATS through a webhook endpoint (`/api/webhook/ats`).

## Stack

Next.js 14 (App Router) · TypeScript · MongoDB/Mongoose · Zustand · MUI · Framer Motion · Cerebras · Gemini · OpenTelemetry

## Running locally

```bash
npm install
cp .env.example .env.local   # then fill in the keys below
npm run dev                  # http://localhost:3000
```

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string |
| `CEREBRAS_API_KEY` | Resume parsing and scoring |
| `GEMINI_API_KEY` | Interview email drafting |
| `BEAR_API_KEY` | Prompt compression (optional) |
| `SMTP_USER` / `SMTP_PASS` | Sending emails |
| `PHOENIX_COLLECTOR_ENDPOINT` | Tracing (optional) |

Helper scripts: `npm run test:connection` (checks MongoDB), `npm run test:pipeline`, `npm run clear-db`.
