# RoMoCo 2027 static website

Static, database-free version of the RoMoCo 2027 conference website.

## Local preview

No dependencies are required. Run:

```powershell
node scripts/check-site.mjs
node scripts/serve.mjs
```

Then open `http://127.0.0.1:4173/`.

## Publishing

Every push to `main` is checked, built into `dist/` and deployed by `.github/workflows/pages.yml` to GitHub Pages.

## Main pages

- `index.html` - news and conference overview
- `conference.html` - Poznan University of Technology
- `call-for-papers.html` - CFP poster, PDF, scope and dates
- `committee.html` - organizing and scientific committees
- `plenary-sessions.html` - confirmed plenary speakers
- `history.html` - previous editions
- `venue.html` - conference venue
- `contact.html` - conference secretariat

The WordPress theme is retained separately as a migration source and is not required to run this website.

See [EDITING.md](EDITING.md) for instructions on updating and publishing the website directly from GitHub.
