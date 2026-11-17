# Daily Bread

Make more. Waste less. Gather often.

*Give us this day our daily bread.* (Matthew 6:11)

A web-first kitchen companion: recipes from what you have, fridge and pantry scanning, a personal cookbook with social and photo imports, Cook With Me mode, and From Scratch lessons.

## Structure

```
public/index.html          The app (single page, no build step)
netlify/functions/ai.mjs   Server function that calls the Claude API
netlify.toml               Netlify build and header settings
```

The browser never sees the API key. The page posts to `/api/ai`, and the function adds the key and calls Anthropic.

## Deploy

1. Create a repo (for example `rootedprogramer/daily-bread`) and push this folder:
   ```
   git init
   git add .
   git commit -m "Daily Bread MVP"
   git branch -M main
   git remote add origin git@github.com:rootedprogramer/daily-bread.git
   git push -u origin main
   ```
2. In Netlify: **Add new site > Import an existing project > GitHub**, pick the repo. Netlify reads `netlify.toml`, so leave the build command empty and the publish directory as `public`.
3. In **Site configuration > Environment variables**, add `ANTHROPIC_API_KEY` with a key from console.anthropic.com. Redeploy.
4. In the Anthropic Console, set a monthly spend limit on that key.

## Run locally

```
npm i -g netlify-cli
cp .env.example .env    # add your key
netlify dev
```

Open http://localhost:8888.

## Current limits

- Pantry, cookbook, and lesson progress are saved in the browser (localStorage), so they stay on one device. Supabase auth and tables are the next step.
- The AI endpoint is public until sign-in exists. It's protected by a same-origin check, input size caps, and a Netlify rate limit of 20 requests per minute per visitor.
