# Engineering Club website

A single-page, scroll-driven site for the WHS Engineering Club: what we do, current projects, meeting schedule, how to join, FAQ and contact info.

Built with React and Vite. Every push to `main` builds the site and deploys it to GitHub Pages through `.github/workflows/deploy.yml`.

Live site: https://whs-engineering-club.github.io/eng-club-website/

## Run it locally

```sh
npm install
npm run dev
```

## Edit the club details

All the text lives in `src/data.js`: meeting times, projects, events, FAQ and the contact email. The current details are placeholders, so replace them with the real ones.

## Layout

- `src/components/`: one component per page section
- `src/lib/hooks.js`: `useScrollProgress` writes each section's scroll progress (0 to 1) to a `--p` CSS variable
- `src/styles.css`: all styles and scroll animations, driven by `--p`, with light and dark color tokens at the top

The scroll scenes (intro gears, statement, disciplines, projects) use sticky positioning. With "reduce motion" turned on in the OS, they show as a plain static page.
