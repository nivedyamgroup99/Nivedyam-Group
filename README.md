# Nivedyam Group website

The public website (Home, About, Process, Products, Contact) plus an admin panel at `/admin` where the team signs in with Google and edits all the content.

- **Framework:** Next.js 16, hosted on Vercel
- **Database, image storage and login:** Supabase
- **Admin sign-in:** Google, limited to the emails on the admin list

## What is already set up

| Item | Status |
|---|---|
| Supabase project **Nivedyam Website** (account nivedyamgroup99, Mumbai region) | Created |
| Tables, security rules, `media` image bucket | Created (`supabase/schema.sql`) |
| All current website content | Loaded (`supabase/seed.sql`) |
| Admin owners | gokulpp33@gmail.com, nivedyamgroup99@gmail.com |
| Vercel project **nivedyam-website** with the Supabase settings | Created |

Supabase project URL: `https://gudxovgoikczfzrwjoml.supabase.co`

## Steps left to go live

### 1. Put the code on GitHub and deploy

1. Create a repository on GitHub (for example `nivedyam-website`) and upload this folder to it. Don't upload `node_modules` or `.env.local`; `.gitignore` already excludes them.
2. In Vercel, open the **nivedyam-website** project → **Settings → Git** → **Connect Git Repository** → choose the repository.
3. Vercel builds and deploys. Every later push to GitHub deploys automatically.
4. Vercel turns on "Vercel Authentication" for new projects, which hides `*.vercel.app` addresses behind a Vercel login. Turn it off: **Settings → Deployment Protection → Vercel Authentication → Disabled**. Once you add your own domain, visitors can reach that domain either way.

The two environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) are already set in Vercel.

### 2. Turn on Google sign-in (about 10 minutes)

**In Google Cloud** (sign in with the company Google account):

1. Go to <https://console.cloud.google.com/>, create a project such as "Nivedyam Website".
2. Open **APIs & Services → OAuth consent screen**. Choose **External**, enter the app name "Nivedyam Website" and the support email, then save. Publish the app so any allow-listed Google account can sign in.
3. Open **APIs & Services → Credentials → Create credentials → OAuth client ID**:
   - Application type: **Web application**
   - Authorised redirect URI: `https://gudxovgoikczfzrwjoml.supabase.co/auth/v1/callback`
4. Copy the **Client ID** and **Client secret**.

**In Supabase** (Dashboard → Nivedyam Website):

1. **Authentication → Sign In / Providers → Google**: enable it, then paste the Client ID and Client secret and save.
2. **Authentication → URL Configuration**:
   - **Site URL:** your live address, e.g. `https://nivedyam-website.vercel.app` (later your own domain)
   - **Redirect URLs:** add `https://nivedyam-website.vercel.app/auth/callback`, your own domain's `/auth/callback` once you have one, and `http://localhost:3000/auth/callback` for local testing.

### 3. Sign in

Open `https://<your-site>/admin`, choose **Continue with Google**, and sign in with an owner account.

## Using the admin panel

| Section | What it changes |
|---|---|
| Dashboard | New enquiries and shortcuts |
| Enquiries | Contact-form messages: reply by email, mark read or done, delete |
| Slider | Home page banner slides: photo or drawn bottle, button, badge |
| Mineral standards | The mineral card on Home and Process |
| Numbers & stats | Figures such as "14 filtration stages" on each page |
| Feature cards | Icon cards on Home and About |
| Products / Brands | Bottles, sizes, photos, what shows on the home page; brand colours |
| Process stages / phases | The 14 stages and 4 phases on the Process page |
| FAQs, Reviews | Contact-page questions and About-page reviews |
| Texts & contact details | Logo, phone, WhatsApp, email, address, hours and all page headings |
| Admin users | Owners add or remove Google accounts (Owner or Editor) |

Changes appear on the live site within a few seconds. Images up to 4 MB can be uploaded; they are stored in Supabase.

## Running it on a computer (for developers)

```bash
npm install
cp .env.example .env.local   # then fill in the two values from Supabase → Project Settings → API
npm run dev                  # http://localhost:3000
```

## Setting up a fresh Supabase project

1. In the SQL Editor, run `supabase/schema.sql`, then `supabase/seed.sql`.
2. Change the emails on the last line of `seed.sql` first if needed.
3. After editing `src/content/defaults.json`, regenerate the seed with `node scripts/generate-seed.mjs`.

If the database can't be reached, the site falls back to the content in `src/content/defaults.json`, so it never shows a blank page.

## Content still to fill in

These show as `[placeholders]` until someone edits them in the admin panel:

- Working hours
- Founder story, and the quote name and title (About page)
- Ifthaar sizes, and pack quantities per case
- Logo (upload under **Texts & contact details → Brand**)
