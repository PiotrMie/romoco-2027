# Editing the RoMoCo website

The website can be edited directly in the GitHub browser interface. No WordPress installation, database or local development environment is required.

## Editing text

1. Open the repository at `https://github.com/PiotrMie/romoco-2027`.
2. Open the HTML file containing the text you want to change.
3. Click the pencil icon labelled **Edit this file**.
4. Find and change only the visible text between the HTML tags.
5. Click **Commit changes** and commit directly to the `main` branch.
6. Open the **Actions** tab and wait until **Deploy static site to GitHub Pages** has a green check mark.
7. Refresh `https://piotrmie.github.io/romoco-2027/` with `Ctrl+F5`.

## Page files

- `index.html` - homepage, news, dates, topics and partner area
- `conference.html` - conference and university overview
- `call-for-papers.html` - CFP dates, scope, poster and PDF
- `committee.html` - organizing and scientific committees
- `plenary-sessions.html` - speakers, talks, abstracts and biographies
- `history.html` - previous editions
- `venue.html` - venue information and photographs
- `contact.html` - contact details and organizing units
- `submissions.html` - submission information

Do not edit files inside `dist/`. That directory is rebuilt automatically and is not stored in Git.

## Replacing an image

The easiest safe method is to upload a new image using the same file name as the old one:

1. Open the appropriate folder under `assets/`.
2. Choose **Add file > Upload files**.
3. Upload the replacement with exactly the same name and extension.
4. Commit the change to `main`.

Important locations:

- `assets/hero/slide-1.jpg` through `slide-9.jpg` - homepage gallery
- `assets/img/speakers/` - plenary speaker photographs
- `assets/img/romoco27-cfp-170.jpg` - CFP poster preview
- `assets/img/romoco27-cfp-170.pdf` - downloadable CFP
- `assets/img/` - logos and venue photographs

Keep speaker photographs in a vertical `4:5` ratio when possible. Before replacing CFP files, keep a backup of the previous PDF and image.

## Reverting a mistake

Open **Commits**, select the last working commit and use **Revert**. Alternatively, ask Codex to inspect and revert only the problematic commit.

## Continuing work with Codex

Changes committed on GitHub are visible to Codex after the local repository is refreshed. In this conversation, write:

> Pobierz moje najnowsze zmiany z repozytorium i sprawdz je.

Codex will fetch the latest commit, compare it with the local version, preserve your changes and continue from the current state. Never paste GitHub passwords, access tokens or recovery codes into the conversation.
