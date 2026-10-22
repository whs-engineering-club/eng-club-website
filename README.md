# Engineering Club website

A single-page site for the Engineering Club: what we do, current projects, meeting schedule, how to join, FAQ and contact info.

Built with React and Vite. Every push to `main` builds the site and deploys it to GitHub Pages through `.github/workflows/deploy.yml`.

Live site: https://rahil-desai.github.io/engineering-club/

## Run it locally

```sh
npm install
npm run dev
```

## Edit the club details

All the text lives in `src/data.js`: meeting times, projects, events, FAQ and the contact email. The current details are placeholders, so replace them with the real ones.

## Layout

- `src/components/`: one component per page section
- `src/lib/gears.js`: canvas drawing for the gear illustrations
- `src/lib/hooks.js`: scroll reveal, scroll spy and theme hooks
- `src/styles.css`: all styles, with light and dark color tokens at the top
