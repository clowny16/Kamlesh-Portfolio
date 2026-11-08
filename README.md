# Kamlesh Portfolio

Personal QA testing portfolio built with Next.js, React, TypeScript, Tailwind CSS and GSAP.

## Run locally

Use Node.js 22 or newer.

```sh
npm install --legacy-peer-deps
```

Create a `.env` file with:

```env
DATABASE_URL="file:./dev.db"
```

Initialize the local database and start the app:

```sh
npx prisma generate
npx prisma db push
npx next dev -p 3001
```

Open http://localhost:3001.

Local environment files, databases, dependency caches and downloaded reference files are excluded from this repository.
